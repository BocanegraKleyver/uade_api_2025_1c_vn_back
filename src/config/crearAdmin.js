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
    apellido: "Urbanos", // 💡 Apellido obligatorio
    email: adminEmail,
    contraseña: "admin123", // Podrías pedir cambiar luego
    rol: "root",
    isRoot: true, // Marca como admin root
    activo: true,
    permisos: {
      gestionarUsuarios: true,
      gestionarPlatos: true,
      gestionarLog: true,
      gestionarResenas: true, // Agregamos todas las banderas nuevas
    },
  };

  const creado = await usuarioRepo.crearUsuario(nuevoAdmin);

  // ✅ Guardar en log
  await logger.log({
    usuario: { nombre: "Sistema", email: "sistema@saboresurbanos.com" },
    accion: "Crear usuario root por defecto",
    detalle: "El sistema creó el usuario admin root por primera vez",
  });

  console.log("✅ Admin root creado con permisos completos");
};

module.exports = crearAdminSiNoExiste;
