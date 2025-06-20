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
    etiquetas: [String], // Ej: ["🌶️ Picante", "🥬 Vegano"]
    imagen: String, // nombre del archivo guardado (ej. 1721xxxxx.jpg)
  },
  {
    timestamps: true, // Mongo agrega createdAt y updatedAt
  }
);

module.exports = mongoose.model("Plato", PlatoSchema);
