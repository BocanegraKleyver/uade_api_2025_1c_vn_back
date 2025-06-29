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

// Buscar usuario por ID
const buscarPorId = async (id) => {
  return await Usuario.findById(id);
};

// Obtener solo usuarios activos
const obtenerUsuariosActivos = async () => {
  return await Usuario.find({ activo: true }).select("-contraseña");
};

// Obtener solo usuarios inactivos
const obtenerUsuariosInactivos = async () => {
  return await Usuario.find({ activo: false }).select("-contraseña");
};

// Obtener todos los usuarios (activos e inactivos)
const obtenerTodosUsuarios = async () => {
  return await Usuario.find().select("-contraseña");
};

// Actualizar campos de usuario (rol, permisos, nombre, apellido, etc.)
const actualizarUsuario = async (id, campos) => {
  return await Usuario.findByIdAndUpdate(id, campos, { new: true });
};

// Baja lógica: marcar activo = false
const desactivarUsuario = async (id) => {
  return await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true });
};

// Reactivar usuario: marcar activo = true
const activarUsuario = async (id) => {
  return await Usuario.findByIdAndUpdate(id, { activo: true }, { new: true });
};

// Baja física: eliminar usuario de la base de datos
const eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorId,
  obtenerUsuariosActivos,
  obtenerUsuariosInactivos,
  obtenerTodosUsuarios,
  actualizarUsuario,
  desactivarUsuario,
  activarUsuario,
  eliminarUsuario,
};
