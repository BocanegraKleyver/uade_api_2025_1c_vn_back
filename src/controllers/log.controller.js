const logService = require("../services/log.service");

const obtenerLogs = async (req, res) => {
  try {
    const logs = await logService.obtenerTodosLosLogs();
    res.json(logs);
  } catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ error: "Error al obtener logs" });
  }
};

module.exports = {
  obtenerLogs,
};
