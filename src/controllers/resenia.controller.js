const reseniaService = require("../services/resenia.service");
const logger = require("../utils/logger");
const { formatearUsuarioParaLog } = require("../utils/logger");

const crear = async (req, res) => {
  try {
    const nueva = await reseniaService.crearResenia(req.body);

    const usuarioParaLog = req.usuario
      ? formatearUsuarioParaLog(req.usuario)
      : {
          nombre: "WEB",
          apellido: "Usuario",
          email: "web@saboresurbanos.com",
          rol: "usuario",
          permisos: {},
        };

    await logger.log({
      usuario: usuarioParaLog,
      accion: "Crear reseña",
      detalle: `Reseña creada para: ${nueva.platoNombre}`,
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(400).json({ error: error.message });
  }
};

const obtenerTodas = async (req, res) => {
  try {
    const todas = await reseniaService.obtenerTodas();
    res.json(todas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPorPlato = async (req, res) => {
  try {
    const { platoId } = req.params;
    const resenias = await reseniaService.obtenerPorPlato(platoId);
    res.json(resenias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const responder = async (req, res) => {
  try {
    const { texto } = req.body;
    const id = req.params.id;

    const adminNombre = `${req.usuario?.nombre || "Admin"} ${
      req.usuario?.apellido || ""
    }`.trim();

    const actualizada = await reseniaService.responderResenia(
      id,
      texto,
      adminNombre
    );

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Responder reseña",
      detalle: `Respondió a reseña de: ${actualizada.platoNombre}`,
    });

    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const ocultar = async (req, res) => {
  try {
    const id = req.params.id;
    const ocultada = await reseniaService.ocultarResenia(id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Ocultar reseña",
      detalle: `Ocultó reseña de: ${ocultada.platoNombre}`,
    });

    res.json(ocultada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const mostrar = async (req, res) => {
  try {
    const id = req.params.id;
    const visible = await reseniaService.mostrarResenia(id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Mostrar reseña",
      detalle: `Habilitó reseña de: ${visible.platoNombre}`,
    });

    res.json(visible);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarFisicamente = async (req, res) => {
  try {
    const eliminada = await reseniaService.eliminarFisicamente(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Eliminar reseña",
      detalle: `Eliminó reseña de: ${eliminada.platoNombre}`,
    });

    res.json(eliminada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorPlato,
  responder,
  ocultar,
  mostrar,
  eliminarFisicamente,
};
