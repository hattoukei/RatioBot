const { ApplicationCommandOptionType } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  name: "add-coins",
  description: "Forcefully adds coins to a user.",
  devOnly: true,
  testOnly: true,
  options: [
    {
      name: "user",
      description: "ok",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "amount",
      description: "amoutn of con",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(`'${user.username}' is adding coins to player.`);

    const targetUser = interaction.options.get("user").value;
    const amount = interaction.options.get("amount").value;

    const query = {
      userId: targetUser,
    };

    try {
      const balance = await Balance.findOne(query);

      if (balance) {
        let coinsBefore = balance.coins;

        balance.coins += amount;

        let coinsAfter = balance.coins;

        // if balance goes to negatives, set to 0.
        if (coinsAfter < 0) {
          balance.coins = 0;
        }

        await balance.save().catch((e) => {
          console.log(`Error adding balance: ${e}`);
        });

        interaction.reply(
          `Successfully added ${amount} coins to ${balance.userName}.`
        );

        console.log(
          `Coins for ${balance.userName} went from ${coinsBefore} -> ${coinsAfter}.`
        );
      } else {
        interaction.reply(`This player is not recorded in the database.`);
      }
    } catch (error) {
      console.log(
        `There was an error attempting to add coins to the player: ${error}`
      );
    }
  },
};
