const platoRepo = require("../repositories/plato.repository");

const crearPlato = async (datos) => {
  // Acá podrías validar, transformar, etc.
  return await platoRepo.crearPlato(datos);
};

const obtenerPlatos = async () => {
  return await platoRepo.obtenerPlatos();
};

const obtenerPlatoPorId = async (id) => {
  return await platoRepo.obtenerPlatoPorId(id);
};

const actualizarPlato = async (id, datos) => {
  return await platoRepo.actualizarPlato(id, datos);
};

const eliminarPlato = async (id) => {
  return await platoRepo.eliminarPlato(id);
};

module.exports = {
  crearPlato,
  obtenerPlatos,
  obtenerPlatoPorId,
  actualizarPlato,
  eliminarPlato,
};
