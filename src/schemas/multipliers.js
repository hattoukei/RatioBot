const { Schema, model } = require("mongoose");

const multiplierSchema = new Schema({
  name: { type: String, required: true, unique: true },
  multiplier: { type: Number, default: 1 },
});

module.exports = model("multiplier", multiplierSchema);
