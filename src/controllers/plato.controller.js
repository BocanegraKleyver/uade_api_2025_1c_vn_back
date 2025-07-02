const platoService = require("../services/plato.service");
const logger = require("../utils/logger");
const { formatearUsuarioParaLog } = require("../utils/logger");
const fs = require("fs");
const path = require("path");

const crearPlato = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      ingredientes,
      alergenos,
      etiquetas,
      activo,
    } = req.body;

    const nuevoPlatoData = {
      nombre: nombre?.trim(),
      descripcion: descripcion?.trim(),
      precio: parseFloat(precio),
      categoria,
      ingredientes: ingredientes
        ? ingredientes.split(",").map((i) => i.trim())
        : [],
      alergenos: alergenos ? alergenos.split(",").map((a) => a.trim()) : [],
      etiquetas: etiquetas ? etiquetas.split(",").map((e) => e.trim()) : [],
      imagen: req.file?.filename || "",
      activo: activo === "false" ? false : true,
    };

    const nuevoPlato = await platoService.crearPlato(nuevoPlatoData);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Crear plato",
      detalle: `Plato creado: ${nuevoPlato.nombre}`,
    });

    res.status(201).json(nuevoPlato);
  } catch (error) {
    console.error("Error en crearPlato:", error);
    res.status(400).json({ error: error.message });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const platos = await platoService.obtenerTodos();
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerActivos = async (req, res) => {
  try {
    const platos = await platoService.obtenerActivos();
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerInactivos = async (req, res) => {
  try {
    const platos = await platoService.obtenerInactivos();
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const plato = await platoService.obtenerPorId(req.params.id);
    res.json(plato);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarPlato = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      ingredientes,
      alergenos,
      etiquetas,
      activo,
    } = req.body;

    const datosActualizados = {
      nombre: nombre?.trim(),
      descripcion: descripcion?.trim(),
      precio: parseFloat(precio),
      categoria,
      ingredientes: ingredientes
        ? ingredientes.split(",").map((i) => i.trim())
        : [],
      alergenos: alergenos ? alergenos.split(",").map((a) => a.trim()) : [],
      etiquetas: etiquetas ? etiquetas.split(",").map((e) => e.trim()) : [],
      activo: activo === "false" ? false : true,
    };

    if (req.file?.filename) {
      const platoExistente = await platoService.obtenerPorId(req.params.id);

      if (platoExistente?.imagen) {
        const rutaAnterior = path.join(
          __dirname,
          "../../uploads",
          platoExistente.imagen
        );
        fs.unlink(rutaAnterior, (err) => {
          if (err) {
            console.warn(
              "⚠️ No se pudo eliminar la imagen anterior:",
              err.message
            );
          } else {
            console.log("🗑️ Imagen anterior eliminada:", platoExistente.imagen);
          }
        });
      }

      datosActualizados.imagen = req.file.filename;
    }

    const actualizado = await platoService.actualizarPlato(
      req.params.id,
      datosActualizados
    );

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Editar plato",
      detalle: `Editó el plato: ${actualizado.nombre}`,
    });

    res.json(actualizado);
  } catch (error) {
    console.error("Error en actualizarPlato:", error);
    res.status(400).json({ error: error.message });
  }
};

const obtenerPorIdPublico = async (req, res) => {
  try {
    const plato = await platoService.obtenerPorId(req.params.id);

    if (!plato || !plato.activo) {
      return res
        .status(404)
        .json({ error: "Plato no disponible públicamente" });
    }

    res.json(plato);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const desactivar = async (req, res) => {
  try {
    const plato = await platoService.desactivarPlato(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Desactivar plato",
      detalle: `Desactivó el plato: ${plato.nombre}`,
    });

    res.json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const activar = async (req, res) => {
  try {
    const plato = await platoService.activarPlato(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Reactivar plato",
      detalle: `Reactivó el plato: ${plato.nombre}`,
    });

    res.json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const platoExistente = await platoService.obtenerPorId(req.params.id);

    if (!platoExistente) {
      return res.status(404).json({ error: "Plato no encontrado" });
    }

    if (platoExistente.imagen) {
      const rutaImagen = path.join(
        __dirname,
        "../../uploads",
        platoExistente.imagen
      );
      fs.unlink(rutaImagen, (err) => {
        if (err) {
          console.warn("⚠️ No se pudo eliminar la imagen:", err.message);
        } else {
          console.log("🗑️ Imagen eliminada:", platoExistente.imagen);
        }
      });
    }

    const eliminado = await platoService.eliminarPlato(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Eliminar plato",
      detalle: `Eliminó el plato: ${eliminado.nombre}`,
    });

    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearPlato,
  obtenerTodos,
  obtenerActivos,
  obtenerInactivos,
  obtenerPorIdPublico,
  obtenerPorId,
  actualizarPlato,
  desactivar,
  activar,
  eliminar,
};
