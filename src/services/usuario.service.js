// src/services/usuario.service.js
const bcrypt = require("bcryptjs");
const usuarioRepo = require("../repositories/usuario.repository");

// Crear usuario nuevo
const crearUsuario = async (datos) => {
  const existente = await usuarioRepo.buscarPorEmail(datos.email);
  if (existente) {
    throw new Error("El email ya está registrado");
  }
  return await usuarioRepo.crearUsuario(datos);
};

// Login
const login = async (email, contraseña) => {
  const user = await usuarioRepo.buscarPorEmail(email);
  if (!user) throw new Error("Credenciales inválidas");
  const match = await bcrypt.compare(contraseña, user.contraseña);
  if (!match) throw new Error("Credenciales inválidas");
  if (!user.activo) throw new Error("Tu cuenta está inactiva");

  return {
    _id: user._id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
    activo: user.activo,
    permisos: user.permisos,
    isRoot: user.isRoot || false,
  };
};

// Cambiar contraseña
const cambiarContraseña = async (id, nuevaContraseña) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(nuevaContraseña, salt);
  return await usuarioRepo.actualizarUsuario(id, { contraseña: hashed });
};

// Obtener solo usuarios activos
const obtenerUsuariosActivos = async () => {
  return await usuarioRepo.obtenerUsuariosActivos();
};

// Obtener usuarios inactivos
const obtenerUsuariosInactivos = async () => {
  return await usuarioRepo.obtenerUsuariosInactivos();
};

// Obtener todos los usuarios
const obtenerTodoslosUsuarios = async () => {
  return await usuarioRepo.obtenerTodosUsuarios();
};

// Obtener usuario por ID
const obtenerPorId = async (id) => {
  return await usuarioRepo.buscarPorId(id);
};

// Cambiar rol con validación basada en el actor
const cambiarRol = async (actor, targetId, nuevoRol) => {
  const target = await usuarioRepo.buscarPorId(targetId);
  if (!target) throw new Error("Usuario destino no encontrado");

  // Reglas
  if (actor.rol === "usuario") {
    throw new Error("No tenés permisos para cambiar roles");
  }

  // Prohibido tocar usuarios root
  if (target.rol === "root" || nuevoRol === "root") {
    throw new Error("No se puede asignar ni modificar rol root");
  }

  // Si sos admin, solo podés ascender usuarios a admin, pero no tocar otros admins
  if (actor.rol === "admin") {
    if (target.rol !== "usuario") {
      throw new Error("Los administradores solo pueden modificar usuarios");
    }
    if (nuevoRol !== "admin") {
      throw new Error("Solo podés ascender usuarios a admin");
    }
  }

  // Si sos root, podés modificar usuarios o admins, pero no dar/quitar rol root
  if (actor.rol === "root") {
    if (nuevoRol === "root") {
      throw new Error("No podés asignar el rol root");
    }
  }

  return await usuarioRepo.actualizarUsuario(targetId, { rol: nuevoRol });
};

// Cambiar permisos
const cambiarPermisos = async (id, nuevosPermisos) => {
  return await usuarioRepo.actualizarUsuario(id, { permisos: nuevosPermisos });
};

// Baja lógica (inactivar usuario)
const desactivarUsuario = async (id) => {
  return await usuarioRepo.desactivarUsuario(id);
};

// Reactivar usuario
const activarUsuario = async (id) => {
  return await usuarioRepo.activarUsuario(id);
};

// Baja física (eliminar usuario permanentemente)
const eliminarUsuario = async (id) => {
  return await usuarioRepo.eliminarUsuario(id);
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
};
