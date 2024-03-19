const { EmbedBuilder } = require("discord.js");

module.exports = {
    checkBotCommand: async function (interaction) {
        sleep = false;
        let random;

        switch (interaction.commandName) {
            // Ping pong
            case "ping":
                interaction.reply("nah fuck you");
                break;

            // Meows with a 1/100 chance.
            case "meow":
                random = Math.floor(Math.random() * 100);
                console.log(`Meow rolled '${random}'`);
                if (random === 1) {
                    interaction.reply("nya!!~~ >///<");
                } else {
                    interaction.reply("What the fuck?");
                }
                break;

            // Ends the bot's process
            case "sleep":
                await interaction.reply({
                    content: "Shutting down...",
                    files: [{ attachment: "src/images/amimir.jpeg" }],
                })

                sleep = true;
                return sleep;

            // Rolls some dice.
            case "roll":
                const die = interaction.options.get("dice").value;

                let output = `Rolling a ${die}.` + "\n" + "You rolled a";
                let count = 1;
                let roll = 1;

                if (die.includes("d")) {
                    count = Number(die.substring(0, die.lastIndexOf("d")));

                    //terrible catch error
                    if (count > 20) {
                        interaction.reply("Please do not go over 20 dice.");
                        break;
                    }

                    roll = Number(die.substring(die.indexOf("d") + 1));
                } else {
                    roll = Number(die);
                }

                // terrible catch error
                console.log(count);
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
                    break;
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
                break;

            // Multiplies two numbers
            case "no":
                const num1 = interaction.options.get("first-num").value;
                const num2 = interaction.options.get("second-num").value;

                console.log(num1, num2);

                interaction.reply(`${num1 * num2}`);
                break;

            // Returns a build for HSR character as embed
            case "build":
                const embed = new EmbedBuilder().setTitle(
                    "How the fuck did you bypass the requirements check?"
                );

                const characterId = interaction.options.get("character").value;

                if (characterId === 0) {
                    embed
                        .setTitle("Dr. Ratio")
                        .setDescription(
                            "Best build(s) for Dr. Ratio. (Taken from Prydwen)"
                        )
                        .setURL(
                            "https://www.prydwen.gg/star-rail/characters/dr-ratio"
                        )
                        .addFields(
                            {
                                name: "Top Relic Sets",
                                value:
                                    "Pioneer Diver... (4pc.)" +
                                    "\n" +
                                    "Pioneer Diver... (2pc.) + Grand Duke... (2pc.)" +
                                    "\n" +
                                    "Grand Duke... (2pc.) + Messenger... (2pc.)",
                            },
                            {
                                name: "Top Planetary Sets",
                                value:
                                    "Glamoth (160sp.)" +
                                    "\n" +
                                    "Inert Salsotto" +
                                    "\n" +
                                    "Space Sealing Station",
                            },
                            {
                                name: "Relic Stats:",
                                value:
                                    "Body: CR/CD" +
                                    "\n" +
                                    "Boots: SP/ATK" +
                                    "\n" +
                                    "Sphere: ATK/Imaginary" +
                                    "\n" +
                                    "Rope: ATK",
                            }
                        )
                        .setThumbnail("https://imgur.com/zHVXQF2.png")
                        .setTimestamp();
                }

                interaction.reply({ embeds: [embed] });
                break;
        }
        return sleep;
    },
};
