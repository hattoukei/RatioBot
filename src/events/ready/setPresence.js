const { ActivityType } = require("discord.js")

module.exports = (client) => {
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
};