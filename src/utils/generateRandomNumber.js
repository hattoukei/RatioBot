// returns a random integer given a range

module.exports = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
