const bcrypt = require("bcryptjs");
const usuarioRepo = require("../repositories/usuario.repository");

const crearUsuario = async (datos) => {
  const existente = await usuarioRepo.buscarPorEmail(datos.email);
  if (existente) {
    throw new Error("El email ya está registrado");
  }
  return await usuarioRepo.crearUsuario(datos);
};

const login = async (email, contraseña) => {
  const usuario = await usuarioRepo.buscarPorEmail(email);
  if (!usuario) {
    throw new Error("Credenciales inválidas");
  }

  const match = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!match) {
    throw new Error("Credenciales inválidas");
  }

  return usuario;
};

const obtenerUsuarios = async () => {
  return await usuarioRepo.obtenerUsuariosActivos();
};

const cambiarRol = async (id, nuevoRol) => {
  return await usuarioRepo.actualizarUsuario(id, { rol: nuevoRol });
};

const cambiarPermisos = async (id, nuevosPermisos) => {
  return await usuarioRepo.actualizarUsuario(id, { permisos: nuevosPermisos });
};

const desactivarUsuario = async (id) => {
  return await usuarioRepo.desactivarUsuario(id);
};

module.exports = {
  crearUsuario,
  login,
  obtenerUsuarios,
  cambiarRol,
  cambiarPermisos,
  desactivarUsuario,
};
