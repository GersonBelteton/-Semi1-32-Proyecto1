var database = require("../config/database.config");

const aws_keys = require('../creds');
var aws = require('aws-sdk');
const s3 = new aws.S3(aws_keys.s3);



var ArchivoController = (function () {
    function ArchivoController() {

        this.get_all = function (req, res) {

            var query = "SELECT * FROM Archivo "

            database.query(query, function (err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };


        this.get_one = function (req, res) {

            var query = "SELECT * FROM Archivo WHERE id_archivo = ?"
            var id = req.params.id
            database.query(query, [id], function (err, data) {
                if (err) {
                    res.json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0]);
                }
            });
        };

        this.get_all_by_user = function (req, res) {

            var query = "SELECT * FROM Archivo WHERE id_usuario = ?"
            var id = req.params.id
            database.query(query, [id], function (err, data) {
                if (err) {
                    res.json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        };

        this.get_all_by_type = function (req, res) {

            var query = "SELECT * FROM Archivo WHERE id_usuario = ? AND tipo = ?"
            var id = req.params.id
            var tipo = req.params.tipo
            database.query(query, [id, tipo], function (err, data) {
                if (err) {
                    res.json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        };


        this.get_archivos_amigos = function (req, res) {
            var query = "(select nombre_archivo, ruta_archivo, tipo, u1.id_usuario, u1.nombre_usuario from Archivo " +
                "inner join Usuario as u1 " +
                "on u1.id_usuario = Archivo.id_usuario " +
                "inner join Amigo " +
                "on Amigo.id_usuario1 = u1.id_usuario " +
                "inner join Usuario as u2 " +
                "on Amigo.id_usuario2 = u2.id_usuario " +
                "where Archivo.tipo = 'publico' " +
                "and u2.id_usuario =? ) " +
                "UNION " +
                "(select nombre_archivo, ruta_archivo, tipo, u1.id_usuario, u1.nombre_usuario from Archivo " +
                "inner join Usuario as u1 " +
                "on u1.id_usuario = Archivo.id_usuario " +
                "inner join Amigo " +
                "on Amigo.id_usuario2 = u1.id_usuario " +
                "inner join Usuario as u2 " +
                "on Amigo.id_usuario1 = u2.id_usuario " +
                "where Archivo.tipo = 'publico' " +
                "and u2.id_usuario =?) "
            var id = req.params.id
            database.query(query, [id, id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        }


        this.get_archivos_amigos_by_name = function (req, res) {
            var query = "(select nombre_archivo, ruta_archivo, tipo, u1.id_usuario from Archivo " +
                "inner join Usuario as u1 " +
                "on u1.id_usuario = Archivo.id_usuario " +
                "inner join Amigo " +
                "on Amigo.id_usuario1 = u1.id_usuario " +
                "inner join Usuario as u2 " +
                "on Amigo.id_usuario2 = u2.id_usuario " +
                "where Archivo.tipo = 'publico' " +
                "and u2.id_usuario =? and Archivo.nombre_archivo = ? ) " +
                "UNION " +
                "(select nombre_archivo, ruta_archivo, tipo, u1.id_usuario from Archivo " +
                "inner join Usuario as u1 " +
                "on u1.id_usuario = Archivo.id_usuario " +
                "inner join Amigo " +
                "on Amigo.id_usuario2 = u1.id_usuario " +
                "inner join Usuario as u2 " +
                "on Amigo.id_usuario1 = u2.id_usuario " +
                "where Archivo.tipo = 'publico' " +
                "and u2.id_usuario =? and Archivo.nombre_archivo = ?) "
            var id = req.params.id
            var name = req.params.name
            database.query(query, [id,name,id,name], function (err, data) {
                if (err) {
                    res.status(400).json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        }
        this.create = async function (req, res) {


            var archivo = req.body.archivo;     //base64

            var nombrei = "archivos/" + req.body.nombre_archivo;

            //se convierte la base64 a bytes
            let buff = new Buffer.from(archivo, 'base64');
            var extSplit = req.body.nombre_archivo.split(".");
            var ext = extSplit[extSplit.length - 1];
            console.log(ext);
            var contentType;
            if (ext == "txt") {
                contentType = "text/plain"
            } else if (ext == "pdf") {
                contentType = "aplication/pdf"
            } else if (ext == "jpg" || ext == "png") {
                contentType = "image"
            }
            console.log(contentType)
            const params = {
                Bucket: "archivos-32-p1",
                Key: nombrei,
                Body: buff,
                ContentType: contentType,
                ACL: 'public-read'
            };

            //const putResult = s3.putObject(params).promise();

            var archivobd = ''
            await s3.upload(params, function (err, data) {
                if (err) {
                    console.log('Error uploading file:', err);

                } else {
                    console.log('Url del objetot:', data.Location);
                    archivobd = data.Location



                    var query = "INSERT INTO Archivo (nombre_archivo, ruta_archivo, tipo, id_usuario) VALUES (?,?,?,?);"
                    var body = {
                        nombre_archivo: req.body.nombre_archivo,
                        ruta: archivobd,
                        tipo: req.body.tipo,
                        id_usuario: req.body.id_usuario

                    }

                    database.query(query, [body.nombre_archivo, body.ruta, body.tipo, body.id_usuario], function (err, data) {
                        if (err) {
                            res.status(400).json({
                                estado: false,
                                status: 400,
                                error: err
                            });
                        } else {


                            res.json({
                                estado: true,
                                status: 200,
                                mensaje: "El archivo se agrego con exito"
                            });
                        }
                    });
                }
            });




        }


        this.update = async function (req, res) {


            var archivo = req.body.archivo;     //base64

            var nombrei = "archivos/" + req.body.nombre_archivo;

            //se convierte la base64 a bytes
            let buff = new Buffer.from(archivo, 'base64');
            var extSplit = req.body.nombre_archivo.split(".");
            var ext = extSplit[extSplit.length - 1];
            console.log(ext);
            var contentType;
            if (ext == "txt") {
                contentType = "text/plain"
            } else if (ext == "pdf") {
                contentType = "aplication/pdf"
            } else if (ext == "jpg" || ext == "png") {
                contentType = "image"
            }
            console.log(contentType)
            const params = {
                Bucket: "archivos-32-p1",
                Key: nombrei,
                Body: buff,
                ContentType: contentType,
                ACL: 'public-read'
            };

            //const putResult = s3.putObject(params).promise();

            var archivobd = ''
            await s3.upload(params, function (err, data) {
                if (err) {
                    console.log('Error uploading file:', err);

                } else {
                    console.log('Url del objetot:', data.Location);
                    archivobd = data.Location



                    var query = "UPDATE Archivo set nombre_archivo = ?, ruta_archivo = ?, tipo = ? WHERE id_archivo = ?"
                    var body = {
                        nombre_archivo: req.body.nombre_archivo,
                        ruta: archivobd,
                        tipo: req.body.tipo,
                        id_archivo: req.body.id_archivo

                    }

                    database.query(query, [body.nombre_archivo, body.ruta, body.tipo, body.id_archivo], function (err, data) {
                        if (err) {
                            res.status(400).json({
                                estado: false,
                                status: 400,
                                error: err
                            });
                        } else {


                            res.json({
                                estado: true,
                                status: 200,
                                mensaje: "El archivo se actualizo con exito"
                            });
                        }
                    });
                }
            });




        }

        this.update_name_type = function (req, res) {

            var query = "UPDATE Archivo set nombre_archivo = ?, tipo = ? WHERE id_archivo = ?"
            var body = {
                nombre_archivo: req.body.nombre_archivo,
                tipo: req.body.tipo,
                id_archivo: req.body.id_archivo
            }

            database.query(query, [body.nombre_archivo, body.tipo, body.id_archivo], function (err, data) {
                if (err) {
                    res.status(400).json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {


                    res.json({
                        estado: true,
                        status: 200,
                        mensaje: "El archivo se actualizo con exito"
                    });
                }
            });

        }

        this.delete = function (req, res) {

            var query = "DELETE FROM Archivo WHERE id_archivo = ?"
            var id = req.params.id
            database.query(query, [id], function (err, data) {
                if (err) {
                    res.json({
                        estado: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        estado: true,
                        status: 200,
                        mensaje: "El archivo se ha eliminado"
                    });
                }
            });
        };




    }
    ArchivoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ArchivoController;
}());
exports.default = ArchivoController;