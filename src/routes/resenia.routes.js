const express = require("express");
const router = express.Router();

const reseniaController = require("../controllers/resenia.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarPermisoResenas = require("../middlewares/verificarPermisoResenas");

router.get(
  "/plato/:platoId",
  (req, res, next) => {
    console.log("🟢 Entró a GET /plato/:platoId");
    next();
  },
  reseniaController.obtenerPorPlato
);

router.post(
  "/",
  (req, res, next) => {
    console.log("🟢 Entró a POST /");
    next();
  },
  reseniaController.crear
);

router.get(
  "/",
  verificarToken,
  verificarPermisoResenas,
  (req, res, next) => {
    console.log("🔒 Entró a GET / TODAS las reseñas");
    next();
  },
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
