const Plato = require("../models/plato.model");
const menuData = require("../data/menuData");
const logger = require("../utils/logger");

const precargarPlatos = async () => {
  try {
    const cantidad = await Plato.countDocuments();
    if (cantidad > 0) {
      console.log("📦 Platos ya cargados, omitiendo precarga.");
      return;
    }

    const platosAInsertar = [];

    menuData.forEach((categoria) => {
      categoria.platos.forEach((plato) => {
        platosAInsertar.push({
          ...plato,
          categoria: categoria.categoria,
        });
      });
    });

    await Plato.insertMany(platosAInsertar);
    console.log(`✅ Precarga de ${platosAInsertar.length} platos completada`);

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
      accion: "Precarga de platos",
      detalle: `Se insertaron ${platosAInsertar.length} platos automáticamente.`,
    });
  } catch (error) {
    console.error("❌ Error en precarga de platos:", error.message);
  }
};

module.exports = precargarPlatos;
