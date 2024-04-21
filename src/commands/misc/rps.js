const { ApplicationCommandOptionType } = require("discord.js");
const { PythonShell } = require("python-shell");
const Player = require("../../schemas/player");

const options = {
  scriptPath:
    "/Users/tensofu/Desktop/VSC/RatioBot/src/extras/Rock_Paper_Scissors.py", // Replace with actual script path
};

module.exports = {
  name: "rps",
  description: "rock, paper, scissors",
  // devOnly: true,
  testOnly: true,
  options: [
    {
      name: "input",
      description: "Type R/P/S for your input.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let output = ["Rock, Paper, Scissors:\n"];
    let score = [0, 0, 0];

    const process = new PythonShell(
      "/Users/tensofu/Desktop/VSC/RatioBot/src/extras/RPS.py",
      { mode: "text" }
    );

    const player = await Player.findOne({ userId: interaction.user.id });
    const playerScore = player.fun;
    console.log(playerScore);

    let input = interaction.options.get("input").value;

    process.send(input);

    process.on("message", function (message) {
      output.push(message.toString("utf8"));
      output.push("\n");
    });

    setTimeout(() => {
      console.log(output);
      const finalMessage = output.join("");
      interaction.reply({ content: finalMessage });
    }, 1000); // Delay of 2 seconds

    process.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
  },
};
