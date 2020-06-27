const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/api-rest', {useNewUrlParser: true}).then(() =>{ 
    console.log('Conexion a BD establecida');

    app.listen(port, ()=>{
        console.log('Servidor corriendo en puerto ' + port);
    })
});

