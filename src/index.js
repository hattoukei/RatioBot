require("dotenv").config();

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
    eventHandler(client);
})();

client.login(process.env.TOKEN);
