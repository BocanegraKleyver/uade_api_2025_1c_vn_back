const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
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
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    rol: {
      type: String,
      enum: ["root", "admin", "usuario"],
      default: "usuario",
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    permisos: {
      gestionarUsuarios: { type: Boolean, default: false },
      gestionarPlatos: { type: Boolean, default: false },
      gestionarLogs: { type: Boolean, default: false },
      gestionarResenas: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
