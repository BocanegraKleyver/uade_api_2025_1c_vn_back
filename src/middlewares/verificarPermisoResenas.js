module.exports = function verificarPermisoResenas(req, res, next) {
  const u = req.usuario;
  if (u.rol === "root" || u.rol === "admin" || u.permisos?.gestionarResenas) {
    return next();
  }

  console.warn(`❌ ${u.email} sin permiso para gestionar reseñas`);
  return res
    .status(403)
    .json({ error: "No tenés permiso para gestionar reseñas" });
};
