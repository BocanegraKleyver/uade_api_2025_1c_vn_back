const bcrypt = require("bcryptjs");
const usuarioRepo = require("../repositories/usuario.repository");
const logger = require("../utils/logger");

const crearUsuario = async (datos) => {
  const existente = await usuarioRepo.buscarPorEmail(datos.email);
  if (existente) {
    throw new Error("El email ya está registrado");
  }
  return await usuarioRepo.crearUsuario(datos);
};

const login = async (email, contraseña) => {
  const user = await usuarioRepo.buscarPorEmail(email);
  if (!user) throw new Error("Credenciales inválidas");
  const match = await bcrypt.compare(contraseña, user.contraseña);
  if (!match) throw new Error("Credenciales inválidas");
  if (!user.activo) throw new Error("Tu cuenta está inactiva");

  return {
    _id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
    activo: user.activo,
    permisos: user.permisos,
    isRoot: user.isRoot || false,
  };
};

const cambiarContraseña = async (id, nuevaContraseña) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(nuevaContraseña, salt);
  return await usuarioRepo.actualizarUsuario(id, { contraseña: hashed });
};

const obtenerUsuariosActivos = async () => {
  return await usuarioRepo.obtenerUsuariosActivos();
};

const obtenerUsuariosInactivos = async () => {
  return await usuarioRepo.obtenerUsuariosInactivos();
};

const obtenerTodoslosUsuarios = async () => {
  return await usuarioRepo.obtenerTodosUsuarios();
};

const obtenerPorId = async (id) => {
  return await usuarioRepo.buscarPorId(id);
};

const cambiarRol = async (actor, targetId, nuevoRol) => {
  const target = await usuarioRepo.buscarPorId(targetId);
  if (!target) throw new Error("Usuario destino no encontrado");

  if (actor.rol === "usuario") {
    throw new Error("No tenés permisos para cambiar roles");
  }

  if (target.rol === "root" || nuevoRol === "root") {
    throw new Error("No se puede asignar ni modificar rol root");
  }

  if (actor.rol === "admin") {
    if (target.rol !== "usuario") {
      throw new Error("Los administradores solo pueden modificar usuarios");
    }
    if (nuevoRol !== "admin") {
      throw new Error("Solo podés ascender usuarios a admin");
    }
  }

  if (actor.rol === "root" && nuevoRol === "root") {
    throw new Error("No podés asignar el rol root");
  }

  return await usuarioRepo.actualizarUsuario(targetId, { rol: nuevoRol });
};

const cambiarPermisos = async (id, nuevosPermisos) => {
  return await usuarioRepo.actualizarUsuario(id, { permisos: nuevosPermisos });
};

const desactivarUsuario = async (id) => {
  return await usuarioRepo.desactivarUsuario(id);
};

const activarUsuario = async (id) => {
  return await usuarioRepo.activarUsuario(id);
};

const eliminarUsuario = async (id) => {
  return await usuarioRepo.eliminarUsuario(id);
};

const logoutUsuario = async (usuario) => {
  await logger.log({
    usuario: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
      permisos: usuario.permisos,
    },
    accion: "Logout",
    detalle: `El usuario cerró sesión: ${usuario.email}`,
  });
};

module.exports = {
  crearUsuario,
  login,
  cambiarContraseña,
  obtenerUsuariosActivos,
  obtenerUsuariosInactivos,
  obtenerTodoslosUsuarios,
  obtenerPorId,
  cambiarRol,
  cambiarPermisos,
  desactivarUsuario,
  activarUsuario,
  eliminarUsuario,
  logoutUsuario,
};
