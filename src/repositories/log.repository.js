const Log = require("../models/Log.model");

const crearLog = async (data) => {
  const nuevoLog = new Log(data);
  return await nuevoLog.save();
};

const obtenerTodos = async () => {
  return await Log.find().sort({ createdAt: -1 });
};

const filtrarPorEmail = async (email) => {
  return await Log.find({ "usuario.email": email }).sort({ createdAt: -1 });
};

const filtrarPorAccion = async (accion) => {
  return await Log.find({ accion }).sort({ createdAt: -1 });
};

const filtrarPorRangoFecha = async (desde, hasta) => {
  return await Log.find({
    createdAt: {
      $gte: new Date(desde),
      $lte: new Date(hasta),
    },
  }).sort({ createdAt: -1 });
};

const filtrarCombinado = async ({ email, accion, desde, hasta }) => {
  const filtro = {};
  if (email) filtro["usuario.email"] = email;
  if (accion) filtro["accion"] = accion;
  if (desde && hasta) {
    filtro["createdAt"] = {
      $gte: new Date(desde),
      $lte: new Date(hasta),
    };
  }
  return await Log.find(filtro).sort({ createdAt: -1 });
};

module.exports = {
  crearLog,
  obtenerTodos,
  filtrarPorEmail,
  filtrarPorAccion,
  filtrarPorRangoFecha,
  filtrarCombinado,
};
