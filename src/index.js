require("dotenv").config();

const botCommands = require("./bot-commands.js");
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
    // Displays message and author.
    console.log(
        `[${msg.guild.nameAcronym}] ${msg.author.globalName}: "${msg.content}"`
    );
    if (msg.author.bot) {
        return;
    } else if (userInteractions.checkUserInteraction(msg, client)) {
        return;
    } else {
        return;
    }
});

// COMMAND INTERACTIONS ONLY
client.on("interactionCreate", (interaction) => {
    // Displays interaction and author
    console.log(
        `[${interaction.guild.nameAcronym}] ${interaction.user.globalName}: ${interaction.content} ${interaction.options.get("dice").value}`
    );

    if (!interaction.isChatInputCommand()) return;

    if (botCommands.checkBotCommand(interaction)) {
        return;
    }
});

client.login(process.env.TOKEN);
