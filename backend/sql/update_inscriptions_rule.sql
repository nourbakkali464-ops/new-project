USE tp_full_stack;

-- A lancer si la table inscriptions existe deja.
-- On supprime l'ancienne contrainte UNIQUE pour autoriser l'historique.
ALTER TABLE inscriptions DROP INDEX utilisateur_id;

-- Apres cette modification :
-- un etudiant peut avoir plusieurs anciennes inscriptions,
