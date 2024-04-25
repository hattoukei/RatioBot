const { Schema, model } = require("mongoose");

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

counterSchema.methods.increment = async function () {
  this.count += 1;
  await this.save();
};

module.exports = model("counter", counterSchema);
