const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const aws_keys = require('./creds');
var aws = require('aws-sdk');
const app = express()

const s = new aws.S3(aws_keys.s3);


//Body-Parser Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

//Headers
app.use(function(req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

var usuario = require('./routes/usuario.routes');
var archivo = require('./routes/archivo.routes');
app.use("/", usuario);
app.use("/", archivo);



app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'))
})