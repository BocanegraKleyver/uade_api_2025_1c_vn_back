const Log = require("../models/Log.model");

const log = async ({ usuario, accion, detalle = "" }) => {
  try {
    if (!usuario || !usuario.email) {
      throw new Error("Usuario inválido al registrar log");
    }

    const nuevoLog = new Log({
      usuario: {
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
      },
      accion,
      detalle,
    });

    await nuevoLog.save();
    console.log(`📝 Log registrado: ${accion} - ${usuario.email}`);
  } catch (error) {
    console.error("❌ Error al registrar log:", error.message);
  }
};

module.exports = { log };
