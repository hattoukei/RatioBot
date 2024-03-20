module.exports = {
  name: "sleep",
  description: "naptime",
  devOnly: true,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    await interaction.reply({
      content: "Shutting down...",
      files: [{ attachment: "src/images/amimir.jpeg" }],
    });
    client.destroy()
  },
};
