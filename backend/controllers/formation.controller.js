const formationService = require("../services/formation.service");

async function getAllFormations(req, res, next) {
  try {
    const formations = await formationService.getAllFormations();
    res.json(formations);
  } catch (error) {
    next(error);
  }
}

async function getFormationById(req, res, next) {
  try {
    const formation = await formationService.getFormationById(req.params.id);
    res.json(formation);
  } catch (error) {
    next(error);
  }
}

async function createFormation(req, res, next) {
  try {
    const formation = await formationService.createFormation(req.body, req.user.id);
    res.status(201).json({
      message: "Formation creee avec succes",
      formation,
    });
  } catch (error) {
    next(error);
  }
}

async function updateFormation(req, res, next) {
  try {
    const formation = await formationService.updateFormation(req.params.id, req.body);
    res.json({
      message: "Formation modifiee avec succes",
      formation,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteFormation(req, res, next) {
  try {
    await formationService.deleteFormation(req.params.id);
    res.json({ message: "Formation supprimee avec succes" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
};
