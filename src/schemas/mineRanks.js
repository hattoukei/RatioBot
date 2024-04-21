const { Schema, model } = require("mongoose");

/**
 * Determines the mine weight for a player or item.
 *  The name serves as an individual identifier for the schema. (as some of these Schemas may not include certain ores.)
 *  If player, then this should be attached to a player's mineWeight property, and defines their weight to mine a certain ore.
 *  If item, then this should be attached to an item's mineWeight property, and serves as additional weight changes to a player's mineWeight.
 */

const mineRankSchema = new Schema({
  level: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
});

module.exports = model("mineRank", mineRankSchema);
