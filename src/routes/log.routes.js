const express = require("express");
const router = express.Router();

const logController = require("../controllers/log.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarPermisoLogs = require("../middlewares/verificarPermisoLogs");

router.get(
  "/logs",
  verificarToken,
  verificarPermisoLogs,
  logController.obtenerLogs
);

module.exports = router;
