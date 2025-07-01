const Resenia = require("../models/resenia.model");

const crearResenia = async (datos) => {
  const nueva = new Resenia(datos);
  return await nueva.save();
};

const obtenerTodas = async () => {
  return await Resenia.find().sort({ createdAt: -1 });
};

const obtenerPorPlato = async (platoId) => {
  return await Resenia.find({ platoId, activo: true }).sort({ createdAt: -1 });
};

const responderResenia = async (id, texto, respondidoPor) => {
  return await Resenia.findByIdAndUpdate(
    id,
    {
      respuesta: {
        texto,
        respondidoPor,
        fecha: new Date(),
      },
    },
    { new: true }
  );
};

const ocultarResenia = async (id) => {
  return await Resenia.findByIdAndUpdate(id, { activo: false }, { new: true });
};

const mostrarResenia = async (id) => {
  return await Resenia.findByIdAndUpdate(id, { activo: true }, { new: true });
};

const eliminarFisicamente = async (id) => {
  return await Resenia.findByIdAndDelete(id);
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
