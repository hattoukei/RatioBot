const responses = require("./json/responses.json");
const helper = require("./helper-functions.js");

/*
This file handles all user interactions.
    toggleCanPing(): sets cooldown for Dr. Ratio's replies when pinged
    toggleCanReference(): sets cooldown for Dr. Ratio replies when referenced
    validUsers contains specific members of the classroom
    ifPinged(): Replies based on who pinged + message content
    ifReferenced(): Replies based on message content
*/

let timer;
let canPing = true;
let canReference = true;

function toggleCanPing() {
    canPing = true;
    clearTimeout(timer);
}

function toggleCanReference() {
    canReference = true;
    clearTimeout(timer);
}

// Performs commands if Dr. Ratio is pinged.
function ifPinged(msg) {
    let uuid = msg.author.id;
    let lowered = msg.content.toLowerCase();

    if (canPing === true) {
        canPing = false;
        timer = setTimeout(toggleCanPing, 1000);

        // CHECK FOR CONTENT SPECIFIC CASES
        if (helper.checkValidSubstring(lowered, responses.validSubstring)) {
            const substring = responses.validSubstring.find((validSubstring) =>
                lowered.includes(validSubstring.substring)
            );
            msg.reply(substring.interaction[0]);
        }

        // IF VALIDUSER, CHECK FOR SPECIFIC USER CASES
        else if (helper.checkValidUser(uuid, responses.validUsers)) {
            const user = responses.validUsers.find(
                (validUsers) => validUsers.uuid === uuid
            );

            // bypasses text replies for ME ONLY (else others)
            if (user.uuid === "310812771971235841") {
                msg.reply("yeah");
            } else {
                random = Math.floor(Math.random() * user.interaction.length)
                msg.reply(user.interaction[random]);
            }

            // DEFAULT CASE IF NOT IN VALID USER
        } else {
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
