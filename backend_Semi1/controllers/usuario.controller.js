var database = require("../config/database.config");

const aws_keys = require('../creds');
var aws = require('aws-sdk');
const s3 = new aws.S3(aws_keys.s3);



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


        this.create = async function (req, res) {


            var id = req.body.nombre_usuario +'foto';
            var foto = req.body.foto;     //base64
            //carpeta y nombre que quieran darle a la imagen

            var nombrei = "fotos-usuario/" + id + ".jpg";

            //se convierte la base64 a bytes
            let buff = new Buffer.from(foto, 'base64');



            const params = {
                Bucket: "archivos-32-p1",
                Key: nombrei,
                Body: buff,
                ContentType: "image",
                ACL: 'public-read'
            };

            //const putResult = s3.putObject(params).promise();

            var fotobd = ''
            await s3.upload(params,  function (err, data) {
                if (err) {
                    console.log('Error uploading file:', err);

                } else {
                    console.log('Url del objetot:', data.Location);
                    fotobd = data.Location
                    console.log(fotobd+ 'fotodentro')


                    var query = "call agregar_usuario(?,?,?,?);"
                    var body = {
                        nombre_usuario: req.body.nombre_usuario,
                        correo: req.body.correo,
                        contrasena: req.body.contrasena,
                        foto: fotobd
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
            });

            console.log(fotobd + ' fotofuera')


        }


    }
    UsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;