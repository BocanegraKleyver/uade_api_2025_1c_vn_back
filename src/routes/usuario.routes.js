const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const verificarToken = require("../middlewares/auth.middleware");
const soloAdmin = require("../middlewares/roles.middleware");

// Registro y Login
router.post("/usuarios", usuarioController.registrarUsuario);
router.post("/usuarios/login", usuarioController.loginUsuario);

// Perfil del usuario autenticado
router.get("/usuarios/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: `Hola ${req.usuario.email}, tu rol es ${req.usuario.rol}`,
  });
});

// Acceso solo para administradores
router.get("/usuarios/admin-panel", verificarToken, soloAdmin, (req, res) => {
  res.json({ mensaje: "Bienvenido al panel de administración" });
});

// Obtener todos los usuarios activos
router.get(
  "/usuarios",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerTodos
);

// Cambiar rol de usuario
router.put(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.actualizarRol
);

// Cambiar permisos (como puedeEditarPlatos)
router.put(
  "/usuarios/:id/permisos",
  verificarToken,
  soloAdmin,
  usuarioController.actualizarPermisos
);

// Baja lógica de usuario
router.delete(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.desactivar
);

router.get(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerPorId
);

module.exports = router;
