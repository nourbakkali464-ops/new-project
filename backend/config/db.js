const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "formation_app",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
    return;
  }
  console.log("MySQL connected");
});

module.exports = db;