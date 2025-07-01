const platoRepo = require("../repositories/plato.repository");

const crearPlato = async (datos) => {
  return await platoRepo.crearPlato(datos);
};

const obtenerTodos = async () => {
  return await platoRepo.obtenerTodos();
};

const obtenerActivos = async () => {
  return await platoRepo.obtenerPlatosActivos();
};

const obtenerInactivos = async () => {
  return await platoRepo.obtenerPlatosInactivos();
};

const obtenerPorId = async (id) => {
  const plato = await platoRepo.buscarPorId(id);
  if (!plato) throw new Error("Plato no encontrado");
  return plato;
};

const actualizarPlato = async (id, campos) => {
  const existe = await platoRepo.buscarPorId(id);
  if (!existe) throw new Error("Plato no encontrado");
  return await platoRepo.actualizarPlato(id, campos);
};

const desactivarPlato = async (id) => {
  const existe = await platoRepo.buscarPorId(id);
  if (!existe) throw new Error("Plato no encontrado");
  return await platoRepo.desactivarPlato(id);
};

const activarPlato = async (id) => {
  const existe = await platoRepo.buscarPorId(id);
  if (!existe) throw new Error("Plato no encontrado");
  return await platoRepo.activarPlato(id);
};

const eliminarPlato = async (id) => {
  const existe = await platoRepo.buscarPorId(id);
  if (!existe) throw new Error("Plato no encontrado");
  return await platoRepo.eliminarPlato(id);
};

module.exports = {
  crearPlato,
  obtenerTodos,
  obtenerActivos,
  obtenerInactivos,
  obtenerPorId,
  actualizarPlato,
  desactivarPlato,
  activarPlato,
  eliminarPlato,
};
