const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");
const verificarPermisoEdicion = require("../middlewares/verificarPermisoEdicion");
const platoController = require("../controllers/plato.controller");

// Obtener platos (acceso público)
router.get("/platos", platoController.obtenerPlatos);
router.get("/platos/:id", platoController.obtenerPlatoPorId);

// Crear, editar y eliminar platos (solo admin o usuario con puedeEditar)
router.post(
  "/platos",
  verificarToken,
  verificarPermisoEdicion,
  platoController.crearPlato
);
router.put(
  "/platos/:id",
  verificarToken,
  verificarPermisoEdicion,
  platoController.actualizarPlato
);
router.delete(
  "/platos/:id",
  verificarToken,
  verificarPermisoEdicion,
  platoController.eliminarPlato
);

module.exports = router;
