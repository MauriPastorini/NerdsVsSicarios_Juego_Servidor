var Usuario = require("./../modelos/usuario");
var jwt = require("jsonwebtoken");
var llaves = require("../config/llaves.json");
const CartaTipo = require("../modelos/cartaTipo");

exports.crearUsuario = (req, res) => {
  console.log("CREAR USUARIO: ", req.body);
  const usuario = new Usuario(req.body);
  usuario.save((err, data) => {
    if (err) {
      console.log(err);
      console.log("Error: ", err);
      if ((err.code != null) & (err.code == 11000)) {
        return res.status(400).json({ exito: false, msg: "Usuario ya existe" });
      } else {
        return res.status(500).json({ exito: false, msg: "Error de servidor" });
      }
    }
    return res.status(200).json({ exito: true });
  });
};

exports.setearNerdOSicario = async (req, res) => {
  var tipoDeUsuario = req.body.tipoDeUsuario;
  if (tipoDeUsuario == null) {
    return res
      .status(400)
      .jsonp({ exito: false, msg: "Falta tipo de usuario" });
  }
  try {
    var usuario = await Usuario.findById(req.usuario._id);
    console.log("Usuario: ", usuario);
    if (usuario.cartas != null && usuario.cartas.length != 0) {
      return res.status(400).jsonp({
        exito: false,
        msg: "Usuario ya seateado como nerd o sicario"
      });
    }
    var cartas = await CartaTipo.find({ nerdosicario: tipoDeUsuario });
    usuario.cartas = cartas;
    await usuario.save();
    return res.status(200).jsonp({ exito: true });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).jsonp({ exito: false });
  }
};

exports.iniciarSesion = async (req, res) => {
  Usuario.findOne({ nombreusuario: req.body.nombreusuario }, function(
    err,
    usuario
  ) {
    if (err) throw err;
    if (!usuario)
      return res.status(404).jsonp({ exit: false, msg: "Usuario no existe" });
    console.log(usuario);
    Usuario.compararContrasenia(
      req.body.contrasenia,
      usuario.contrasenia,
      function(err, esMatch) {
        if (err) {
          res.status(500).jsonp({ msg: "Error en servidor" });
        }
        if (!esMatch) {
          return res.status(400).jsonp({ msg: "Contrasenia incorrecta" });
        } else {
          var token = jwt.sign({ usuario }, llaves.secreto, {
            expiresIn: 86400
          });
          return res.status(200).send(token);
        }
      }
    );
  });
};

exports.obtenerCartasDeJugador = async (req, res) => {
  const usuario = req.usuario;
  var cartasJugador = usuario.cartas;
  console.log("Cartas jugador: ", cartasJugador);
  try {
    var ids = [];
    cartasJugador.forEach(element => {
      ids.push(element._id);
    });
    var cartasDB = await CartaTipo.find({ _id: { $nin: ids } });
    console.log("Cartas DB: ", cartasDB);
    usuario.cartas = [...cartasJugador, ...cartasDB];
    await usuario.save();
  } catch (err) {
    console.log("Error buscando cartas o guardando: ", err);
    return res.status(500).jsonp({ exito: false });
  }
  return res.status(200).jsonp({ exito: true, cartas: usuario.cartas });
};

exports.subirNivelUsuario = async (req, res) => {
  const usuario = req.usuario;
  usuario.nivel = usuario.nivel + 1;
  try {
    await usuario.save();
  } catch (err) {
    console.log("Error buscando cartas o guardando: ", err);
    return res.status(500).jsonp({ exito: false });
  }
  return res.status(200).jsonp({ exito: true, usuario });
};

exports.subirNivelCartaDeUsuario = async (req, res, next) => {
  const carta = req.params.cartaId;
  const usuario = req.usuario;
  if (carta == null) {
    return res.status(400).jsonp({
      success: false,
      msg: "Carta no enviada"
    });
  }

  var encontrada = false;
  for (let i = 0; i < usuario.cartas.length && !encontrada; i++) {
    const cartaI = usuario.cartas[i];
    if (cartaI._id === carta) {
      console.log("CARTA: ", cartaI);
      if (usuario.puntos - cartaI.costo_para_desbloquear >= 0) {
        if (cartaI.nivel + 1 <= cartaI.limite_nivel) {
          cartaI.nivel++;
          usuario.puntos -= cartaI.costo_para_desbloquear;
          cartaI.aprendida = true;
          try {
            await usuario.save();
          } catch (err) {
            console.log("Error en seridor: ", err);
            return next(err);
          }
          encontrada = true;
        } else {
          return res.status(400).jsonp({
            success: false,
            msg: "No se puede subir mas de nivel la carta"
          });
        }
      } else {
        return res.status(400).jsonp({
          success: false, 
          msg: "Insuficientes puntos para desbloquear"
        });
      }
    }
  }
  if (!encontrada) {
    return res.status(404).jsonp({
      success: false,
      msg: "Carta no encontrada"
    });
  }
  return res.status(200).jsonp({
    success: true,
    usuario
  });
};

exports.obtenerInformacionUsuario = async (req, res, next) => {
  return res.status(200).jsonp(req.usuario);
};

exports.cambiarPuntos = async (req, res, next) => {
  var puntos = req.body.puntos;
  if (puntos == null) {
    return res.status(400).jsonp({
      success: false,
      msg: "No se setearon los puntos"
    });
  }
  if (req.usuario.puntos + puntos >= 0) {
    req.usuario.puntos += puntos;
    try {
      await req.usuario.save();
    } catch (err) {
      console.log("Error guardando puntos en base de datos: ", err);
      return next(err);
    }
    res.status(200).jsonp({ usuario: req.usuario });
  } else {
    res.status(400).jsonp({
      success: false,
      msg: "Insuficientes puntos para el cambio"
    });
  }
};
