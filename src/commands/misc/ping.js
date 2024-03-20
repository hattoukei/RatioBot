module.exports = {
    name: "ping",
    description: "pong",
    // devOnly: Boolean,
    testOnly: true,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply(`nah fuck you. (${client.ws.ping}ms)`);
    },
};
