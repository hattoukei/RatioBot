const { Schema, model } = require("mongoose");
const mineWeight = require("./mineWeight.js");
const mineRank = require("./mineRanks.js");

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
  let modifiers = [];

  for (const object of this.weightModifiers) {
    ores.push({
      name: object.flat.ore.name,
      weight: object.flat.weightValue,
    });
    modifiers.push(object.multiplier);
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

module.exports = model("player", playerSchema);
