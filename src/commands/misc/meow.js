module.exports = {
    name: "meow",
    description: "please don't",
    // devOnly: Boolean,
    testOnly: true,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        random = Math.floor(Math.random() * 100);
        console.log(`Meow rolled '${random}'`);
        switch (random) {
            case 1:
                interaction.reply("uwu~~ nya!!! :3");
                break;
            case 2:
                interaction.reply("the ting go uwaaaa! >///< nya nya nya nya nya! :3");
                break;
            case 3:
                interaction.reply("the ting go uwaaaa! >///< nya nya nya nya nya! :3");
                break;
            default:
                interaction.reply("What the fuck?");
        }
    },
};
