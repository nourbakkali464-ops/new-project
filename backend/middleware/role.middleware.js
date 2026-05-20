function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifie" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acces refuse" });
    }

    next();
  };
}

module.exports = {
  authorizeRoles,
};
