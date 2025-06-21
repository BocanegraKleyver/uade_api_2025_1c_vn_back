const Log = require("../models/Log.model");

const crearLog = async (datos) => {
  const nuevoLog = new Log(datos);
  return await nuevoLog.save();
};

const obtenerLogs = async () => {
  return await Log.find().sort({ timestamp: -1 }); // ordenado por fecha descendente
};

module.exports = {
  crearLog,
  obtenerLogs,
};
