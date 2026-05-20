const { pool } = require("../config/db");

async function getAllFormations() {
  const [rows] = await pool.query(`
    SELECT f.*, u.nom AS admin_nom
    FROM formations f
    LEFT JOIN utilisateurs u ON f.created_by = u.id
    ORDER BY f.id DESC
  `);

  return rows;
}

async function getFormationById(id) {
  const [rows] = await pool.query("SELECT * FROM formations WHERE id = ?", [id]);

  if (rows.length === 0) {
    throw new Error("Formation introuvable");
  }

  return rows[0];
}

async function createFormation(data, adminId) {
  const { titre, description, date_debut, date_fin } = data;

  if (!titre || !description || !date_debut || !date_fin) {
    throw new Error("Tous les champs sont obligatoires");
  }

  const [result] = await pool.query(
    `
      INSERT INTO formations (titre, description, date_debut, date_fin, created_by)
      VALUES (?, ?, ?, ?, ?)
    `,
    [titre, description, date_debut, date_fin, adminId]
  );

  return getFormationById(result.insertId);
}

async function updateFormation(id, data) {
  const formation = await getFormationById(id);

  const titre = data.titre || formation.titre;
  const description = data.description || formation.description;
  const date_debut = data.date_debut || formation.date_debut;
  const date_fin = data.date_fin || formation.date_fin;

  await pool.query(
    `
      UPDATE formations
      SET titre = ?, description = ?, date_debut = ?, date_fin = ?
      WHERE id = ?
    `,
    [titre, description, date_debut, date_fin, id]
  );

  return getFormationById(id);
}

async function deleteFormation(id) {
  await getFormationById(id);
  await pool.query("DELETE FROM formations WHERE id = ?", [id]);
}

module.exports = {
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
};
