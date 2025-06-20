const express = require("express");
const router = express.Router();

const platoController = require("../controllers/plato.controller");

// Crear un nuevo plato
router.post("/platos", platoController.crearPlato);

// Obtener todos los platos
router.get("/platos", platoController.obtenerPlatos);

// Obtener un plato por ID
router.get("/platos/:id", platoController.obtenerPlatoPorId);

// Actualizar un plato
router.put("/platos/:id", platoController.actualizarPlato);

// Eliminar un plato
router.delete("/platos/:id", platoController.eliminarPlato);

module.exports = router;
