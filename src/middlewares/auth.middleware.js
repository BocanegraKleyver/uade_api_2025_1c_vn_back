const jwt = require("../utils/jwt");

const verificarToken = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `🔐 Middleware verificarToken activado para ${req.method} ${req.originalUrl}`
    );
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Token no provisto");
    }
    return res.status(401).json({ error: "Token no provisto" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verificarToken(token);

    if (!usuario.activo) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`⚠️ Usuario inactivo: ${usuario.email}`);
      }
      return res.status(403).json({ error: "Usuario inactivo" });
    }

    req.usuario = usuario;

    if (process.env.NODE_ENV === "development") {
      console.log(`✅ Token válido para ${usuario.email}`);
    }

    next();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("❌ Error al verificar token:", error.message);
    }
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = verificarToken;
