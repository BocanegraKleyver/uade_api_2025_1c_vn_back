// /middlewares/verificarPermisoPlatos.js
module.exports = function verificarPermisoPlatos(req, res, next) {
  const u = req.usuario;
  if (u.rol === "root" || u.rol === "admin" || u.permisos?.gestionarPlatos) {
    return next();
  }

  console.warn(`❌ ${u.email} sin permiso para gestionar platos`);
  return res
    .status(403)
    .json({ error: "No tenés permiso para gestionar platos" });
};
