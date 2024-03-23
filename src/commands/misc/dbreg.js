module.exports = {
  name: "dbreg",
  description: "registers your uuid and name for the bot",
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
    console.log(`Attempting to register '${user.id}' as '${user.username}'.`);

    let temp = await database.query(
      `SELECT uuid FROM users WHERE ${user.id} = uuid`
    );

    try {
      if (temp.rows.length === 0) {
        const query1 = {
          text: "INSERT INTO users (uuid, username) VALUES($1, $2)",
          values: [user.id, user.username],
        };
        await database.query(query1);

        const query2 = {
          text: "INSERT INTO stats (uuid, coins) VALUES($1, $2)",
          values: [user.id, 1000],
        };
        await database.query(query2);

        console.log(`UUID: ${user.id} has successfuly been registered.`);
        interaction.reply({
          content: `You have been successfully registered! UUID: ${user.id}`,
          ephemeral: true,
        });
      } else {
        console.log(`UUID: ${user.id} has already been registered.`);
        interaction.reply({
          content: `You have already been registered.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      interaction.reply({
        content: `An error has occurred while registering you to the database.`,
        ephemeral: true,
      });
      console.log(`Register error: ${error}`);
    }
    res = await database.query("SELECT * FROM users");

    console.log(res.rows);

    database.end();
  },
};
