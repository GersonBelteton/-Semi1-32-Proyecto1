var express = require('express')
var usuario = express.Router();
var controller = require('../controllers/usuario.controller');

usuario.get('/usuario/get_all', controller.default.getInstance().get_all);
usuario.post('/usuario/create', controller.default.getInstance().create);
usuario.post('/usuario/auth', controller.default.getInstance().auth);
module.exports = usuario;