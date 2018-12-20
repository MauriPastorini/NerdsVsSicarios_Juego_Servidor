require('dotenv').config()

var cartas = [
  {
    tipo: "nerd-weabooLord",
    nombre: "dakimakura",
    nombre_completo: "Dakimakura",
    vida: 100,
    danio: 20,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "mochila_pegajosa",
    nombre_completo: "Mochila pegajosa",
    vida: 90,
    danio: 30,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "catapulta",
    nombre_completo: "Catapulta",
    vida: 80,
    danio: 50,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "Drone_3_Idle",
    nombre_completo: "Drone 3.0 Idle",
    vida: 50,
    danio: 35,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "Drone_2_Idle",
    nombre_completo: "Drone 2.0 Idle",
    vida: 95,
    danio: 30,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-it-guy",
    nombre: "drone_idle",
    nombre_completo: "Drone Idle",
    vida: 60,
    danio: 40,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_cierra",
    nombre_completo: "Mochila cierra",
    vida: 35,
    danio: 80,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_honda",
    nombre_completo: "Mochila Honda",
    vida: 25,
    danio: 90,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "nerd-punk-girl",
    nombre: "mochila_mina",
    nombre_completo: "Mochila Mina",
    vida: 1,
    danio: 100,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_base",
    nombre_completo: "Jugador de Football Base",
    vida: 120,
    danio: 20,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_medio",
    nombre_completo: "Jugador de Football Medio",
    vida: 150,
    danio: 35,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football_estrella",
    nombre_completo: "Jugador de Football Estrella",
    vida: 180,
    danio: 25,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_base",
    nombre_completo: "Bailarín Base",
    vida: 100,
    danio: 40,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_medio",
    nombre_completo: "Bailarín Medio",
    vida: 120,
    danio: 55,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-bailarin",
    nombre: "bailarin_estrella",
    nombre_completo: "Bailarín Estrella",
    vida: 140,
    danio: 65,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_base",
    nombre_completo: "Punk Girl Base",
    vida: 90,
    danio: 70,
    costo_para_desbloquear: 1,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_media",
    nombre_completo: "Punk Girl Media",
    vida: 95,
    danio: 80,
    costo_para_desbloquear: 2,
    velocidad: 10,
    limite_nivel: 5
  },
  {
    tipo: "sicario-punk-girl",
    nombre: "punk_girl_estrella",
    nombre_completo: "Punk Girl Estrella",
    vida: 100,
    danio: 100,
    costo_para_desbloquear: 3,
    velocidad: 10,
    limite_nivel: 5
  }
];
const dbConfig = require("../config/database");

const CartaTipo = require("../modelos/cartaTipo");
const mongoose = require("mongoose");

(async () => {
  console.log("CONECT", dbConfig.connection_string);
  mongoose
    .connect(
      dbConfig.connection_string,
      {
        useNewUrlParser: true,
        auth: {
          authdb: process.env.DB_NAME,
          user: process.env.USERNAME_DB,
          password: process.env.PASS_DB
        }
      }
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
