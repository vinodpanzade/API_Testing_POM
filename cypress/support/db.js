const mysql = require("mysql2/promise");

async function queryDB(query) {

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vinod1234#",
    database: "testdb"
  });

  const [rows] = await connection.execute(query);

  await connection.end();

  return rows;
}

module.exports = { queryDB };