const { Schema, model } = require("mongoose");

/**
 * Determines the details of a specific ore.
 *  name: unique identifier for the ore.
 *  minValue: base minimum value for ore.
 *  maxValue: base maximum value for ore.
 */

const oreSchema = new Schema({
  name: { type: String, required: true, unique: true },
  minValue: { type: Number, default: 0 },
  maxValue: { type: Number, default: 0 },
});

module.exports = model("ore", oreSchema);
