const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    usuario: {
      nombre: String,
      email: String,
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
