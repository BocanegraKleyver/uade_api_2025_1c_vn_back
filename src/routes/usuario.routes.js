// src/routes/usuario.routes.js
const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");
const verificarToken = require("../middlewares/auth.middleware");
const soloAdmin = require("../middlewares/soloAdmin");
const verificarPermisoPlatos = require("../middlewares/verificarPermisoEdicionPlatos");
const verificarPermisoLogs = require("../middlewares/verificarPermisoLogs");
const verificarPermisoResenas = require("../middlewares/verificarPermisoResenas");
const soloRootParaAdmins = require("../middlewares/soloRootParaAdmins");

// 🔐 Registro y login públicos
router.post("/usuarios", usuarioController.registrarUsuario);
router.post("/usuarios/login", usuarioController.loginUsuario);

// 🔍 Perfil del usuario logueado
router.get("/usuarios/perfil", verificarToken, usuarioController.obtenerPorId);

// 🔄 Cambio de contraseña (solo el usuario o admin; vos definís)
router.put(
  "/usuarios/:id/contraseña",
  verificarToken,
  soloAdmin,
  usuarioController.cambiarContraseña
);

// 🛠 Panel administrativo y gestión de usuarios — solo admins
router.get(
  "/usuarios/todos",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerTodos
);
router.get(
  "/usuarios/activos",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerActivos
);
router.get(
  "/usuarios/inactivos",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerInactivos
);
router.get(
  "/usuarios/:id",
  verificarToken,
  soloAdmin,
  usuarioController.obtenerPorId
);
router.put(
  "/usuarios/:id/rol",
  verificarToken,
  soloAdmin,
  soloRootParaAdmins,
  usuarioController.actualizarRol
);

router.put(
  "/usuarios/:id/permisos",
  verificarToken,
  soloAdmin,
  usuarioController.actualizarPermisos
);

// 🚫 Baja lógica / Re-activación (flag `activo`):
router.put(
  "/usuarios/:id/desactivar",
  verificarToken,
  soloAdmin,
  usuarioController.desactivar
);
router.put(
  "/usuarios/:id/reactivar",
  verificarToken,
  soloAdmin,
  usuarioController.activar
);

// 🗑 Baja física — eliminación definitiva
router.delete(
  "/usuarios/:id/fisico",
  verificarToken,
  soloAdmin,
  usuarioController.eliminar
);

// 🔑 Gestión de recursos protegidos: platos, logs, reseñas
router.use("/platos", verificarToken, verificarPermisoPlatos);
router.use("/logs", verificarToken, verificarPermisoLogs);
router.use("/resenas", verificarToken, verificarPermisoResenas);

module.exports = router;
