const { Schema, model } = require("mongoose");
const mineWeight = require("./mineWeight");

const itemSchema = new Schema({
  itemId: { type: Number, required: true },
  itemName: { type: String, required: true },
  itemCost: { type: Number, default: 0 },
  mineWeight: {
    type: mineWeight,
  },
});

module.exports = model("items", itemSchema);
