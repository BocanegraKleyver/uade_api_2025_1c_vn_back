module.exports = function verificarPermisoEdicion(req, res, next) {
  const usuario = req.usuario;

  if (usuario.rol === "admin" || usuario.puedeEditar === true) {
    return next(); // Tiene permiso
  }

  console.warn(
    `❌ Usuario ${usuario.email} intentó modificar platos sin permiso`
  );
  return res
    .status(403)
    .json({ error: "No tenés permiso para modificar los platos." });
};
