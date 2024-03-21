const { Pool } = require('pg')

const database = new Pool ({
    host: "localhost",
    port: 5432,
    database: "ratiodb"
})

database.connect()

module.exports = {
  name: "dbdel",
  description: "deletes you from database",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
      let user = interaction.user;
      console.log(`Attempting to delete '${user.id}' as '${user.username}' from database.`)

      let temp = await database.query(`SELECT uuid FROM users WHERE ${user.id} = uuid`)

      try {
        if (temp.rows.length === 1) {
          const query = {
            text: `DELETE FROM users WHERE uuid = ${user.id}`
          }
            const res = await database.query(query)

            console.log(`Deleting UUID '${user.id}' from database.`)
            interaction.reply({
              content: `Your UUID: ${user.id} has been successfully deleted`,
              ephemeral: true,
            })
        } else {
          console.log(`UUID: ${user.id} has not been found in the database.`)
          interaction.reply({
            content: `Your information is not stored in the database.`,
            ephemeral: true,
          })
        }
      } catch (error) {
        interaction.reply({
          content: `An error has occurred while deleting you from the database.`,
          ephemeral: true,
        })
        console.log(`There was an error deleting ${user.username} from the database: ${error}`)
      }
      res = await database.query('SELECT * FROM users')

      console.log(res.rows)
    },
};
