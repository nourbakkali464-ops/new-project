const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

async function authenticate(req, res, next) {
  try {
    // On recupere le token dans les cookies.
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // On decode le token avec la cle secrete.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On recharge l'utilisateur depuis la base.
    const [rows] = await pool.query(
      "SELECT id, nom, email, role FROM utilisateurs WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    // On stocke l'utilisateur pour la suite de la requete.
    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expire" });
  }
}

module.exports = {
  authenticate,
};
