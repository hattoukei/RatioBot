const Player = require("../../schemas/player");
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
        content: `You are currently on a cooldown.`,
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
        const ore = rollOre(weightTable, totalWeight);
        let amount = randomNum(ore.minValue, ore.maxValue);

        // Adds and saves coin amount to player.
        player.coins += amount;
        await player.save();

        // Determines the amount of coins
        const coinsAfter = player.coins;

        await player.save().catch((e) => {
          console.log(`Error adding coins: ${e}`);
        });

        interaction.reply(
          `<@${interaction.user.id}> Successfully mined a ${ore.name} ore! You gained ${amount} coins!`
        );

        console.log(
          `    Coins for ${player.userName} went from ${coinsBefore} -> ${coinsAfter}.`
        );
      } else {
        interaction.reply({
          content: `This player is not recorded in the database.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`There was an error attempting to mine: ${error}`);
    }
  },
};

function rollOre(table, weight) {
  const roll = Math.floor(Math.random() * weight);
  let accumulatedWeight = 0;

  console.log(`    Rolled: ${roll} out of ${weight}!`);
  for (const ore of table) {
    accumulatedWeight += ore.weight;
    if (accumulatedWeight >= roll) {
      return ore;
    }
  }
  return table[table.length - 1];
}
