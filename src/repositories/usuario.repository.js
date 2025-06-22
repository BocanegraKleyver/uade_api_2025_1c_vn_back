const Usuario = require("../models/Usuario.model");

// Crear nuevo usuario
const crearUsuario = async (datos) => {
  const nuevoUsuario = new Usuario(datos);
  return await nuevoUsuario.save();
};

// Buscar usuario por email
const buscarPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

// Obtener usuario por ID
const buscarPorId = async (id) => {
  return await Usuario.findById(id);
};

// Obtener todos los usuarios activos
const obtenerUsuariosActivos = async () => {
  return await Usuario.find({ activo: true }).select("-contraseña");
};

// Actualizar el rol o permisos
const actualizarUsuario = async (id, campos) => {
  return await Usuario.findByIdAndUpdate(id, campos, { new: true });
};

// Baja lógica (desactivar usuario)
const desactivarUsuario = async (id) => {
  return await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true });
};

// Obtener todos (activos e inactivos)
const obtenerTodosUsuarios = async () => {
  return await Usuario.find().select("-contraseña");
};

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorId,
  obtenerUsuariosActivos,
  actualizarUsuario,
  desactivarUsuario,
  obtenerTodosUsuarios,
};
