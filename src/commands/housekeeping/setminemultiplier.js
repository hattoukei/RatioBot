const { ApplicationCommandOptionType } = require("discord.js");
const Multipliers = require("../../schemas/multipliers");

module.exports = {
  name: "setmm",
  description: "sets global mine multiplier",
  devOnly: true,
  testOnly: true,
  options: [
    {
      name: "multiplier",
      description: "multiplier",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  deleted: false,

  callback: async (client, interaction) => {
    const newMultiplier = interaction.options.get("multiplier").value;
    const multiplier = await Multipliers.findOne({
      name: "globalMineMultiplier",
    });

    console.log(
      `Attempting to set global mine multiplier from ${multiplier.multiplier}to ${newMultiplier}.`
    );

    if (multiplier) {
      try {
        multiplier.multiplier = newMultiplier;
        await multiplier.save();
        console.log(
          `${multiplier.name}'s multiplier is now ${multiplier.multiplier}.`
        );
        interaction.reply({
          content: `${multiplier.name}'s multiplier is now ${multiplier.multiplier}.`,
          ephemeral: true,
        });
      } catch (error) {
        interaction.reply({
          content: `An error occurred when setting ${multiplier.name}.`,
          ephemeral: true,
        });
        console.log(`Error setting ${multiplier.name}: ${error}`);
      }
    } else {
      interaction.reply({
        content: `Could not find multiplier in database.`,
        ephemeral: true,
      });
      console.log(`Could not find multiplier in database.`);
    }
  },
};
