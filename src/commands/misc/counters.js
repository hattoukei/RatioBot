const { EmbedBuilder } = require("discord.js");
const Counters = require("../../schemas/counters");

module.exports = {
  name: "counters",
  description: "Displays global counters for miscellaneous things.",
  devOnly: false,
  testOnly: true,

  callback: async (client, interaction) => {
    const counter = await Counters.findOne({ name: "mine" });
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "List of all counters",
        iconURL: "https://imgur.com/zHVXQF2.png",
      })
      .addFields({
        name: `Global Mine Count`,
        value: `Players have mined for a total of ${counter.count} times!`,
      });

    interaction.reply({ embeds: [embed] });
  },
};
