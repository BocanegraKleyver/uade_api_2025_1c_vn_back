const usuarioRepo = require("../repositories/usuario.repository");
const logger = require("../utils/logger");

const crearAdminSiNoExiste = async () => {
  const adminEmail = "admin@saboresurbanos.com";

  const existente = await usuarioRepo.buscarPorEmail(adminEmail);
  if (existente) {
    console.log("🟢 Admin ya existente");
    return;
  }

  const nuevoAdmin = {
    nombre: "Admin",
    email: adminEmail,
    contraseña: "admin123",
    rol: "admin",
    activo: true,
    permisos: {
      puedeEditarPlatos: true,
      puedeGestionarUsuarios: true,
    },
  };

  const creado = await usuarioRepo.crearUsuario(nuevoAdmin);

  // ✅ Guardar en log
  await logger.log({
    usuario: { nombre: "Sistema", email: "sistema@saboresurbanos.com" },
    accion: "Crear usuario admin por defecto",
    detalle: "El sistema creó el usuario administrador por primera vez",
  });

  console.log("✅ Admin creado por defecto con permisos completos");
};

module.exports = crearAdminSiNoExiste;
