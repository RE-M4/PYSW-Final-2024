//Imports
const express = require('express'); //Se importa Express.
const cors = require('cors'); //Se importa CORS.
const {mongoose} = require('./database'); //Se importan las configuraciones de "mongoose".

var app = express(); //Las funciones de Express se guarden en la variable.

//Config
app.use(express.json()); //Se declara a Express que puede hacer uso de archivos JSON.
app.use(cors({origin: 'http://localhost:4200'})); //Se declara a Express que use CORS para apuntar al cliente.

//Routes
app.use('/finalg5/medico', require('./routes/medico.route.js'));
app.use('/finalg5/contacto', require('./routes/contacto.route.js'));
app.use('/finalg5/historial', require('./routes/historial.route.js'));
app.use('/finalg5/turno', require('./routes/turno.route.js'));
app.use('/finalg5/paciente', require('./routes/paciente.route.js'));
app.use('/finalg5/admin', require('./routes/admin.route.js'));
app.use('/finalg5/novedades', require('./routes/novedades.route.js'));
//Server settings
app.set('port', process.env.PORT || 3000); 
app.listen(app.get('port'), () => { 
    console.log(`Server started on port`, app.get('port')); 
});