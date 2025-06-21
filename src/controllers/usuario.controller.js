const usuarioService = require("../services/usuario.service");
const jwt = require("../utils/jwt");
const logger = require("../utils/logger");

const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);

    // intentamos registrar el log, pero si falla, no rompe la app
    try {
      await logger.log({
        usuario: nuevoUsuario,
        accion: "Registro de nuevo usuario",
        detalle: `El usuario ${nuevoUsuario.email} se registró`,
      });
    } catch (logError) {
      console.warn("⚠️ No se pudo registrar el log:", logError.message);
    }

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await usuarioService.login(email, contraseña);
    const token = jwt.generarToken(usuario);

    // Log
    try {
      await logger.log({
        usuario,
        accion: "Login exitoso",
        detalle: `El usuario ${usuario.email} inició sesión`,
      });
    } catch (logError) {
      console.warn("⚠️ No se pudo registrar el log:", logError.message);
    }

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!["admin", "usuario"].includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const actualizado = await usuarioService.cambiarRol(id, rol);

    // Log
    try {
      await logger.log({
        usuario: req.usuario,
        accion: "Cambio de rol",
        detalle: `Cambió el rol del usuario ${actualizado.email} a ${rol}`,
      });
    } catch (logError) {
      console.warn("⚠️ No se pudo registrar el log:", logError.message);
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarPermisos = async (req, res) => {
  try {
    const { id } = req.params;
    const { permisos } = req.body;

    if (typeof permisos !== "object" || permisos === null) {
      return res.status(400).json({ error: "Permisos inválidos" });
    }

    const actualizado = await usuarioService.cambiarPermisos(id, permisos);

    // Log
    try {
      await logger.log({
        usuario: req.usuario,
        accion: "Cambio de permisos",
        detalle: `Actualizó los permisos del usuario ${actualizado.email}`,
      });
    } catch (logError) {
      console.warn("⚠️ No se pudo registrar el log:", logError.message);
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const desactivar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.desactivarUsuario(id);

    // Log
    try {
      await logger.log({
        usuario: req.usuario,
        accion: "Desactivación de usuario",
        detalle: `Desactivó al usuario ${usuario.email}`,
      });
    } catch (logError) {
      console.warn("⚠️ No se pudo registrar el log:", logError.message);
    }

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerTodos,
  actualizarRol,
  actualizarPermisos,
  desactivar,
};
