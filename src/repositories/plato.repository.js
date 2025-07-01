const Plato = require("../models/plato.model");

const crearPlato = async (datos) => {
  const nuevoPlato = new Plato(datos);
  return await nuevoPlato.save();
};

const buscarPorId = async (id) => {
  return await Plato.findById(id);
};

const obtenerPlatosActivos = async () => {
  return await Plato.find({ activo: true }).sort({ categoria: 1, nombre: 1 });
};

const obtenerPlatosInactivos = async () => {
  return await Plato.find({ activo: false }).sort({ categoria: 1, nombre: 1 });
};

const obtenerTodos = async () => {
  return await Plato.find().sort({ categoria: 1, nombre: 1 });
};

const actualizarPlato = async (id, campos) => {
  return await Plato.findByIdAndUpdate(id, campos, { new: true });
};

const desactivarPlato = async (id) => {
  return await Plato.findByIdAndUpdate(id, { activo: false }, { new: true });
};

const activarPlato = async (id) => {
  return await Plato.findByIdAndUpdate(id, { activo: true }, { new: true });
};

const eliminarPlato = async (id) => {
  return await Plato.findByIdAndDelete(id);
};

module.exports = {
  crearPlato,
  buscarPorId,
  obtenerPlatosActivos,
  obtenerPlatosInactivos,
  obtenerTodos,
  actualizarPlato,
  desactivarPlato,
  activarPlato,
  eliminarPlato,
};
