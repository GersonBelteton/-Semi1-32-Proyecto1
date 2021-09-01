const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express()




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
app.use("/", usuario);



app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'))
})