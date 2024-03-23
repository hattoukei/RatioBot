const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "cf",
  description: "Bet some money and flip a coin.",
  testOnly: true,
  options: [
    {
      name: "bet",
      description: "Select the amount you want to bet.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    // Database connection
    const { Pool } = require("pg");
    const database = new Pool({
      database: process.env.PG_DB,
      idleTimeoutMillis: 10000,
    });

    database.connect();
    let user = interaction.user;
    console.log(`'${user.username}' is gambling with a coinflip.`);

    let temp = await database.query(
      `SELECT uuid FROM users WHERE ${user.id} = uuid`
    );

    if (temp.rows.length === 0) {
      interaction.reply(
        "You must first register your uuid using `/dbreg` before using this command."
      );
      return;
    }

    try {
      let bet = interaction.options.get("bet").value;
      let win = false;
      let roll;

      let query = {
        text: `SELECT coins FROM stats WHERE uuid = $1`,
        values: [user.id],
      };

      const balance = await database.query(query);
      console.log(balance.rows[0].coins, bet);

      // Checks if bet amount exceeds the user's balance. If so, exits.
      if (bet > balance.rows[0].coins) {
        console.log(
          "Error: User attempted to bet more than their current balance."
        );
        interaction.reply({
          content: `Sorry, you cannot bet ${bet} coins. Your balance is: ${balance.rows[0].coins}`,
          ephemeral: true,
        });
        return;
      }

      // Checks if bet is negative.
      if (bet <= 0) {
        console.log(`User attempted to enter a negative amount of coins.`);
        interaction.reply({
          content: `Sorry, you cannot bet ${bet} coins. Please choose a positive integer.`,
          ephemeral: true,
        });
        return;
      }

      // Randomizes heads or tails if user did not select one.
      roll = Math.floor(Math.random() * 100);
      let response = "";
      let sideroll = roll % 2;
      console.log(roll);

      // Special RNG case
      if (roll === 1) {
        interaction.reply(
          `The coin is standing on the rim. You have won ${bet * 10} coins.`
        );
        let query = {
          text: `UPDATE stats SET coins = coins + $2 * 10 WHERE uuid = $1`,
          values: [user.id, bet],
        };
        await database.query(query);
        return;
      }

      // Checks if user won the flip.
      if (sideroll === 0) {
        win = true;
      }

      if (win) {
        let query = {
          text: `UPDATE stats SET coins = coins + $2 WHERE uuid = $1`,
          values: [user.id, bet],
        };
        await database.query(query);
        response += `You have won ${bet} coins.`;
      } else {
        let query = {
          text: `UPDATE stats SET coins = coins - $2 WHERE uuid = $1`,
          values: [user.id, bet],
        };
        await database.query(query);
        response += `You have lost ${bet} coins.`;
      }

      interaction.reply(response);
    } catch (error) {
      console.log(`Error has occurred: ${error}`);
    }

    database.end();
  },
};
