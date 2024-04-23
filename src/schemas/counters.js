const { Schema, model } = require("mongoose");

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = model("counter", counterSchema);
