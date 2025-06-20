const platoService = require("../services/plato.service");

const crearPlato = async (req, res) => {
  try {
    const nuevoPlato = await platoService.crearPlato(req.body);
    res.status(201).json(nuevoPlato);
  } catch (error) {
    console.error("Error al crear el plato:", error);
    res.status(500).json({ error: "Error al crear el plato" });
  }
};

const obtenerPlatos = async (req, res) => {
  try {
    const platos = await platoService.obtenerPlatos();
    res.json(platos);
  } catch (error) {
    console.error("Error al obtener platos:", error);
    res.status(500).json({ error: "Error al obtener platos" });
  }
};

const obtenerPlatoPorId = async (req, res) => {
  try {
    const plato = await platoService.obtenerPlatoPorId(req.params.id);
    if (!plato) return res.status(404).json({ error: "Plato no encontrado" });
    res.json(plato);
  } catch (error) {
    console.error("Error al buscar plato:", error);
    res.status(500).json({ error: "Error al buscar plato" });
  }
};

const actualizarPlato = async (req, res) => {
  try {
    const actualizado = await platoService.actualizarPlato(
      req.params.id,
      req.body
    );
    if (!actualizado)
      return res.status(404).json({ error: "Plato no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar plato:", error);
    res.status(500).json({ error: "Error al actualizar plato" });
  }
};

const eliminarPlato = async (req, res) => {
  try {
    const eliminado = await platoService.eliminarPlato(req.params.id);
    if (!eliminado)
      return res.status(404).json({ error: "Plato no encontrado" });
    res.json({ mensaje: "Plato eliminado" });
  } catch (error) {
    console.error("Error al eliminar plato:", error);
    res.status(500).json({ error: "Error al eliminar plato" });
  }
};

module.exports = {
  crearPlato,
  obtenerPlatos,
  obtenerPlatoPorId,
  actualizarPlato,
  eliminarPlato,
};
