const Plato = require("../models/Plato.model");

const crearPlato = async (datosPlato) => {
  const nuevoPlato = new Plato(datosPlato);
  return await nuevoPlato.save();
};

const obtenerPlatos = async () => {
  return await Plato.find({ activo: true });
};

const obtenerPlatoPorId = async (id) => {
  return await Plato.findById(id);
};

const actualizarPlato = async (id, datosActualizados) => {
  return await Plato.findByIdAndUpdate(id, datosActualizados, { new: true });
};

// Borrado lógico
const eliminarPlato = async (id) => {
  return await Plato.findByIdAndUpdate(id, { activo: false }, { new: true });
};

module.exports = {
  crearPlato,
  obtenerPlatos,
  obtenerPlatoPorId,
  actualizarPlato,
  eliminarPlato,
};
