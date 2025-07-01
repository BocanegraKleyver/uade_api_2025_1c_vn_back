const mongoose = require("mongoose");

const ReseniaSchema = new mongoose.Schema(
  {
    platoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plato",
      required: [true, "El ID del plato es obligatorio"],
    },
    platoNombre: {
      type: String,
      required: [true, "El nombre del plato es obligatorio"],
      trim: true,
    },
    nombre: {
      type: String,
      required: [true, "El nombre del cliente es obligatorio"],
      trim: true,
    },
    comentario: {
      type: String,
      required: [true, "El comentario no puede estar vacío"],
      trim: true,
    },
    valoracion: {
      type: Number,
      required: true,
      min: [1, "La valoración mínima es 1"],
      max: [5, "La valoración máxima es 5"],
    },
    activo: {
      type: Boolean,
      default: true,
    },
    respuesta: {
      texto: { type: String, default: "" },
      respondidoPor: { type: String, default: "" },
      fecha: { type: Date },
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resenia", ReseniaSchema);
