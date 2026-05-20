require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const formationRoutes = require("./routes/formation.route");
const registrationRoutes = require("./routes/registration.route");

const app = express();

// On autorise le frontend a parler avec le backend.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Permet de lire le JSON envoye dans req.body.
app.use(express.json());

// Permet de lire les cookies envoyes par le navigateur.
app.use(cookieParser());

// Petite route test pour voir si l'API marche.
app.get("/", (req, res) => {
  res.json({ message: "API TP Full Stack active" });
});

// Ici on branche les grandes parties de notre API.
app.use("/api/auth", authRoutes);
app.use("/api/formations", formationRoutes);
app.use("/api/registrations", registrationRoutes);

// Si aucune route ne correspond, on retourne 404.
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

// Middleware global pour afficher et renvoyer les erreurs.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Erreur serveur",
  });
});

module.exports = app;
