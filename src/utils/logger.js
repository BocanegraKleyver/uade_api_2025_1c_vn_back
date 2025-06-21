const Log = require("../models/Log.model");

const log = async ({ usuario, accion, detalle = "" }) => {
  try {
    const nuevoLog = new Log({
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
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
