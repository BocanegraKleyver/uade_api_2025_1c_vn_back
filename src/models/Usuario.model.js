const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El email es obligatorio"],
      match: [/.+\@.+\..+/, "Email inválido"],
    },
    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: 6,
    },
    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
    activo: {
      type: Boolean,
      default: true,
    },
    permisos: {
      puedeEditarPlatos: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hashear la contraseña antes de guardar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
