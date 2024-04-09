const { Schema, model } = require("mongoose");
const mineWeight = require("../mineWeight");

const itemSchema = new Schema({
  itemId: { type: Number, required: true },
  itemName: { type: String, required: true },
  itemCost: { type: Number, default: 0 },
  mineWeight: {
    type: mineWeight,
  },
});

module.exports = model("items", itemSchema);

/**
 * 
 * Some mess
 * {
    dirt: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    wood: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    stone: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    coal: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    iron: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    gold: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    diamond: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    emerald: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    bedrock: {
      weight: {
        type: Number,
        default: 0,
      }
    },
    required: false,
  },
 * End mess
 *
 */
