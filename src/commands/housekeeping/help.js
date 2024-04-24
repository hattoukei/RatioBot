const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Information about some of Dr. Ratio's commands.",
  devOnly: false,
  testOnly: true,

  callback: async (client, interaction) => {
    embed = new EmbedBuilder()
      .setAuthor({
        name: "List of all commands",
        iconURL: "https://imgur.com/zHVXQF2.png",
      })
      .setDescription(
        "To get started with the economy, use `/reg` and type `/mine` to start earning coins. To return to this window, type in `/help` whenever you need it."
      )
      .addFields(
        {
          name: "Economy",
          value: "`bal`, `list`, `pay`, `cf`, `mine`, `rankup`",
        },
        { name: "Miscellaneous", value: "`meow`, `roll`, `ping`" }
      )
      .setFooter("`/help` to return to this page!");

    interaction.reply({ embeds: [embed] });
  },
};
