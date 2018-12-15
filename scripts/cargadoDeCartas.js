require('dotenv').config()

var cartas = [
  {
    tipo: "nerd-weabooLord",
    nombre: "dakimakura",
    nombre_completo: "Dakimakura",
    danio: 20,
    costo_para_desbloquear: 0,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "mochila_pegajosa",
    nombre_completo: "Mochila pegajosa",
    danio: 20,
    costo_para_desbloquear: 0,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "catapulta",
    nombre_completo: "Catapulta",
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_base",
    nombre_completo: "Jugador de Football Base",
    danio: 20,
    costo_para_desbloquear: 0,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_medio",
    nombre_completo: "Jugador de Football Medio",
    danio: 20,
    costo_para_desbloquear: 0,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_estrella",
    nombre_completo: "Jugador de Football Estrella",
    danio: 20,
    costo_para_desbloquear: 0,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_base",
    nombre_completo: "Bailarín Base",
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_medio",
    nombre_completo: "Bailarín Medio",
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_estrella",
    nombre_completo: "Bailarín Estrella",
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_base",
    nombre_completo: "Punk Girl Base",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_media",
    nombre_completo: "Punk Girl Media",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_estrella",
    nombre_completo: "Punk Girl Estrella",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "Drone_2_Idle",
    nombre_completo: "Drone 2.0 Idle",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "drone_idle",
    nombre_completo: "Drone Idle",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_cierra",
    nombre_completo: "Mochila cierra",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_honda",
    nombre_completo: "Mochila Honda",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_mina",
    nombre_completo: "Mochila Mina",
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
];
const dbConfig = require("../config/database");

const CartaTipo = require("../modelos/cartaTipo");
const mongoose = require("mongoose");

(async () => {
  console.log("CONECT", dbConfig.connection_string);
  mongoose
    .connect(
      dbConfig.connection_string,
      { useNewUrlParser: true }
    )
    .then(async () => {
      console.log("Conectado con mongodb");
      try {
        await CartaTipo.deleteMany();
        var response = await CartaTipo.insertMany(cartas);
        console.log("Exito insertando: ", response);
        mongoose.disconnect();
      } catch (err) {
        console.log("Error insertando cartas: ", err);
      }
    })
    .catch(err => {
      console.log("ERROR: No se pudo conectar con mongo: ", err);
    });
})();
