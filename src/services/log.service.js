const logRepository = require("../repositories/log.repository");

const registrarLog = async (data) => {
  return await logRepository.crearLog(data);
};

const obtenerTodosLosLogs = async () => {
  return await logRepository.obtenerTodos();
};

const obtenerLogsPorEmail = async (email) => {
  return await logRepository.filtrarPorEmail(email);
};

const obtenerLogsPorAccion = async (accion) => {
  return await logRepository.filtrarPorAccion(accion);
};

const obtenerLogsPorRangoFechas = async (desde, hasta) => {
  return await logRepository.filtrarPorRangoFecha(desde, hasta);
};

const obtenerLogsFiltrados = async ({ email, accion, desde, hasta }) => {
  return await logRepository.filtrarCombinado({ email, accion, desde, hasta });
};

module.exports = {
  registrarLog,
  obtenerTodosLosLogs,
  obtenerLogsPorEmail,
  obtenerLogsPorAccion,
  obtenerLogsPorRangoFechas,
  obtenerLogsFiltrados,
};
