const registrationService = require("../services/registration.service");

async function registerStudent(req, res, next) {
  try {
    const registration = await registrationService.registerStudentToFormation(
      req.user.id,
      req.body.formation_id
    );

    res.status(201).json({
      message: "Inscription effectuee avec succes",
      registration,
    });
  } catch (error) {
    next(error);
  }
}

async function getMyRegistration(req, res, next) {
  try {
    const registration = await registrationService.getStudentRegistration(req.user.id);
    res.json(registration);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerStudent,
  getMyRegistration,
};
