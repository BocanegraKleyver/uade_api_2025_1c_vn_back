const Usuario = require("../models/Usuario.model");

const crearUsuario = async (datos) => {
  const nuevoUsuario = new Usuario(datos);
  return await nuevoUsuario.save();
};

const buscarPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

const buscarPorId = async (id) => {
  return await Usuario.findById(id);
};

const obtenerUsuariosActivos = async () => {
  return await Usuario.find({ activo: true }).select("-contraseña");
};

const obtenerUsuariosInactivos = async () => {
  return await Usuario.find({ activo: false }).select("-contraseña");
};

const obtenerTodosUsuarios = async () => {
  return await Usuario.find().select("-contraseña");
};

const actualizarUsuario = async (id, campos) => {
  return await Usuario.findByIdAndUpdate(id, campos, { new: true });
};

const desactivarUsuario = async (id) => {
  return await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true });
};

const activarUsuario = async (id) => {
  return await Usuario.findByIdAndUpdate(id, { activo: true }, { new: true });
};

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
