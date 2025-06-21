const jwt = require("../utils/jwt");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("⚠️ Token no provisto");
    return res.status(401).json({ error: "Token no provisto" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verificarToken(token);

    if (!usuario.activo) {
      console.warn(`⚠️ Usuario inactivo: ${usuario.email}`);
      return res.status(403).json({ error: "Usuario inactivo" });
    }

    req.usuario = usuario; // Guardamos info útil en el request
    next();
  } catch (error) {
    console.warn(`⚠️ Token inválido o expirado: ${error.message}`);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = verificarToken;
