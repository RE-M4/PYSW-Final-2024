//Imports
const express = require('express'); //Se importa Express.
const cors = require('cors'); //Se importa CORS.
const {mongoose} = require('./database'); //Se importan las configuraciones de "mongoose".

var app = express(); //Las funciones de Express se guarden en la variable.

//Config
app.use(express.json()); //Se declara a Express que puede hacer uso de archivos JSON.
app.use(cors({origin: 'http://localhost:4200'})); //Se declara a Express que use CORS para apuntar al cliente.

//Routes

//Server settings
app.set('port', process.env.PORT || 3000); 
app.listen(app.get('port'), () => { 
    console.log(`Server started on port`, app.get('port')); 
});