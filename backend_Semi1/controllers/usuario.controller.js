var database = require("../config/database.config");


var UsuarioController = (function () {
    function UsuarioController() {

        this.get_all = function (req, res) {

            var query = "SELECT id_usuario, nombre_usuario, correo,contrasena, foto FROM USUARIO "

            database.query(query, function (err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };


        this.auth = function (req, res) {
            var query = "SELECT * FROM Usuario  WHERE nombre_usuario = ? AND contrasena = ?"

            var body = {
                nombre_usuario: req.body.nombre_usuario,
                contrasena: req.body.contrasena
            };

            database.query(query, [body.nombre_usuario, body.contrasena], function (err, data) {
                if (err) {
                    res.status(400).json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0]);
                }
            });
        };


        this.create = function(req, res){
            var query = "call agregar_usuario(?,?,?,?);"
            var body = {
                nombre_usuario: req.body.nombre_usuario,
                correo: req.body.correo,
                contrasena:req.body.contrasena,
                foto:req.body.foto
            }

            database.query(query, [body.nombre_usuario, body.correo, body.contrasena, body.foto], function (err, data) {
                if (err) {
                    res.status(400).json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {

                    console.log(data[0][0]._existe)
                    if (data[0][0]._existe > 0) {
                        res.json({
                            estado: false,
                            status: 400,
                            mensaje: "El nombre de usuario o correo ya fue usado"
                        });

                    } else {
                        res.json({
                            estado: true,
                            status: 200,
                            mensaje: "El usuario se agrego con exito"
                        });
                    }
                }
            });
        }


    }
    UsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;