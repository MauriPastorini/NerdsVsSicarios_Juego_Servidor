const express = require('express');
const router = express.Router();

const usuariosControlador = require('./../../controllers/usuario')
const autenticacionControlador = require('../../controllers/autenticacion');

router.post('/', usuariosControlador.crearUsuario)
      .get('/:userId', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.obtenerInformacionUsuario)
      .get('/:userId/carta', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.obtenerCartasDeJugador)
      .post('/auth', usuariosControlador.iniciarSesion)
      .post('/:userId/tipojugador', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.setearNerdOSicario)
      .post('/:userId/nivel', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.subirNivelUsuario)
      .post('/:userId/carta/:cartaId', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.subirNivelCartaDeUsuario)
      .post('/:userId/puntos', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.cambiarPuntos)
      .get('/cartasTipo', usuariosControlador.obtenerCartas);



module.exports = router;
