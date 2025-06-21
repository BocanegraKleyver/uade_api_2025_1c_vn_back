const logRepo = require("../repositories/log.repository");

const obtenerTodosLosLogs = async () => {
  return await logRepo.obtenerLogs();
};

module.exports = {
  obtenerTodosLosLogs,
};
