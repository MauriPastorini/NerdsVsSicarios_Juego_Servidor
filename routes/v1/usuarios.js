const express = require('express');
const router = express.Router();

const usuariosControlador = require('./../../controllers/usuario')

router.post('/', usuariosControlador.crearUsuario)
      .get('/:id/carta', usuariosControlador.obtenerCartasDeJugador)
      .post('/auth', usuariosControlador.iniciarSesion);

module.exports = router;
