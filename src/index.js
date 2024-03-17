require("dotenv").config();

// mess start
function toggleCanPing() {
    canPing = true;
    clearTimeout(timer);
}

function toggleCanReference() {
    canReference = true;
    clearTimeout(timer);
}

let timer;
let canPing = true;
let canReference = true;

let validUsers = [
    "310812771971235841",
    "401243773834887169",
    "508122760644395009",
    "360925236243202059",
    "736824696271667300",
];

/*
0: Me
1: Ushi
2: the hater
3: the complainer
4: Hdeth
*/

// mess end

const { Client, IntentsBitField } = require("discord.js"); // import

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, // bot has access to the `Guilds` intents (discord js doc). also a guild is a server in discord js
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`Hello, ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
    console.log(`[${msg.guild.nameAcronym}] ${msg.author.globalName}: "${msg.content}"`); // logs discord user and their message

    if (msg.author.bot) {
        return;
    }

    if (msg.mentions.has(client.user)) {
        ifPinged();
    } else if (msg.content.toLowerCase().includes("ratio")) {
        ifReferenced();
    } else {
        return;
    }

    function ifPinged() {
        if (canPing === true) {
            canPing = false;
            timer = setTimeout(toggleCanPing, 15000);

            // CHECKS FOR SPECIFIC USER CASES
            if (validUsers.includes(msg.author.id)) {
                if (msg.author.id === validUsers[0]) {
                    // Case: Me
                    msg.reply(`Hello, Founder ${msg.author.globalName}.`);
                    return;
                } else if (msg.author.id === validUsers[1]) {
                    // Case: Ushi
                    msg.reply(`... Gragas?`);
                    return;
                } else if (msg.author.id === validUsers[2]) {
                    // Case: the hater
                    msg.reply({
                        content:
                            "You are like a primitive version of me, except you are just racist." +
                            "\n" +
                            "Also" +
                            "\n" +
                            "https://www.op.gg/summoners/na/OmlitD-NA1/matches/RvuDQoxvmIJG923-34PgH4t2b7h0jKssqEoBIWzr6HE%3D/1709951892000" +
                            "\n" +
                            "https://iaace-na.github.io/lol-match-stats-viewer/?match=https%3A%2F%2Frewind.lol%2Fgetmatch%2FNA%2F4794143099%2Fstats",
                        files: [{ attachment: "src/images/yone1.png" }],
                    });
                    return;
                } else if (msg.author.id === validUsers[3]) {
                    // Case: the complainer
                    msg.reply({
                        content: "Please, don't ever talk to me again. Also:",
                        files: [{ attachment: "src/images/ohgodno1.png" }],
                    });
                    return;
                } else if (msg.author.id === validUsers[4]) {
                    // Case: Hdeth
                    msg.reply(
                        `Fancy seeing you here today, ${msg.author.globalName}.`
                    );
                    return;
                } else {
                    msg.reply(`Hello, ${msg.author.globalName}.`);
                    return;
                }
            } else {
                if (msg.content.toLowerCase().includes("fuck you")) {
                    msg.reply("fuck you too");
                    return;
                } else if (msg.content.toLowerCase().includes("fuck off")) {
                    msg.channel.send("nah.");
                    return;
                } else {
                    msg.reply("You dare ping me, foul monkey?");
                }
            }
        }
    }

    function ifReferenced() {
        if (canReference === true) {
            canReference = false;
            timer = setTimeout(toggleCanReference, 60000);
            msg.reply({ content: "Hmm?" });
            // msg.reply({ files: [{ attachment: "src/images/wlelt2.png" }] });
        }
        return;
    }
});

client.login(process.env.TOKEN);
