const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Get all formations
app.get("/api/formations", (req, res) => {
  db.query("SELECT * FROM formations", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add student
app.post("/api/etudiants", (req, res) => {
  const { nom, prenom, email, telephone } = req.body;

  const sql =
    "INSERT INTO etudiants (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)";

  db.query(sql, [nom, prenom, email, telephone], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Étudiant ajouté",
      etudiantId: result.insertId,
    });
  });
});

// Add inscription
app.post("/api/inscriptions", (req, res) => {
  const { etudiant_id, formation_id } = req.body;

  const sql =
    "INSERT INTO inscriptions (etudiant_id, formation_id) VALUES (?, ?)";

  db.query(sql, [etudiant_id, formation_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Inscription ajoutée",
      inscriptionId: result.insertId,
    });
  });
});

// Get inscriptions
app.get("/api/inscriptions", (req, res) => {
  const sql = `
    SELECT 
      inscriptions.id,
      etudiants.nom,
      etudiants.prenom,
      etudiants.email,
      formations.titre AS formation,
      inscriptions.date_inscription
    FROM inscriptions
    JOIN etudiants ON inscriptions.etudiant_id = etudiants.id
    JOIN formations ON inscriptions.formation_id = formations.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});