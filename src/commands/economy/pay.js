const { ApplicationCommandOptionType } = require("discord.js");
const isNegative = require("../../utils/isNumberNegative.js");
const Player = require("../../schemas/player");

module.exports = {
  name: "pay",
  description: "Gives some of your coins to a user.",
  devOnly: false,
  testOnly: true,
  options: [
    {
      name: "user",
      description: "select the user",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "amount",
      description: "Amount of coins to give.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(`'${user.username}' is adding coins to player.`);

    const targetUser = interaction.options.get("user").value;
    const baseUser = user.id;
    const amount = interaction.options.get("amount").value;

    if (amount <= 0) {
      interaction.reply({
        content: `Sorry, you cannot pay a non-positive amount.`,
        ephemeral: true,
      });
      return;
    }

    if (baseUser === targetUser) {
      interaction.reply({
        content: `Sorry, you cannot pay yourself.`,
        ephemeral: true,
      });
      return;
    }

    const query1 = {
      userId: baseUser,
    };

    const query2 = {
      userId: targetUser,
    };

    try {
      const baseBalance = await Player.findOne(query1);
      const targetBalance = await Player.findOne(query2);

      if (baseBalance && targetBalance) {
        let coinsBeforeFirst = baseBalance.coins;
        let coinsBeforeSecond = targetBalance.coins;

        if (isNegative(coinsBeforeFirst - amount)) {
          console.log(
            "Error: User attempted to pay more than their current balance."
          );
          interaction.reply({
            content: `Sorry, you cannot pay ${amount} coins. Your balance is: ${baseBalance.coins}`,
            ephemeral: true,
          });
          return;
        }

        // Handles the payment and changes to database.
        baseBalance.coins -= amount;
        targetBalance.coins += amount;

        await baseBalance.save().catch((e) => {
          console.log(`Error updating balance: ${e}`);
        });

        await targetBalance.save().catch((e) => {
          console.log(`Error updating balance: ${e}`);
        });

        let coinsAfterFirst = baseBalance.coins;
        let coinsAfterSecond = targetBalance.coins;

        interaction.reply({
          content: `Successfully paid ${amount} coins to ${targetBalance.userName}.`,
        });

        console.log(
          `Coins for ${baseBalance.userName} went from ${coinsBeforeFirst} -> ${coinsAfterFirst}.`
        );
        console.log(
          `Coins for ${targetBalance.userName} went from ${coinsBeforeSecond} -> ${coinsAfterSecond}.`
        );
      } else {
        interaction.reply({
          content:
            "There has been an error processing the payment. Verify if both users have registered using `/reg`.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`There was an error attempting to pay the player: ${error}`);
    }
  },
};
