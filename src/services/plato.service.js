const platoRepo = require("../repositories/plato.repository");
const Resena = require("../models/resenia.model");

const crearPlato = async (datos) => {
  return await platoRepo.crearPlato(datos);
};

const obtenerTodos = async () => {
  return await platoRepo.obtenerTodos();
};

const obtenerActivos = async () => {
  const platos = await platoRepo.obtenerPlatosActivos();

  const platosConPromedio = await Promise.all(
    platos.map(async (plato) => {
      const resenias = await Resena.find({ platoId: plato._id, activo: true });

      const promedio =
        resenias.length > 0
          ? resenias.reduce((sum, r) => sum + r.valoracion, 0) / resenias.length
          : null;

      return {
        ...plato.toObject(),
        promedioValoracion: promedio,
      };
    })
  );

  return platosConPromedio;
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
