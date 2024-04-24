const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ceo",
  description: "Who's the CEO?",
  devOnly: false,
  testOnly: true,

  callback: async (client, interaction) => {
    interaction.reply({
      content: `Who's the CEO of the Mickey Mouse Clubhouse?: Hdeth. `,
    });
  },
};
