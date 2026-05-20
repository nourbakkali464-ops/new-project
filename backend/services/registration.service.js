const { pool } = require("../config/db");

async function registerStudentToFormation(studentId, formationId) {
  if (!formationId) {
    throw new Error("formation_id est obligatoire");
  }

  // On verifie que la formation existe et qu'elle n'est pas deja terminee.
  const [formationRows] = await pool.query(
    "SELECT id, titre, date_fin FROM formations WHERE id = ?",
    [formationId]
  );

  if (formationRows.length === 0) {
    throw new Error("Formation introuvable");
  }

  const formation = formationRows[0];

  // Si la date de fin est deja passee, on refuse l'inscription.
  if (new Date(formation.date_fin) < new Date(new Date().toISOString().split("T")[0])) {
    throw new Error("Cette formation est deja expiree");
  }

  // Un etudiant peut avoir plusieurs inscriptions dans l'historique,
  // mais une seule formation active a la fois.
  const [registrationRows] = await pool.query(
    `
      SELECT i.id, i.formation_id, f.titre, f.date_fin
      FROM inscriptions i
      JOIN formations f ON f.id = i.formation_id
      WHERE i.utilisateur_id = ? AND f.date_fin >= CURDATE()
    `,
    [studentId]
  );

  if (registrationRows.length > 0) {
    throw new Error(
      "L'etudiant a deja une formation active. Il pourra choisir une autre formation apres la date de fin."
    );
  }

  // Ici on ajoute l'inscription de l'etudiant.
  const [result] = await pool.query(
    "INSERT INTO inscriptions (utilisateur_id, formation_id) VALUES (?, ?)",
    [studentId, formationId]
  );

  return {
    id: result.insertId,
    utilisateur_id: studentId,
    formation_id: formationId,
  };
}

async function getStudentRegistration(studentId) {
  // Cherche la formation active actuelle.
  const [activeRows] = await pool.query(
    `
      SELECT i.id, i.utilisateur_id, i.formation_id, f.titre, f.description, f.date_debut, f.date_fin
      FROM inscriptions i
      JOIN formations f ON i.formation_id = f.id
      WHERE i.utilisateur_id = ? AND f.date_fin >= CURDATE()
      ORDER BY f.date_fin ASC
    `,
    [studentId]
  );

  const [historyRows] = await pool.query(
    `
      SELECT i.id, i.utilisateur_id, i.formation_id, f.titre, f.description, f.date_debut, f.date_fin
      FROM inscriptions i
      JOIN formations f ON i.formation_id = f.id
      WHERE i.utilisateur_id = ?
      ORDER BY i.created_at DESC
    `,
    [studentId]
  );

  if (historyRows.length === 0) {
    return { message: "Aucune inscription trouvee" };
  }

  // On renvoie la formation active + l'historique complet.
  return {
    inscription_active: activeRows[0] || null,
    historique: historyRows,
  };
}

module.exports = {
  registerStudentToFormation,
  getStudentRegistration,
};
