const Player = require("../../schemas/player");
const mineWeight = require("../../schemas/mineWeight");

module.exports = {
  name: "reg",
  description: "registers your uuid and name for the bot",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(`Attempting to register '${user.id}' as '${user.username}'.`);

    const query = {
      userId: interaction.user.id,
      guildId: interaction.guild.id,
    };

    try {
      const player = await Player.findOne(query);

      // if user is already found in collection
      if (player) {
        console.log(`UUID: ${user.id} has already been registered.`);
        interaction.reply({
          content: `You have already been registered.`,
          ephemeral: true,
        });
      }

      // if user is not found in collection
      else {
        const newPlayer = await Player.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
          userName: interaction.user.username,
          coins: 0,
          weights: [],
        });

        await newPlayer.save();

        const weights = await mineWeight.find({ isBase: "true" });

        for (let i = 0; i < weights.length; i++) {
          newPlayer.weightModifiers.push({ flat: weights[i], multiplier: 1 });
        }

        await newPlayer.save();

        console.log(`UUID: ${user.id} has successfuly been registered.`);
        interaction.reply({
          content: `You have been successfully registered! UUID: ${user.id}`,
          ephemeral: true,
        });
      }
    } catch (error) {
      interaction.reply({
        content: `An error has occurred while registering you to the database.`,
        ephemeral: true,
      });
      console.log(`Register error: ${error}`);
    }
  },
};
