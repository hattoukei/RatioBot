const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "list",
  description: "displays registered members",
  // devOnly: true,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const { Pool } = require("pg");
    const database = new Pool({
      database: process.env.PG_DB,
    });
    database.connect();

    let user = interaction.user;
    console.log(
      `Attempting to access list of members initiated by '${user.username}'.`
    );

    const list = new EmbedBuilder().setTitle("Member List (use /bal for personal balance)");

    try {
      const query = {
        text: `SELECT users.username, coins FROM stats INNER JOIN users USING (uuid) ORDER BY coins desc`,
      };
      let result = await database.query(query);
      let userList = "";

      for (let i = 0; i < result.rows.length && i < 10; i++) {
        userList +=
          `${result.rows[i].username}: ${result.rows[i].coins} coins` + "\n";
      }
      list.addFields({ name: "members:", value: userList });
      interaction.reply({ embeds: [list] });
    } catch (error) {
      console.log(`An error has occurred while displaying the list: ${error}.`);
    }
    
    database.end();
  },
};
