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
    let lowered = msg.content.toLowerCase();

    if (canPing === true) {
        canPing = false;
        timer = setTimeout(toggleCanPing, 15000);

        // CHECK FOR CONTENT SPECIFIC CASES
        if (lowered.includes("fuck you")) {
            msg.reply("fuck you too");
            return;
        } else if (lowered.includes("fuck off")) {
            msg.reply("nah.");
            return;
        } else if (lowered.includes("kys")) {
            msg.reply(`i'm going to cum on your forehead.`);
            return;
        } else if (lowered.includes("do you play")) {
            msg.reply(
                `I will not belittle myself to play these so called "games".`
            );
            return;
        } else if (lowered.includes("anthony")) {
            msg.reply(`Please never mention that name ever again.`);
            return;
        } else if (lowered.includes("sparkle")) {
            msg.reply(`I am elation!`);
            return;
        }
        // CHECKS FOR SPECIFIC USER CASES
        else if (validUsers.includes(uuid)) {
            switch (uuid) {
                // Case: Me
                case validUsers[0]:
                    msg.reply({
                        content: "hi.",
                    });
                    break;

                // Case: Ushi
                case validUsers[1]:
                    msg.reply({
                        content: "grogas",
                    });
                    break;

                // Case: the hater
                case validUsers[2]:
                    msg.reply({
                        content:
                            "You are like a primitive version of me, except you are racist." +
                            "\n" +
                            "Also:" +
                            "\n" +
                            "https://www.op.gg/summoners/na/OmlitD-NA1/matches/RvuDQoxvmIJG923-34PgH4t2b7h0jKssqEoBIWzr6HE%3D/1709951892000" +
                            "\n" +
                            "https://iaace-na.github.io/lol-match-stats-viewer/?match=https%3A%2F%2Frewind.lol%2Fgetmatch%2FNA%2F4794143099%2Fstats",
                        files: [{ attachment: "src/images/yone1.png" }],
                    });
                    break;

                // Case: the complainer
                case validUsers[3]:
                    msg.reply({
                        content: "Please, don't ever talk to me again. Also:",
                        files: [{ attachment: "src/images/ohgodno1.png" }],
                    });
                    break;

                // Case: Hdeth
                case validUsers[4]:
                    msg.reply({
                        contents: `Mind if we grab a cup of tea later this evening, ${msg.author.globalName}?`,
                    });
                    break;

                // Case: Darth Fetus
                case validUsers[5]:
                    msg.reply({
                        contents:
                            "Wait... I've seen you before. Your ass ran it down 26 deaths in my game a few days ago." +
                            "\n" +
                            "https://iaace-na.github.io/lol-match-stats-viewer/?match=https%3A%2F%2Frewind.lol%2Fgetmatch%2FNA%2F4911615208%2Fstats",
                        files: [{ attachment: "src/images/nunu1" }],
                    });
                    break;

                // Default case for if user is in validUser but does not have a defined scenario.
                default:
                    msg.reply(
                        `I'm using you as a default case. <@${validUsers[0]}>`
                    );
            }
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

        if (msg.mentions.has(client.user)) {
            found = true;
            ifPinged(msg);
        } else if (msg.content.includes("ratio")) {
            found = true;
            ifReferenced(msg);
        }
        return found;
    },
};
