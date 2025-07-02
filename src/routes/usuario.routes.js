const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");
const verificarToken = require("../middlewares/auth.middleware");
const soloAdmin = require("../middlewares/soloAdmin");
const soloRootParaAdmins = require("../middlewares/soloRootParaAdmins");

router.post("/usuarios", usuarioController.registrarUsuario);
router.post("/usuarios/login", usuarioController.loginUsuario);

router.post(
  "/usuarios/logout",
  verificarToken,
  usuarioController.logoutUsuario
);

router.get("/usuarios/perfil", verificarToken, usuarioController.obtenerPorId);

router.put(
  "/usuarios/:id/contraseña",
  verificarToken,
  soloAdmin,
  usuarioController.cambiarContraseña
);

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

router.delete(
  "/usuarios/:id/fisico",
  verificarToken,
  soloAdmin,
  usuarioController.eliminar
);

module.exports = router;
