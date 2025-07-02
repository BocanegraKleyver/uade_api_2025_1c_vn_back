const Log = require("../models/Log.model");

// Esta función da formato consistente al objeto usuario para el log
const formatearUsuarioParaLog = (usuario) => {
  if (!usuario || !usuario.email) {
    return {
      nombre: "WEB",
      apellido: "Usuario",
      email: "web@saboresurbanos.com",
      rol: "usuario",
      permisos: {
        gestionarUsuarios: false,
        gestionarPlatos: false,
        gestionarLogs: false,
        gestionarResenas: false,
      },
    };
  }

  return {
    nombre: usuario.nombre || "",
    apellido: usuario.apellido || "",
    email: usuario.email,
    rol: usuario.rol || "",
    permisos: usuario.permisos || {
      gestionarUsuarios: false,
      gestionarPlatos: false,
      gestionarLogs: false,
      gestionarResenas: false,
    },
  };
};

const log = async ({ usuario, accion, detalle = "" }) => {
  try {
    const usuarioFormateado = formatearUsuarioParaLog(usuario);

    const nuevoLog = new Log({
      usuario: usuarioFormateado,
      accion,
      detalle,
    });

    await nuevoLog.save();
    console.log(`📝 Log registrado: ${accion} - ${usuario.email}`);
  } catch (error) {
    console.error("❌ Error al registrar log:", error.message);
  }
};

// Exportamos ambas funciones
module.exports = {
  log,
  formatearUsuarioParaLog,
};
