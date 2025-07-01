const usuarioService = require("../services/usuario.service");

module.exports = async function soloRootParaAdmins(req, res, next) {
  const actor = req.usuario;
  const targetId = req.params.id;

  try {
    const target = await usuarioService.obtenerPorId(targetId);
    if (!target)
      return res.status(404).json({ error: "Usuario no encontrado" });

    if (["admin", "root"].includes(target.rol) && actor.rol !== "root") {
      console.warn(
        `❌ ${actor.email} intentó modificar a ${target.email} con rol ${target.rol}`
      );
      return res.status(403).json({
        error: "Solo root puede modificar usuarios con rol admin o root",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
