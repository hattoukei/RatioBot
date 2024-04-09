const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemId: { type: Number, required: true },
  itemName: { type: String, required: true },
  itemCost: { type: Number, default: 0 },
  mineWeight: {
    wood: { type: Number, default: 0 },
    stone: { type: Number, default: 0 },
    coal: { type: Number, default: 0 },
    iron: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    quartz: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
    emerald: { type: Number, default: 0 },
    required: false,
  },
});

module.exports = model("items", itemSchema);
