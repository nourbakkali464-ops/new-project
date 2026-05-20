const authService = require("../services/auth.service");

const COOKIE_NAME = "token";

function getCookieOptions() {
  // Options de securite du cookie JWT.
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };
}

async function signup(req, res, next) {
  try {
    // Cree l'utilisateur dans la base.
    const user = await authService.signup(req.body);

    // Cree le token apres inscription.
    const token = authService.generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(201).json({
      message: "Compte cree avec succes",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function signupAdmin(req, res, next) {
  try {
    // Ici on force le role ADMIN.
    const user = await authService.signup({
      ...req.body,
      role: "ADMIN",
    });
    const token = authService.generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(201).json({
      message: "Compte administrateur cree avec succes",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function signupStudent(req, res, next) {
  try {
    // Ici on force le role ETUDIANT.
    const user = await authService.signup({
      ...req.body,
      role: "ETUDIANT",
    });
    const token = authService.generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(201).json({
      message: "Compte etudiant cree avec succes",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    // Verifie email et mot de passe.
    const user = await authService.login(req.body);

    // Si login OK, on cree un token.
    const token = authService.generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.json({
      message: "Connexion reussie",
      user,
    });
  } catch (error) {
    next(error);
  }
}

function logout(req, res) {
  // On supprime le cookie pour deconnecter l'utilisateur.
  res.clearCookie(COOKIE_NAME, getCookieOptions());
  res.json({ message: "Deconnexion reussie" });
}

function me(req, res) {
  // Retourne l'utilisateur connecte.
  res.json({ user: req.user });
}

module.exports = {
  signup,
  signupAdmin,
  signupStudent,
  login,
  logout,
  me,
};
