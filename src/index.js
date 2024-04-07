require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const botCommands = require("./bot-commands.js");
const eventHandler = require("./handlers/eventHandler.js");
const userInteractions = require("./user-interactions.js");
const mongoose = require('mongoose');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB.");
    
        eventHandler(client);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

client.login(process.env.TOKEN);
