module.exports = {
  name: "roll",
  description: "rolls some dice",
  // devOnly: true,
  // testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    roll(interaction);
  },
};

function roll(interaction) {
  const die = interaction.options.get("dice").value;
  console.log(`User entered '${die}'`);

  let output = `Rolling a ${die}.` + "\n" + "You rolled a";
  let count = 1;
  let roll = 1;

  if (die.includes("d")) {
    count = Number(die.substring(0, die.lastIndexOf("d")));

    //terrible catch error
    if (count > 20) {
      interaction.reply("Please do not go over 20 dice.");
      return;
    }

    roll = Number(die.substring(die.indexOf("d") + 1));
  } else {
    roll = Number(die);
  }

  // terrible catch error
  if (
    isNaN(roll) ||
    isNaN(count) ||
    roll <= 0 ||
    count <= 0 ||
    !Number.isInteger(roll) ||
    !Number.isInteger(count)
  ) {
    interaction.reply(
      "Sorry, I could not recognize your input. Please input a positive non-zero `integer` or in dice notation `AdX`."
    );
    return;
  }

  for (let i = 0; i < count; i++) {
    random = Math.ceil(Math.random() * roll);
    output += ` ${random}`;
    if (i === count - 1) {
      continue;
    }
    output += ",";
  }
  interaction.reply(output + "!");
}
