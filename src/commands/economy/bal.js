const { EmbedBuilder } = require("discord.js");
const Player = require("../../schemas/player");

module.exports = {
  name: "bal",
  description: "Displays your balance.",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(`'${user.username}' is attempting to look at their balance.`);

    // Query to find user
    const query = {
      userId: interaction.user.id,
    };

    try {
      const playerBalance = await Player.findOne(query);

      if (playerBalance) {
        const embed = new EmbedBuilder().setTitle(
          `${user.username}'s balance: ${playerBalance.coins} coins.`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          content: `Please register using /dbreg before using this command.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(
        `There was an error attemping to fetch ${user.username}'s balance: ${error}`
      );
      interaction.reply({
        content: `An error has occurred while displaying your balance.`,
        ephemeral: true,
      });
    }
  },
};
