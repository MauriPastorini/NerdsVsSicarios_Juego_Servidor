var cartas = [
  {
    tipo: "nerd-weabooLord",
    nombre: "dakimakura",
    danio: 20,
    costoParaDesbloquear: 0,
    velocidad: 10
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "mochila_pegajosa",
    danio: 20,
    costoParaDesbloquear: 0,
    velocidad: 10
  },
  {
    tipo: "nerd-weabooLord",
    nombre: "catapulta",
    danio: 20,
    costoParaDesbloquear: 5,
    velocidad: 10
  },
  {
    tipo: "sicario-jugadorfootball",
    nombre: "jugador_football",
    danio: 20,
    costoParaDesbloquear: 0,
    velocidad: 10
  },
  {
    tipo: "sicario-punk",
    nombre: "punk_girl",
    danio: 20,
    costoParaDesbloquear: 2,
    velocidad: 10
  },
  {
    tipo: "sicario-punk",
    nombre: "bailarin",
    danio: 20,
    costoParaDesbloquear: 5,
    velocidad: 10
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
      } catch (err) {
        console.log("Error insertando cartas: ", err);
      }
    })
    .catch(err => {
      console.log("ERROR: No se pudo conectar con mongo: ", err);
    });
})();
