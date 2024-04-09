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
  weight: {
    type: mineWeight,
  },
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
    { name: "wood", weight: this.weight.wood, minValue: 1, maxValue: 5 },
    { name: "stone", weight: this.weight.stone, minValue: 5, maxValue: 10 },
    { name: "coal", weight: this.weight.coal, minValue: 15, maxValue: 30 },
    { name: "iron", weight: this.weight.iron, minValue: 50, maxValue: 100 },
    { name: "gold", weight: this.weight.gold, minValue: 125, maxValue: 250 },
    {
      name: "diamond",
      weight: this.weight.diamond,
      minValue: 500,
      maxValue: 1000,
    },
    {
      name: "emerald",
      weight: this.weight.emerald,
      minValue: 1000,
      maxValue: 2500,
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
