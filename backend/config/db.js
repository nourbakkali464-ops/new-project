<<<<<<< HEAD
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
=======
const mysql = require("mysql2/promise");

// Pool = ensemble de connexions reutilisables a MySQL.
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "tp_full_stack",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function testConnection() {
    // On ouvre une connexion juste pour verifier que tout marche.
    const connection = await pool.getConnection();
    console.log("Connexion MySQL reussie");
    connection.release();
}

module.exports = {
    pool,
    testConnection,
};
>>>>>>> 75dd7646edad96818b0d808f3be209323885f390
