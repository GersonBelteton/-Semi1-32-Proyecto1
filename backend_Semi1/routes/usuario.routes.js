var express = require('express')
var usuario = express.Router();
var controller = require('../controllers/usuario.controller');

usuario.get('/usuario/get_all', controller.default.getInstance().get_all);
usuario.post('/usuario/create', controller.default.getInstance().create);
usuario.post('/usuario/auth', controller.default.getInstance().auth);
usuario.post('/usuario/agregar_amigo', controller.default.getInstance().agregar_amigo);
usuario.get('/usuario/get_one/:id', controller.default.getInstance().get_one);
usuario.get('/usuario/get_one_by_name/:id', controller.default.getInstance().get_one_by_name);
usuario.get('/usuario/get_count_archivos_publicos/:id', controller.default.getInstance().get_count_archivos_publicos);
usuario.get('/usuario/get_no_amigos/:id', controller.default.getInstance().get_no_amigos);
module.exports = usuario;