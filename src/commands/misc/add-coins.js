const { ApplicationCommandOptionType } = require("discord.js");

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
    const { Pool } = require("pg");
    const database = new Pool({
      database: process.env.PG_DB,
    });

    database.connect();
    let user = interaction.user;
    console.log(`'${user.username}' is gambling with a coinflip.`);

    const targetUser = interaction.options.get("user").value;
    const amount = interaction.options.get("amount").value;

    try {
      const query = {
        text: `UPDATE stats SET coins = coins + $1 WHERE uuid = $2`,
        values: [amount, targetUser],
      };
      database.query(query);

      const query2 = {
        text: `SELECT coins FROM stats WHERE uuid = $1`,
        values: [targetUser],
      };
      let result = await database.query(query2);
      let coinsAfter = result.rows[0].coins;

      if (coinsAfter < 0) {
        const query = {
          text: `UPDATE stats SET coins = 0 WHERE uuid = $1`,
          values: [targetUser],
        };
        await database.query(query);
      }
      interaction.reply(`Successfully added ${amount} coins.`);
    } catch (error) {
      console.log(
        `There was an error attempting to add coins to the player: ${error}`
      );
    }
    database.end();
  },
};
