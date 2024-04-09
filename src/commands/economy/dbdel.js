const Player = require("../../schemas/player");

module.exports = {
  name: "dbdel",
  description: "deletes you from database",
  devOnly: true,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(
      `Attempting to delete '${user.id}' as '${user.username}' from database.`
    );

    const query = {
      userId: interaction.user.id,
      guildId: interaction.guild.id,
    };

    try {
      const player = await Player.findOne(query);

      if (player) {
        console.log(`Deleting UUID '${user.id}' from database.`);

        await player.deleteOne({ _id: player.id });

        interaction.reply({
          content: `Your UUID: ${user.id} has been successfully deleted`,
          ephemeral: true,
        });
      } else {
        console.log(`UUID: ${user.id} has not been found in the database.`);
        interaction.reply({
          content: `Your information is not stored in the database.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      interaction.reply({
        content: `An error has occurred while deleting you from the database.`,
        ephemeral: true,
      });
      console.log(
        `There was an error deleting ${user.username} from the database: ${error}`
      );
    }
  },
};
