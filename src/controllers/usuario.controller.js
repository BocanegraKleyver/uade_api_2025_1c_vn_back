const usuarioService = require("../services/usuario.service");
const jwt = require("../utils/jwt");
const logger = require("../utils/logger");

// Registrar usuario nuevo
const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);

    await logger.log({
      usuario: nuevoUsuario,
      accion: "Registro de usuario",
      detalle: `Se registró ${nuevoUsuario.email}`,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await usuarioService.login(email, contraseña);

    const token = jwt.generarToken(usuario);

    await logger.log({
      usuario,
      accion: "Login",
      detalle: `Login de ${usuario.email}`,
    });

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Obtener todos los usuarios
const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodoslosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuarios activos
const obtenerActivos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuariosActivos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuarios inactivos
const obtenerInactivos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuariosInactivos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
const obtenerPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiar contraseña
const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaContraseña } = req.body;

    if (!nuevaContraseña || nuevaContraseña.length < 6) {
      return res.status(400).json({ error: "Contraseña inválida" });
    }

    const actualizado = await usuarioService.cambiarContraseña(
      id,
      nuevaContraseña
    );

    await logger.log({
      usuario: req.usuario,
      accion: "Cambio de contraseña",
      detalle: `Cambio de contraseña para ${actualizado.email}`,
    });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiar rol
const actualizarRol = async (req, res) => {
  try {
    const actualizado = await usuarioService.cambiarRol(
      req.usuario, // actor que hace la petición
      req.params.id, // usuario destino (target)
      req.body.rol // nuevo rol solicitado
    );

    await logger.log({
      usuario: req.usuario,
      accion: "Cambio de rol",
      detalle: `Cambió el rol de ${actualizado.email} a ${req.body.rol}`,
    });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiar permisos
const actualizarPermisos = async (req, res) => {
  try {
    const actualizado = await usuarioService.cambiarPermisos(
      req.params.id,
      req.body.permisos
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Baja lógica
const desactivar = async (req, res) => {
  try {
    const usuario = await usuarioService.desactivarUsuario(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reactivar
const activar = async (req, res) => {
  try {
    const usuario = await usuarioService.activarUsuario(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Baja física
const eliminar = async (req, res) => {
  try {
    const eliminado = await usuarioService.eliminarUsuario(req.params.id);
    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerTodos,
  obtenerActivos,
  obtenerInactivos,
  obtenerPorId,
  cambiarContraseña,
  actualizarRol,
  actualizarPermisos,
  desactivar,
  activar,
  eliminar,
};
