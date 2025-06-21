const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");
const soloAdmin = require("../middlewares/roles.middleware");
const Log = require("../models/Log.model");

// GET /api/logs?usuario=nombre&accion=crear&desde=2025-06-20&hasta=2025-06-21
router.get("/logs", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { usuario, accion, desde, hasta } = req.query;

    const filtro = {};

    if (usuario) {
      filtro.$or = [
        { "usuario.nombre": new RegExp(usuario, "i") },
        { "usuario.email": new RegExp(usuario, "i") },
      ];
    }

    if (accion) {
      filtro.accion = accion;
    }

    if (desde || hasta) {
      filtro.createdAt = {};
      if (desde) filtro.createdAt.$gte = new Date(desde);
      if (hasta) filtro.createdAt.$lte = new Date(hasta);
    }

    const logs = await Log.find(filtro).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los logs" });
  }
});

module.exports = router;
