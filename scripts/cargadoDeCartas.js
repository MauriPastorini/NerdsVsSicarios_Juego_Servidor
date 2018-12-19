require('dotenv').config()

var cartas = [
  {
    tipo: "nerd-weabooLord",
    nombre: "dakimakura",
    nombre_completo: "Dakimakura",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "mochila_pegajosa",
    nombre_completo: "Mochila pegajosa",
    danio: 20,
    vida: 50,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "catapulta",
    nombre_completo: "Catapulta",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_base",
    nombre_completo: "Jugador de Football Base",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_medio",
    nombre_completo: "Jugador de Football Medio",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_estrella",
    nombre_completo: "Jugador de Football Estrella",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_base",
    nombre_completo: "Bailarín Base",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_medio",
    nombre_completo: "Bailarín Medio",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_estrella",
    nombre_completo: "Bailarín Estrella",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 5,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_base",
    nombre_completo: "Punk Girl Base",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_media",
    nombre_completo: "Punk Girl Media",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_estrella",
    nombre_completo: "Punk Girl Estrella",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "Drone_2_Idle",
    nombre_completo: "Drone 2.0 Idle",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "drone_idle",
    nombre_completo: "Drone Idle",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_cierra",
    nombre_completo: "Mochila cierra",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_honda",
    nombre_completo: "Mochila Honda",
    vida: 50,
    danio: 20,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_mina",
    nombre_completo: "Mochila Mina",
    vida: 50,
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
