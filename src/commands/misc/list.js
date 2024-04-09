const { EmbedBuilder } = require("discord.js");
const Player = require("../../schemas/player");

module.exports = {
  name: "list",
  description: "displays registered members",
  // devOnly: true,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(
      `Attempting to access list of members initiated by '${user.username}'.`
    );

    const list = new EmbedBuilder().setTitle(
      "Member List (use /bal for personal balance)"
    );

    try {
      let userCount = await Player.find().countDocuments();
      let userList = "";

      console.log(userCount);

      // Uses a cursor to iterate through the collection.
      const cursor = Player.find().sort({ coins: -1 }).cursor({ limit: 10 });

      cursor.on("data", (user) => {
        userList += `${user.userName}: ${user.coins} coins` + "\n";
      });

      cursor.on("error", (err) => {
        console.error("Error iterating:", err);
      });

      cursor.on("end", () => {
        list.addFields({ name: "members:", value: userList });
        interaction.reply({ embeds: [list] });
      });
    } catch (error) {
      console.log(`An error has occurred while displaying the list: ${error}.`);
    }
  },
};
