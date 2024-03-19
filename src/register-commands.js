require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "ping for a pong",
    },
    {
        name: "meow",
        description: "please don't.",
    },
    {
        name: "sleep",
        description: "puts the bot to sleep.",
    },
    {
        name: "roll",
        description: "rolls some dice.",
        options: [
            {
                name: "dice",
                description: "Enter in form '2d6' or as an integer only.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: "no",
        description: "basic multiplication.",
        options: [
            {
                name: "first-num",
                description: "idk",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "second-num",
                description: "idk",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: "build",
        description: "Character builds for Honkai: Star Rail.",
        options: [
            {
                name: "character",
                description: "Select a valid character.",
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: "Dr. Ratio",
                        value: 0,
                    },
                ],
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Slash commands were registered successfully!");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
