const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "bal",
  description: "Displays your balance.",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const { Pool } = require("pg");
    const database = new Pool({
      database: process.env.PG_DB,
      idleTimeoutMillis: 10000,
    });

    database.connect();
    let user = interaction.user;
    console.log(`'${user.username}' is attempting to look at their balance.`);

    try {
      const query = {
        text: `SELECT * FROM stats WHERE uuid = $1`,
        values: [user.id],
      };
      const result = await database.query(query);

      const embed = new EmbedBuilder().setTitle(
        `${user.username}'s balance: ${result.rows[0].coins} coins.`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.log(
        `There was an error attemping to fetch ${user.username}'s balance: ${error}`
      );
      interaction.reply({
        content: `An error has occurred while displaying your balance.`,
        ephemeral: true,
      });
    }

    database.end();
  },
};
