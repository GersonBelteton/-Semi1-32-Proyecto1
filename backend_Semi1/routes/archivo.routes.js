var express = require('express')
var archivo = express.Router();
var controller = require('../controllers/archivo.controller');

archivo.get('/archivo/get_all', controller.default.getInstance().get_all);
archivo.get('/archivo/get_one/:id', controller.default.getInstance().get_one);
archivo.get('/archivo/get_all_by_user/:id', controller.default.getInstance().get_all_by_user);
archivo.get('/archivo/get_all_by_type/:id/:tipo', controller.default.getInstance().get_all_by_type);
archivo.post('/archivo/create', controller.default.getInstance().create);
archivo.put('/archivo/update', controller.default.getInstance().update);
archivo.put('/archivo/update_name_type', controller.default.getInstance().update_name_type);
archivo.delete('/archivo/delete/:id', controller.default.getInstance().delete);
archivo.get('/archivo/get_archivos_amigos/:id', controller.default.getInstance().get_archivos_amigos);
archivo.get('/archivo/get_archivos_amigos_by_name/:id/:name', controller.default.getInstance().get_archivos_amigos_by_name);
module.exports = archivo;