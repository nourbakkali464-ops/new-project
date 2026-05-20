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
