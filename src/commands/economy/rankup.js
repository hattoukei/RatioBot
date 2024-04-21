const Player = require("../../schemas/player");
const isNegative = require("../../utils/isNumberNegative.js");

module.exports = {
  name: "rankup",
  description: "Climb up the ladder.",
  // devOnly: true,
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
        console.log(targetRank);

        let cost = targetRank.cost;

        // Adds and saves coin amount to player.
        if (!isNegative(coinsBefore - cost)) {
          player.coins -= cost;
          player.rankLevel = targetRank.level;
          player.rank = targetRank.name;
          interaction.reply({
            content: `You successfully ranked up to rank [${targetRank.name}]!`,
          });
        } else {
          interaction.reply({
            content: `You need ${cost} coins to rank up. (${await player.findRankCostNeeded()} more)`,
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
          content: `You must register using /dbreg before using this command.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`There was an error attempting to rank up: ${error.stack}`);
    }
  },
};
