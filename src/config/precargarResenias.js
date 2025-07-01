const Resenia = require("../models/resenia.model");
const Plato = require("../models/plato.model");
const logger = require("../utils/logger");

const reseñasFicticias = [
  {
    platoNombre: "Empanadas Salteñas",
    nombre: "Lucía Gómez",
    comentario: "¡Las mejores empanadas que probé en años!",
    valoracion: 5,
  },
  {
    platoNombre: "Provoleta",
    nombre: "Martín Rivas",
    comentario: "Buena, aunque me gustaría más crocante.",
    valoracion: 4,
  },
  {
    platoNombre: "Bife de Chorizo",
    nombre: "Sofía Ledesma",
    comentario: "Cocción perfecta y porción abundante.",
    valoracion: 5,
  },
  {
    platoNombre: "Trucha Patagónica",
    nombre: "Andrés Molina",
    comentario: "Un poco seca, pero buen sabor.",
    valoracion: 3,
  },
];

const precargarResenias = async () => {
  try {
    const cantidad = await Resenia.countDocuments();
    if (cantidad > 0) {
      console.log("📦 Reseñas ya cargadas, omitiendo precarga.");
      return;
    }

    const insertables = [];

    for (const r of reseñasFicticias) {
      const plato = await Plato.findOne({ nombre: r.platoNombre });

      if (!plato) {
        console.warn(`❌ Plato no encontrado: ${r.platoNombre}`);
        continue;
      }

      insertables.push({
        platoId: plato._id,
        platoNombre: plato.nombre,
        nombre: r.nombre,
        comentario: r.comentario,
        valoracion: r.valoracion,
        activo: true,
      });
    }

    await Resenia.insertMany(insertables);
    console.log(`✅ Precargadas ${insertables.length} reseñas`);

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
      accion: "Precarga de reseñas",
      detalle: `Se insertaron ${insertables.length} reseñas ficticias automáticamente.`,
    });
  } catch (error) {
    console.error("❌ Error al precargar reseñas:", error.message);
  }
};

module.exports = precargarResenias;
