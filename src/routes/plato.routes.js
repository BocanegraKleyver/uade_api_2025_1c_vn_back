const express = require("express");
const router = express.Router();

const platoController = require("../controllers/plato.controller");

router.post("/platos", platoController.crearPlato);

router.get("/platos", platoController.obtenerPlatos);

router.get("/platos/:id", platoController.obtenerPlatoPorId);

router.put("/platos/:id", platoController.actualizarPlato);

router.delete("/platos/:id", platoController.eliminarPlato);

module.exports = router;
