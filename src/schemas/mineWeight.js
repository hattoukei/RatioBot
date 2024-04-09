const { Schema, model } = require("mongoose");

/**
 * Determines the mine weight for a player or item.
 *  The name serves as an individual identifier for the schema. (as some of these Schemas may not include certain ores.)
 *  If player, then this should be attached to a player's mineWeight property, and defines their weight to mine a certain ore.
 *  If item, then this should be attached to an item's mineWeight property, and serves as additional weight changes to a player's mineWeight.
 */

const mineWeightSchema = new Schema({
  wood: {
    type: Number,
    default: 45,
  },
  stone: {
    type: Number,
    default: 175,
  },
  coal: {
    type: Number,
    default: 115,
  },
  iron: {
    type: Number,
    default: 65,
  },
  gold: {
    type: Number,
    default: 30,
  },
  diamond: {
    type: Number,
    default: 5,
  },
  emerald: {
    type: Number,
    default: 2,
  },
  bedrock: {
    type: Number,
    default: 1,
  },
});

module.exports = mineWeightSchema;
