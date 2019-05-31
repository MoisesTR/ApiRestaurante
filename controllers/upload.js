var shortid = require('shortid');
var fs = require('fs');
const ImagenError = require('../errores/errorImagen');
const {mssqlErrors} = require('../Utils/defaultImports.js')
const ProductoModel     = require('../models/Producto');
const productoModel = new ProductoModel();
const trabajadorModel = require('../models/Trabajador.js');
const usuarioModel = require('../models/User.js');

function uploadImage(req, res, next) {

    var carpeta = req.params.carpeta;
    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json(new ImagenError('Debe seleccionar una imagen', 400).toJson());
    }

    //Carpetas de imagenes validas
    var tiposValidos = ['productos', 'trabajadores', 'usuarios','temp'];

    if (tiposValidos.indexOf(carpeta) < 0) {
        return res.status(400).json(new ImagenError('Debe seleccionar una imagen', 400).toJson());
    }

    //Obtener nombre archivo
    var archivo = req.files.image;
    var nombreCortado = archivo.name.split('.');
    var extArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

    //Extensiones de archivos permitidas
    var extensionesPermitidas = ['png', 'jpg', 'jpeg'];

    if (extensionesPermitidas.indexOf(extArchivo) < 0) {
        res.status(400).json(
            new ImagenError('Las extensiones validas son ' + extensionesPermitidas.join(' , '), 400).toJson()
        );
    }

    //Nombre de archivo personalizado
    var nombreArchivo = shortid.generate() + '.' + extArchivo;

    //Mover el archivo temporal a un path
    var path = `./uploads/${ carpeta }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            res.status(500).json(new ImagenError('Error al mover el archivo', 500).toJson());
        } else {
            subirImagenPorCarpeta(carpeta, id, nombreArchivo, res, next);
        }
    })

}

function subirImagenPorCarpeta(carpeta, id , nombreArchivo,res, next) {

    var pathRaiz = './uploads/' + carpeta + "/";


    if (carpeta === 'productos') {
        productoModel.getProductoById(id)
            .then((results) => {
                const producto = results.recordset[0] || null;

                if (producto) {
                    const pathViejo =  pathRaiz + producto.Imagen;

                    deleteImage(pathViejo);

                    productoModel.updateImageProducto(id, nombreArchivo)
                        .then(() => {
                            producto.Imagen = nombreArchivo;
                            res.status(200).json({ producto: producto})
                        }).catch((err) => {
                        res.status(500).json(mssqlErrors(err));
                    });
                } else {
                    res.status(404).json(
                        new Error('El identificador del producto solicitado no existe!'));
                }
            }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
    }

    if (carpeta === 'trabajadores') {
        trabajadorModel.getTrabajadorById(id).then((results) => {
            const trabajador  = results.recordset[0] || null;

            if (trabajador) {
                const pathViejo =  pathRaiz + trabajador.Imagen;

                deleteImage(pathViejo);

                trabajadorModel.updateImageTrabajador(id, nombreArchivo)
                    .then(() => {
                        trabajador.Imagen = nombreArchivo;
                        res.status(200).json({ trabajador: trabajador})
                    }).catch((err) => {
                        res.status(500).json(mssqlErrors(err));
                    });

            } else {
                res.status(404).json(new Error('El identificador del trabajador solicitado no existe!'));
            }
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
    }

    if (carpeta === 'usuarios') {

        usuarioModel.getUserById(id).then((results) => {
            const usuario  = results.recordset[0] || null;

            if (usuario) {
                const pathViejo =  pathRaiz + usuario.Imagen;

                deleteImage(pathViejo);

                usuarioModel.updateImageUsuario(id, nombreArchivo)
                    .then(() => {
                        usuario.Imagen = nombreArchivo;
                        res.status(200).json({ usuario: usuario})
                    }).catch((err) => {
                        res.status(500).json(mssqlErrors(err));
                    });
            } else {
                res.status(400).json(new Error('El identificador del usuario solicitado no existe!'));
            }

        }).catch((err) => {
             res.status(500).json(mssqlErrors(err));
        });
    }


}

//Si existe , elimina la imagen anterior
function deleteImage(pathViejo) {
    fs.access(pathViejo, fs.F_OK, (err) => {
        if (err) {
            console.log('Acceso al path de la imagen',err);
        }

        fs.unlink(pathViejo, (err) => {
            console.log('Eliminar imagen',err);
        });
    });
}

module.exports = {
    uploadImage
};