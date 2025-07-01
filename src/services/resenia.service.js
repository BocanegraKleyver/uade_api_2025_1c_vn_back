const reseniaRepo = require("../repositories/resenia.repository");
const platoRepo = require("../repositories/plato.repository");

const crearResenia = async (datos) => {
  if (
    !datos.nombre ||
    !datos.comentario ||
    !datos.valoracion ||
    !datos.platoId
  ) {
    throw new Error("Faltan campos obligatorios");
  }

  const plato = await platoRepo.buscarPorId(datos.platoId);
  if (!plato) throw new Error("Plato no encontrado");

  const resenia = {
    ...datos,
    platoNombre: plato.nombre,
  };

  return await reseniaRepo.crearResenia(resenia);
};

const obtenerTodas = async () => {
  return await reseniaRepo.obtenerTodas();
};

const obtenerPorPlato = async (platoId) => {
  return await reseniaRepo.obtenerPorPlato(platoId);
};

const responderResenia = async (id, texto, adminNombre) => {
  if (!texto) throw new Error("Respuesta vacía");
  return await reseniaRepo.responderResenia(id, texto, adminNombre);
};

const ocultarResenia = async (id) => {
  return await reseniaRepo.ocultarResenia(id);
};

const mostrarResenia = async (id) => {
  return await reseniaRepo.mostrarResenia(id);
};

const eliminarFisicamente = async (id) => {
  return await reseniaRepo.eliminarFisicamente(id);
};

module.exports = {
  crearResenia,
  obtenerTodas,
  obtenerPorPlato,
  responderResenia,
  ocultarResenia,
  mostrarResenia,
  eliminarFisicamente,
};
