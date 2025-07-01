const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    usuario: {
      nombre: String,
      apellido: String,
      email: String,
      rol: String,
      permisos: {
        gestionarUsuarios: Boolean,
        gestionarPlatos: Boolean,
        gestionarLogs: Boolean,
        gestionarResenas: Boolean,
      },
    },
    accion: {
      type: String,
      required: true,
    },
    detalle: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);
