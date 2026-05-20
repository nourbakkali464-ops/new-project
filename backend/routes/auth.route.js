const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signup-admin", authController.signupAdmin);
router.post("/signup-student", authController.signupStudent);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

module.exports = router;
