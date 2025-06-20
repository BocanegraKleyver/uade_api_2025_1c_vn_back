const mongoose = require("mongoose");

const PlatoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: String,
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    ingredientes: [String],
    alergenos: [String],
    etiquetas: [String],
    imagen: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plato", PlatoSchema);
