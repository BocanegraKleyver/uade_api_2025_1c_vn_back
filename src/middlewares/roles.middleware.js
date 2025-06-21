module.exports = function soloAdmin(req, res, next) {
  if (!req.usuario || !req.usuario.activo) {
    console.warn("❌ Acceso denegado: usuario no autenticado o inactivo");
    return res
      .status(403)
      .json({ error: "Acceso denegado: usuario inactivo o no autenticado" });
  }

  if (req.usuario.rol !== "admin") {
    console.warn(
      `❌ Usuario ${req.usuario.email} intentó acceder sin ser admin`
    );
    return res
      .status(403)
      .json({ error: "Acceso denegado: se requiere rol admin" });
  }

  next();
};
