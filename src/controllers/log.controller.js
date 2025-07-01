const logService = require("../services/log.service");

const obtenerLogs = async (req, res) => {
  try {
    const { email, accion, desde, hasta } = req.query;

    let logs;
    if (email || accion || (desde && hasta)) {
      logs = await logService.obtenerLogsFiltrados({
        email,
        accion,
        desde,
        hasta,
      });
    } else {
      logs = await logService.obtenerTodosLosLogs();
    }

    res.json(logs);
  } catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ error: "Error al obtener los registros de logs" });
  }
};

module.exports = {
  obtenerLogs,
};
