const express = require("express");
const router = express.Router();

const platoController = require("../controllers/plato.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarPermisoPlatos = require("../middlewares/verificarPermisoEdicionPlatos");
const upload = require("../middlewares/multer.middleware");

router.post(
  "/platos",
  verificarToken,
  verificarPermisoPlatos,
  upload.single("imagen"),
  platoController.crearPlato
);

router.get(
  "/platos/todos",
  verificarToken,
  verificarPermisoPlatos,
  platoController.obtenerTodos
);

router.get("/platos", platoController.obtenerActivos);

router.get(
  "/platos/inactivos",
  verificarToken,
  verificarPermisoPlatos,
  platoController.obtenerInactivos
);

router.get("/platos/:id/publico", platoController.obtenerPorIdPublico);

router.get(
  "/platos/:id",
  verificarToken,
  verificarPermisoPlatos,
  platoController.obtenerPorId
);

router.put(
  "/platos/:id",
  verificarToken,
  verificarPermisoPlatos,
  upload.single("imagen"),
  platoController.actualizarPlato
);

router.put(
  "/platos/:id/desactivar",
  verificarToken,
  verificarPermisoPlatos,
  platoController.desactivar
);

router.put(
  "/platos/:id/reactivar",
  verificarToken,
  verificarPermisoPlatos,
  platoController.activar
);

router.delete(
  "/platos/:id/fisico",
  verificarToken,
  verificarPermisoPlatos,
  platoController.eliminar
);

module.exports = router;
