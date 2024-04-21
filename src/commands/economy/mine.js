const Player = require("../../schemas/player");
const Ores = require("../../schemas/ores");
const randomNum = require("../../utils/generateRandomNumber");
const cooldowns = new Set();

module.exports = {
  name: "mine",
  description: "Mine for some coins.",
  // devOnly: true,
  testOnly: true,
  // options: [],

  callback: async (client, interaction) => {
    // Logs that the user is mining.
    console.log(`[MINE] ${interaction.user.username} is mining.`);

    if (cooldowns.has(interaction.user.id)) {
      interaction.reply({
        content: `You are currently on a cooldown. You can only mine once every 5 seconds.`,
        ephemeral: true,
      });
      return;
    }

    // Query to find the player who attempted to mine by id.
    const query = {
      userId: interaction.user.id,
    };

    try {
      // Finds the player by above query
      const player = await Player.findOne(query);

      if (player) {
        // Records the coins before mining.
        const coinsBefore = player.coins;

        // Gives the weight table for the player.
        const weightTable = await player.findWeightValues();
        const totalWeight = await player.findTotalWeight();

        // Starts the roll for the ore
        const oreName = rollOre(weightTable, totalWeight);
        const targetOre = await Ores.findOne({ name: oreName });
        let amount = randomNum(targetOre.minValue, targetOre.maxValue);

        // Adds and saves coin amount to player.
        player.coins += amount;
        await player.save();

        // Determines the amount of coins
        const coinsAfter = player.coins;

        await player.save().catch((e) => {
          console.log(`Error adding coins: ${e}`);
        });

        interaction.reply(
          `<@${interaction.user.id}> Successfully mined a ${targetOre.name} ore! You gained ${amount} coins!`
        );

        console.log(
          `    Coins for ${player.userName} went from ${coinsBefore} -> ${coinsAfter}.`
        );

        // Handles timers
        if (interaction.user.id === "310812771971235841") {
          console.log(`Dev spotted. Timer will not be invoked.`);
        } else {
          cooldowns.add(interaction.user.id);
          setTimeout(() => {
            cooldowns.delete(interaction.user.id);
          }, 5000);
        }
      } else {
        interaction.reply({
          content: `You must register using /dbreg before using this command.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`There was an error attempting to mine: ${error.stack}`);
    }
  },
};

function rollOre(table, weight) {
  const roll = Math.floor(Math.random() * weight);
  let accumulatedWeight = 0;
  console.log(table);

  console.log(`    Rolled: ${roll} out of ${weight}!`);
  for (const ore of table) {
    accumulatedWeight += ore.weight;
    if (accumulatedWeight >= roll) {
      return ore.name;
    }
  }
  return table[table.length - 1];
}
