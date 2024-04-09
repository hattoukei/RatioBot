const { Schema, model } = require("mongoose");
const mineWeight = require("./mineWeight.js");

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
  weight: {
    type: mineWeight,
  },
  inventory: [],
});

// Returns total weight
playerSchema.methods.findTotalWeight = function () {
  return (
    this.weight.wood +
    this.weight.stone +
    this.weight.coal +
    this.weight.iron +
    this.weight.gold +
    this.weight.diamond +
    this.weight.emerald +
    this.weight.bedrock
  );
};

playerSchema.methods.findWeightValues = function () {
  return [
    { name: "wood", weight: this.weight.wood, minValue: 5, maxValue: 15 },
    { name: "stone", weight: this.weight.stone, minValue: 10, maxValue: 25 },
    { name: "coal", weight: this.weight.coal, minValue: 15, maxValue: 35 },
    { name: "iron", weight: this.weight.iron, minValue: 30, maxValue: 75 },
    { name: "gold", weight: this.weight.gold, minValue: 60, maxValue: 125 },
    {
      name: "diamond",
      weight: this.weight.diamond,
      minValue: 185,
      maxValue: 325,
    },
    {
      name: "emerald",
      weight: this.weight.emerald,
      minValue: 450,
      maxValue: 3275,
    },
    {
      name: "bedrock",
      weight: this.weight.bedrock,
      minValue: 10000,
      maxValue: 10000,
    },
  ];
};

module.exports = model("player", playerSchema);
