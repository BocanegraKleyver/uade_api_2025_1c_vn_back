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

// Listados
// 1. Todos los usuarios (activos e inactivos)
router.get(
  "/usuarios/todos",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerTodos
);

// 2. Solo los activos (opcional, si querés mantenerlo)
router.get(
  "/usuarios",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerTodos // función existente
);

// CRUD por ID y acciones individuales
router.get(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerPorId
);
router.put(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.actualizarRol
);
router.put(
  "/usuarios/:id/permisos",
  verificarToken,
  soloAdmin,
  usuarioController.actualizarPermisos
);
router.delete(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.desactivar
);

module.exports = router;
