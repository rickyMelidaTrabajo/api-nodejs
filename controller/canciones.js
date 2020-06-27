let Canciones = require('../models/canciones');

let controller = {

    create: (req, res) => {
        let datos = req.body;

        let cancion = new Canciones();

        cancion.nombre = datos.nombre;
        cancion.artista = datos.artista;

        cancion.save((err, cancion) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error de crear'
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'Excelente, se guardo el dato'
                });
            }
        });



    },

    read: (req, res) => {

        let query ;
        let nombre = req.params.nombre;

        //Creamos una expresion regular para la busqueda, la cual obvia las mayusculas y minusculas

        if (nombre || nombre != undefined) {
          let busqueda = new RegExp(nombre, "i");
            query = Canciones.find({
                $or: [
                    { "artista": busqueda },
                    { "nombre": busqueda }
                ]
            });
        } else {
            query = Canciones.find();
        }

        query.sort('_id').exec((err, data)=>{
            if (err) {
                return res.status(500).send({
                  status: 'error',
                  message: 'Hay error al extraer los datos'
                });
              }

              if (!data) {
                return res.status(404).send({
                  status: 'error',
                  mensaje: 'No hay datos en la base de datos'
                });
              }

              return res.status(200).send({
                status: 'success',
                data
              });
        });

    },

    update: (req, res) => {
        let id = req.params.id;

        let datos = req.body;

        Canciones.findOneAndUpdate({_id: id}, datos, {new: true}, (err, cancionModificada)=>{

            if(err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al actualizar!!'
                });
            }

            if(!cancionModificada) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No existe la cancion!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                cancion: cancionModificada
            });

        })
    },

    delete: (req, res) => {
        let id = req.params.id;

        Canciones.findOneAndDelete({_id: id}, (err, cancionEliminda)=>{
            if(err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al borrar !!'
                });
            }


            if(!cancionEliminda) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha borrado la musica, posiblemente no exista !!'
                });
            }

            return res.status(200).send({
                status: 'success',
                cancion: cancionEliminda
            });
        });
    }
}

module.exports = controller;
