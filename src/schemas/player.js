const { Schema, model } = require("mongoose");
const mineWeight = require("./mineWeight.js");
const mineRank = require("./mineRanks.js");
const Ranks = require("../json/ranks.json");

const playerSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
  power: {
    type: Number,
    default: 0,
  },
  rankLevel: {
    type: Number,
    default: 0,
  },
  rank: {
    type: String,
    default: "F",
  },
  weightModifiers: [
    {
      flat: {
        type: mineWeight.schema,
        default: () => ({}),
      },
      multiplier: {
        type: Number,
        default: 1,
      },
    },
  ],
  mineMultiplier: {
    type: Number,
    default: 1,
  },
  fun: {
    rpsCount: {
      type: Number,
      default: 0,
    },
    rpsWins: {
      type: Number,
      default: 0,
    },
    rpsLosses: {
      type: Number,
      default: 0,
    },
    rpsTies: {
      type: Number,
      default: 0,
    },
  },
  inventory: [
    {
      type: [Number],
      default: [0],
    },
  ],
});

// Checks if the user could deduct an amount of coins. True if the amount is less than balance, false otherwise.
playerSchema.methods.deductionAllowed = async function (amount) {
  if (this.coins >= amount) {
    return true;
  } else {
    return false;
  }
};

// Returns total weight
playerSchema.methods.findTotalWeight = async function () {
  let count = 0;
  for (const object of this.weightModifiers) {
    count += object.flat.weightValue;
  }
  return count;
};

// Returns list of objects as {name, weight}.
playerSchema.methods.findWeightValues = async function () {
  let ores = [];

  for (const object of this.weightModifiers) {
    ores.push({
      name: object.flat.ore.name,
      weight: object.flat.weightValue,
    });
  }

  return ores;
};

playerSchema.methods.findNextRank = async function () {
  const targetRank = await mineRank.findOne({ level: this.rankLevel + 1 });
  if (targetRank) {
    return targetRank;
  } else {
    return null;
  }
};

playerSchema.methods.findRankCostNeeded = async function () {
  const targetRank = await mineRank.findOne({ level: this.rankLevel + 1 });
  if (targetRank) {
    const coinsNeeded = targetRank.cost - this.coins;
    if (coinsNeeded > 0) {
      return coinsNeeded;
    } else {
      return -1;
    }
  }
};

playerSchema.methods.setRank = async function (rlevel) {
  const targetRank = await mineRank.findOne({ level: rlevel });
  if (targetRank) {
    try {
      this.rankLevel = targetRank.level;
      this.rank = targetRank.name;
      await this.save();
      console.log(`Successfully set ${this.userName}'s rank!`);
      await this.refreshRankWeights();
      console.log(`Successfully updated ${this.userName}'s rank weights!`);
    } catch (error) {
      console.log(`Error when setting ${this.userName}'s rank: ${error}`);
    }
  } else {
    console.log(`Could not find rank at level ${rlevel}.`);
  }
};

playerSchema.methods.refreshRankWeights = async function () {
  // From Rank Scehma
  const currentRank = await mineRank.findOne({ level: this.rankLevel });
  if (currentRank) {
    // From JSON
    const rank = Ranks.rankWeights.find(
      (rankWeights) => rankWeights.id === currentRank.name
    );
    for (const object of this.weightModifiers) {
      try {
        for (const weight of rank.weights) {
          if (
            weight.name === object.flat.ore.name &&
            weight.weight != object.flat.weightValue
          ) {
            object.flat.weightValue = weight.weight;
            console.log(
              `Updated ${weight.name} to weight of ${weight.weight}.`
            );
            continue;
          }
        }
      } catch (error) {
        console.error(`Error updating ranks.`, err);
      }
    }
    console.log(`Successfully updated ${this.userName}'s rank weights!`);
    await this.save();
  } else {
    console.log(`Could not find player's rank.`);
    return;
  }
};

module.exports = model("player", playerSchema);
