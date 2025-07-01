const express = require("express");
const router = express.Router();

const reseniaController = require("../controllers/resenia.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarPermisoResenas = require("../middlewares/verificarPermisoResenas");

router.post("/", reseniaController.crear);

router.get("/plato/:platoId", reseniaController.obtenerPorPlato);

router.get(
  "/",
  verificarToken,
  verificarPermisoResenas,
  reseniaController.obtenerTodas
);

router.put(
  "/:id/responder",
  verificarToken,
  verificarPermisoResenas,
  reseniaController.responder
);

router.put(
  "/:id/ocultar",
  verificarToken,
  verificarPermisoResenas,
  reseniaController.ocultar
);

router.put(
  "/:id/mostrar",
  verificarToken,
  verificarPermisoResenas,
  reseniaController.mostrar
);

router.delete(
  "/:id/fisico",
  verificarToken,
  verificarPermisoResenas,
  reseniaController.eliminarFisicamente
);

module.exports = router;
