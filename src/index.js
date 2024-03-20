require("dotenv").config();

const database = require('pg')

client.connect();

const botCommands = require("./bot-commands.js");
const eventHandler = require("./handlers/eventHandler.js");
const userInteractions = require("./user-interactions.js");
const { Client, IntentsBitField, ActivityType } = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async() => {
    await database.connect(
        
    );

    eventHandler(client);
})();
databaseHandler()

/*
// When bot first comes online.
client.on("ready", (c) => {
    console.log(`Hello, ${c.user.tag}`);

    client.user.setPresence({
        activities: [
            {
                name: "Exterminating Monkeys",
                type: ActivityType.Streaming,
                url: "https://www.youtube.com/watch?v=ePxQwMKj5L8",
            },
        ],
        status: "online",
    });
});

// Scans each message sent.
client.on("messageCreate", (msg) => {
    // todo: add user to database if id is not already in.

    // Displays message and author.
    console.log(
        `[${msg.guild.nameAcronym}] ${msg.author.globalName}: "${msg.content}"`
    );
});

// COMMAND INTERACTIONS ONLY
client.on("interactionCreate", async interaction => {
    // Displays interaction and author
    console.log(
        `[${interaction.guild.nameAcronym}] ${interaction.user.globalName}: /${interaction.commandName} ${interaction.options.data}` // Fix later
    );

    if (!interaction.isChatInputCommand()) return;

    if (await botCommands.checkBotCommand(interaction)) {
        console.log('Client is now asleep.')
        client.destroy();

        return;
    }
});
*/

client.login(process.env.TOKEN);
