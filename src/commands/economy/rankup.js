const Player = require("../../schemas/player");
const isNegative = require("../../utils/isNumberNegative.js");
const Ranks = require("../../json/ranks.json");
const mineRanks = require("../../schemas/mineRanks.js");

module.exports = {
  name: "rankup",
  description: "Climb up the ladder.",
  testOnly: true,
  // options: [],

  callback: async (client, interaction) => {
    // Logs that the user is mining.
    console.log(
      `[RANKUP] ${interaction.user.username} is attempting to rank up.`
    );

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

        // Finds the next rank the user needs.
        const targetRank = await player.findNextRank();

        let cost = targetRank.cost;

        // Adds and saves coin amount to player.
        if (!isNegative(coinsBefore - cost)) {
          player.coins -= cost;
          player.rankLevel = targetRank.level;
          player.rank = targetRank.name;

          await player.refreshRankWeights();

          interaction.reply({
            content: `You successfully ranked up to rank [${targetRank.name}]!`,
          });
        } else {
          interaction.reply({
            content: `You need ${cost} coins to rank up to ${targetRank.name}. (${await player.findRankCostNeeded()} more)`,
          });
        }

        // Determines the amount of coins
        const coinsAfter = player.coins;

        await player.save().catch((e) => {
          console.log(`Error buying rank: ${e}`);
        });

        console.log(
          `    Coins for ${player.userName} went from ${coinsBefore} -> ${coinsAfter}.`
        );
      } else {
        interaction.reply({
          content: `You must register using /reg before using this command.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`There was an error attempting to rank up: ${error.stack}`);
    }
  },
};

async function updateWeightsByRank(user) {
  const currentRank = await mineRanks.findOne({ level: user.rankLevel });
  const currentPlayer = await Player.findOne({ userName: user.userName });
  if (currentRank) {
    const rank = Ranks.rankWeights.find(
      (rankWeights) => rankWeights.id === currentRank.name
    );
    for (const object of currentPlayer.weightModifiers) {
      try {
        for (const weight of rank.weights) {
          if (weight.name === object.flat.ore.name) {
            object.flat.weightValue = weight.weight;
            continue;
          }
        }
        await currentPlayer.save();
        console.log(`Updated documents.`);
      } catch (error) {
        console.error(`Error updating documents.`, err);
      }
    }
    await currentPlayer.save();
  } else {
    return;
  }
}
