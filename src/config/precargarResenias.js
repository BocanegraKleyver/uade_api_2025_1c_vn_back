const Resenia = require("../models/resenia.model");
const Plato = require("../models/plato.model");
const logger = require("../utils/logger");

const nombres = [
  "Lucía Gómez",
  "Martín Rivas",
  "Sofía Ledesma",
  "Andrés Molina",
  "Valentina Ruiz",
  "Julián Torres",
  "Camila Ferreyra",
  "Tomás Pérez",
  "Micaela Álvarez",
  "Ramiro Duarte",
];

const comentariosPositivos = [
  "¡Excelente sabor, volvería sin dudar!",
  "Porción abundante y sabrosa.",
  "La cocción fue perfecta. Muy recomendado.",
  "Uno de los mejores que probé.",
  "Gran presentación y sabor.",
];

const comentariosNegativos = [
  "No cumplió mis expectativas.",
  "Estaba un poco frío.",
  "La porción era pequeña.",
  "Muy salado para mi gusto.",
  "La textura no me convenció.",
];

const cantidadTotal = 100;

const obtenerComentarioAleatorio = () => {
  const esPositiva = Math.random() > 0.3; // 70% buenas, 30% críticas
  const comentarios = esPositiva ? comentariosPositivos : comentariosNegativos;
  const valoracion = esPositiva
    ? Math.floor(Math.random() * 2) + 4
    : Math.floor(Math.random() * 3) + 1;
  return {
    texto: comentarios[Math.floor(Math.random() * comentarios.length)],
    valoracion,
  };
};

const precargarResenias = async () => {
  try {
    const cantidad = await Resenia.countDocuments();
    if (cantidad > 0) {
      console.log("📦 Reseñas ya cargadas, omitiendo precarga.");
      return;
    }

    const platos = await Plato.find();
    if (platos.length === 0) {
      console.warn("❌ No hay platos cargados en la base.");
      return;
    }

    const insertables = [];

    for (let i = 0; i < cantidadTotal; i++) {
      const plato = platos[Math.floor(Math.random() * platos.length)];
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const { texto, valoracion } = obtenerComentarioAleatorio();

      insertables.push({
        platoId: plato._id,
        platoNombre: plato.nombre,
        nombre,
        comentario: texto,
        valoracion,
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
