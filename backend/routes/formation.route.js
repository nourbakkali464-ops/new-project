const express = require("express");
const formationController = require("../controllers/formation.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authenticate, formationController.getAllFormations);
router.get("/:id", authenticate, formationController.getFormationById);
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  formationController.createFormation
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  formationController.updateFormation
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  formationController.deleteFormation
);

module.exports = router;
