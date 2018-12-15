const express = require('express');
const router = express.Router();

const usuariosControlador = require('./../../controllers/usuario')
const autenticacionControlador = require('../../controllers/autenticacion');

router.post('/', usuariosControlador.crearUsuario)
      .get('/:userId/carta', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.obtenerCartasDeJugador)
      .post('/auth', usuariosControlador.iniciarSesion)
      .post('/:userId/tipojugador', autenticacionControlador.verificarTokenEInsertarUsuario, usuariosControlador.setearNerdOSicario);


module.exports = router;
