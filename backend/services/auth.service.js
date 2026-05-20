const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

async function signup(data) {
  // On recupere les donnees envoyees.
  const { nom, email, password, role } = data;

  if (!nom || !email || !password || !role) {
    throw new Error("Tous les champs sont obligatoires");
  }

  if (!["ADMIN", "ETUDIANT"].includes(role)) {
    throw new Error("Role invalide");
  }

  const [existingUsers] = await pool.query(
    "SELECT id FROM utilisateurs WHERE email = ?",
    [email]
  );

  if (existingUsers.length > 0) {
    throw new Error("Email deja utilise");
  }

  // On hash le mot de passe avant de le stocker.
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)",
    [nom, email, hashedPassword, role]
  );

  return {
    id: result.insertId,
    nom,
    email,
    role,
  };
}

async function login(data) {
  // On recupere email et password saisis par l'utilisateur.
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email et mot de passe obligatoires");
  }

  const [rows] = await pool.query("SELECT * FROM utilisateurs WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const user = rows[0];

  // Compare le mot de passe saisi avec le hash en base.
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email ou mot de passe incorrect");
  }

  return {
    id: user.id,
    nom: user.nom,
    email: user.email,
    role: user.role,
  };
}

function generateToken(user) {
  // Le token contient l'id et le role.
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

module.exports = {
  signup,
  login,
  generateToken,
};
