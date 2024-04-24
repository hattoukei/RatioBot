const { ApplicationCommandOptionType } = require("discord.js");
const Player = require("../../schemas/player");

module.exports = {
  name: "setrank",
  description: "sets player's rank",
  devOnly: true,
  testOnly: true,
  options: [
    {
      name: "user",
      description: "target user",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "level",
      description: "rank level",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  deleted: false,

  callback: async (client, interaction) => {
    const targetUser = interaction.options.get("user").value;
    const level = interaction.options.get("level").value;
    const targetPlayer = await Player.findOne({ userId: targetUser });

    console.log(
      `Attempting to set ${targetPlayer.userName}'s rank to level ${level}.`
    );

    if (targetPlayer) {
      try {
        await targetPlayer.setRank(level);
        await targetPlayer.save();
        console.log(
          `Successfully set ${targetPlayer.userName}'s rank to level ${level}.`
        );
        interaction.reply({
          content: `Successfully set ${targetPlayer.userName}'s rank to level ${level}.`,
          ephemeral: true,
        });
      } catch (error) {
        interaction.reply({
          content: `An error occurred when setting ${targetPlayer.userName}'s rank.`,
          ephemeral: true,
        });
        console.log(`Error setting user's rank: ${error}`);
      }
    } else {
      interaction.reply({
        content: `Could not find player in database.`,
        ephemeral: true,
      });
      console.log(`Could not find target player in database.`);
    }
  },
};
