const usuarioRepo = require("../repositories/usuario.repository");
const logger = require("../utils/logger");

const crearAdminSiNoExiste = async () => {
  const adminEmail = "admin@saboresurbanos.com";

  const existente = await usuarioRepo.buscarPorEmail(adminEmail);
  if (existente) {
    console.log("🟢 Admin root ya existente");
    return;
  }

  const nuevoAdmin = {
    nombre: "Sabores",
    apellido: "Urbanos",
    email: adminEmail,
    contraseña: "admin123",
    rol: "root",
    isRoot: true,
    activo: true,
    permisos: {
      gestionarUsuarios: true,
      gestionarPlatos: true,
      gestionarLogs: true,
      gestionarResenas: true,
    },
  };

  const creado = await usuarioRepo.crearUsuario(nuevoAdmin);

  await logger.log({
    usuario: {
      nombre: "Sistema",
      apellido: "Automático",
      email: "sistema@saboresurbanos.com",
      rol: "root",
      permisos: {
        gestionarUsuarios: true,
        gestionarPlatos: true,
        gestionarLogs: true,
        gestionarResenas: true,
      },
    },
    accion: "Crear usuario root por defecto",
    detalle: "El sistema creó el usuario admin root por primera vez",
  });

  console.log("✅ Admin root creado con permisos completos");
};

module.exports = crearAdminSiNoExiste;
