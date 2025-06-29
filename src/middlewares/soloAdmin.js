// /middlewares/soloAdmin.js
module.exports = function soloAdmin(req, res, next) {
  const u = req.usuario;
  if (!u || !u.activo) {
    console.warn("❌ Acceso denegado: usuario no autenticado o inactivo");
    return res
      .status(403)
      .json({ error: "Acceso denegado: usuario inactivo o no autenticado" });
  }

  if (u.rol !== "admin" && u.rol !== "root") {
    console.warn(`❌ Usuario ${u.email} intentó acceder sin ser admin/root`);
    return res
      .status(403)
      .json({ error: "Acceso denegado: se requiere rol admin o root" });
  }

  next();
};
