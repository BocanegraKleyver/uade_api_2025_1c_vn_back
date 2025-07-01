const usuarioService = require("../services/usuario.service");
const jwt = require("../utils/jwt");
const logger = require("../utils/logger");

const formatearUsuarioParaLog = (usuario) => ({
  nombre: usuario.nombre,
  apellido: usuario.apellido,
  email: usuario.email,
  rol: usuario.rol,
  permisos: usuario.permisos,
});

const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);

    await logger.log({
      usuario: formatearUsuarioParaLog(nuevoUsuario),
      accion: "Registro de usuario",
      detalle: `Se registró ${nuevoUsuario.email}`,
    });

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

    await logger.log({
      usuario: formatearUsuarioParaLog(usuario),
      accion: "Login",
      detalle: `Login de ${usuario.email}`,
    });

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logoutUsuario = async (req, res) => {
  try {
    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Logout",
      detalle: `Logout de ${req.usuario.email}`,
    });

    res.json({ mensaje: "Sesión cerrada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodoslosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerActivos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuariosActivos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerInactivos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuariosInactivos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Cambio de contraseña",
      detalle: `Cambio de contraseña para ${actualizado.email}`,
    });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarRol = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const nuevoRol = req.body.rol;

    if (nuevoRol !== "admin" && nuevoRol !== "usuario") {
      return res.status(400).json({ error: "Rol inválido" });
    }

    usuario.rol = nuevoRol;

    if (nuevoRol === "admin") {
      usuario.permisos = {
        gestionarUsuarios: true,
        gestionarPlatos: true,
        gestionarLogs: true,
        gestionarResenas: true,
      };
    } else if (nuevoRol === "usuario") {
      const nuevosPermisos = {
        gestionarUsuarios: false,
        gestionarLogs: false,
        gestionarPlatos: usuario.permisos?.gestionarPlatos || false,
        gestionarResenas: usuario.permisos?.gestionarResenas || false,
      };

      if (!nuevosPermisos.gestionarPlatos && !nuevosPermisos.gestionarResenas) {
        return res.status(400).json({
          error:
            "Para el rol usuario, se debe mantener al menos un permiso: Platos o Reseñas.",
        });
      }

      usuario.permisos = nuevosPermisos;
    }

    await usuario.save();

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Cambio de rol",
      detalle: `Cambió el rol de ${usuario.email} a ${nuevoRol}`,
    });

    const tokenActualizado = jwt.generarToken(usuario);

    res.json({
      usuario,
      token: tokenActualizado,
      mensaje:
        "El usuario deberá volver a iniciar sesión para aplicar los nuevos permisos.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarPermisos = async (req, res) => {
  try {
    const actualizado = await usuarioService.cambiarPermisos(
      req.params.id,
      req.body.permisos
    );

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Cambio de permisos",
      detalle: `Actualizó permisos de ${actualizado.email}`,
    });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const desactivar = async (req, res) => {
  try {
    const usuario = await usuarioService.desactivarUsuario(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Desactivar usuario",
      detalle: `Desactivó a ${usuario.email}`,
    });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const activar = async (req, res) => {
  try {
    const usuario = await usuarioService.activarUsuario(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Reactivar usuario",
      detalle: `Reactivó a ${usuario.email}`,
    });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const eliminado = await usuarioService.eliminarUsuario(req.params.id);

    await logger.log({
      usuario: formatearUsuarioParaLog(req.usuario),
      accion: "Eliminar usuario",
      detalle: `Eliminó a ${eliminado.email}`,
    });

    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
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
