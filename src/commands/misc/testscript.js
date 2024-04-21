const { PythonShell } = require("python-shell");

const options = {
  scriptPath:
    "/Users/tensofu/Desktop/VSC/RatioBot/src/extras/Rock_Paper_Scissors.py", // Replace with actual script path
};

module.exports = {
  name: "testscript",
  description: "testing",
  // devOnly: true,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    let output = ["RPS:\n"];
    let process = new PythonShell(
      "/Users/tensofu/Desktop/VSC/RatioBot/src/extras/RPS.py",
      { mode: "text" }
    );

    process.send("r");

    process.on("message", function (message) {
      output.push(message.toString("utf8"));
      output.push("\n");
      console.log(output);
      console.log(message);
    });

    setTimeout(() => {
      const finalMessage = output.join("");
      console.log(finalMessage);
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
