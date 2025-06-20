const mongoose = require("mongoose");

const platoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    ingredientes: [{ type: String }],
    alergenos: [{ type: String }],
    etiquetas: [{ type: String }],
    precio: { type: Number, required: true },
    imagen: { type: String }, // Podés omitirlo si no lo usás
    categoria: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plato", platoSchema);
