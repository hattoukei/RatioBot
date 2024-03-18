/*
This file handles all user interactions.
    toggleCanPing(): sets cooldown for Dr. Ratio's replieswhen pinged
    toggleCanReference(): sets cooldown for Dr. Ratio replies when referenced
    validUsers contains specific members of the classroom
    ifPinged(): Replies based on who pinged + message content
    ifReferenced(): Replies based on message content
*/

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
    "310812771971235841", // Me
    "401243773834887169", // Ushi
    "508122760644395009", // the hater
    "360925236243202059", // the complainer
    "736824696271667300", // Hdeth
    "446502936076615691", // Darth Fetus
    "302224088540119040", // DatOneGuy
];

// Performs commands if Dr. Ratio is pinged.
function ifPinged(msg) {
    let uuid = msg.author.id;

    if (canPing === true) {
        canPing = false;
        timer = setTimeout(toggleCanPing, 15000);

        // CHECK FOR CONTENT SPECIFIC CASES
        if (msg.content.toLowerCase().includes("fuck you")) {
            msg.reply("fuck you too");
            return;
        } else if (msg.content.toLowerCase().includes("fuck off")) {
            msg.reply("nah.");
            return;
        } else if (msg.content.toLowerCase().includes("kys")) {
            msg.reply(`i'm going to cum on your forehead.`);
            return;
        } else if (msg.content.toLowerCase().includes("do you play")) {
            msg.reply(
                `I will not belittle myself to play these so called "games".`
            );
            return;
        } else if (msg.content.toLowerCase().includes("anthony")) {
            msg.reply(`Please never mention that name ever again.`);
            return;
        } else if (msg.content.toLowerCase().includes("sparkle")) {
            msg.reply(`I am elation!`);
            return;
        }
        // CHECKS FOR SPECIFIC USER CASES
        else if (validUsers.includes(uuid)) {
            if (uuid === validUsers[0]) {
                // Case: Me
                msg.reply({
                    content: "hi.",
                });
                return;
            } else if (uuid === validUsers[1]) {
                // Case: Ushi
                msg.reply({
                    content: "grogas",
                });
                return;
            } else if (uuid === validUsers[2]) {
                // Case: the hater
                msg.reply({
                    content:
                        "You are like a primitive version of me, except you are just racist." +
                        "\n" +
                        "Also:" +
                        "\n" +
                        "https://www.op.gg/summoners/na/OmlitD-NA1/matches/RvuDQoxvmIJG923-34PgH4t2b7h0jKssqEoBIWzr6HE%3D/1709951892000" +
                        "\n" +
                        "https://iaace-na.github.io/lol-match-stats-viewer/?match=https%3A%2F%2Frewind.lol%2Fgetmatch%2FNA%2F4794143099%2Fstats",
                    files: [{ attachment: "src/images/yone1.png" }],
                });
                return;
            } else if (uuid === validUsers[3]) {
                // Case: the complainer
                msg.reply({
                    content: "Please, don't ever talk to me again. Also:",
                    files: [{ attachment: "src/images/ohgodno1.png" }],
                });
                return;
            } else if (uuid === validUsers[4]) {
                // Case: Hdeth
                msg.reply({
                    contents: `Mind if we grab a cup of tea later this evening, ${msg.author.globalName}?`,
                });
                return;
            } else if (uuid === validUsers[5]) {
                // Case: Darth Fetus
                msg.reply({
                    contents:
                        "Wait... I've seen you before. Your ass ran it down 26 deaths in my game a few days ago." +
                        "\n" +
                        "https://iaace-na.github.io/lol-match-stats-viewer/?match=https%3A%2F%2Frewind.lol%2Fgetmatch%2FNA%2F4911615208%2Fstats",
                    files: [{ attachment: "src/images/nunu1" }],
                });
                return;
            }
            // Case for if user is in validUser but does not have a defined scenario.
            msg.reply(`I'm using you as an empty case. <@${validUsers[0]}>`);
            return;
        } else {
            // Case for if user is in validUser but does not have a defined scenario.
            msg.reply(`Huh?`);
        }
    }
}

// Calls when "ratio" is mentioned.
function ifReferenced(msg) {
    if (canReference === true) {
        canReference = false;
        timer = setTimeout(toggleCanReference, 60000);
        msg.reply({ content: "Hmm?" });
        // msg.reply({ files: [{ attachment: "src/images/wlelt2.png" }] });
    }
    return;
}

module.exports = {
    checkUserInteraction: function (msg, client) {
        let found = false;

        console.log("Running interaction");

        if (msg.mentions.has(client.user)) {
            console.log("Running ping");
            // set found equal to true so your index.js file knows
            //   to not try executing 'other' commands
            found = true;
            // execute function associated with this command
            ifPinged(msg);
            console.log("Ping executed");
        } else if (msg.content.toLowerCase().includes("ratio")) {
            console.log("Running reference");

            found = true;
            ifReferenced(msg);
            console.log("Reference executed");
        }

        console.log("exiting interaction");

        // value of 'found' will be returned in index.js
        return found;
    },
};
