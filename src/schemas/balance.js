const { Schema, model } = require("mongoose");

const balanceSchema = new Schema({
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
});

module.exports = model("balance", balanceSchema);
