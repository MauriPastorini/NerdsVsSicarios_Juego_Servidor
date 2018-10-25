const express = require('express');
const router = express.Router();

const healthCheckRoutes = require('./health');
const usuariosRoutes = require('./v1/usuarios');

router.use('/health', healthCheckRoutes);

router.use('/usuario', usuariosRoutes);

module.exports = router;
