const express = require("express");
const registrationController = require("../controllers/registration.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("ETUDIANT"),
  registrationController.registerStudent
);
router.get(
  "/me",
  authenticate,
  authorizeRoles("ETUDIANT"),
  registrationController.getMyRegistration
);

module.exports = router;
