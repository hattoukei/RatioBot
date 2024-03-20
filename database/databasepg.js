const {Client} = require('pg')

const client = new Client ({
  host: "localhost",
  port: 5432,
  database: "ratiodb"
})

client.connect();

client.query(`SELECT * FROM users`, (error, result) => {
  if (!error) {
    console.log(result.rows);
  } else {
    console.log(error.message);
  }
  client.end;
})