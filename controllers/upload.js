var shortid = require('shortid');
var fs = require('fs');
const {mssqlErrors} = require('../Utils/defaultImports.js')
const ProductoModel     = require('../models/Producto');
const productoModel = new ProductoModel();
const trabajadorModel = require('../models/Trabajador.js');
const usuarioModel = require('../models/User.js');

function uploadImage(req, res) {

    var carpeta = req.params.carpeta;
    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            "message": 'Debe seleccionar una imagen'
        });

    }

    //Carpetas de imagenes validas
    var tiposValidos = ['productos', 'trabajadores', 'usuarios','temp'];

    if (tiposValidos.indexOf(carpeta) < 0) {
        return res.status(400).json({
            ok: false,
            "message": 'Carpeta no encontrada'
        });
    }
        //Obtener nombre archivo
        var archivo = req.files.image;
        var nombreCortado = archivo.name.split('.');
        var extArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

        //Extensiones de archivos permitidas
        var extensionesPermitidas = ['png', 'jpg', 'jpeg'];

        if (extensionesPermitidas.indexOf(extArchivo) < 0) {
            return res.status(400).json({
                "message": 'Las extensiones validas son ' + extensionesPermitidas.join(' , ')
            });
        }

        //Nombre de archivo personalizado
        var nombreArchivo = shortid.generate() + '.' + extArchivo;

        //Mover el archivo temporal a un path
        var path = `./uploads/${ carpeta }/${ nombreArchivo }`;

        archivo.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    "message": 'Error al mover el archivo',
                    "error": err
                });
            } else {
                subirImagenPorCarpeta(carpeta, id, nombreArchivo, res);
            }
        })

}

function subirImagenPorCarpeta(carpeta, id , nombreArchivo,res) {

    var pathRaiz = './uploads/' + carpeta + "/";

    if (carpeta === 'productos') {
        productoModel.getProductoById(id)
            .then((results) => {
                const producto = results.recordset[0] || null;

                if (producto) {
                    const pathViejo =  pathRaiz + producto.Imagen;

                    deleteImage(pathViejo, res);

                    productoModel.updateImageProducto(id, nombreArchivo)
                        .then(() => {
                        producto.Imagen = nombreArchivo;
                        return res.status(200).json({ producto: producto})
                    }).catch((err) => {
                        return res.status(500).json(mssqlErrors(err));
                    });

                } else {
                    return res.status(404).json({
                        ok: false,
                        "message": 'El identificador del producto solicitado no existe!',
                    });
                }
            }).catch((err) => {
            return res.status(500).json(mssqlErrors(err));
        });
    }

    if (carpeta === 'trabajadores') {
        trabajadorModel.getTrabajadorById(id).then((results) => {
            const trabajador  = results.recordset[0] || null;

            if (trabajador) {
                const pathViejo =  pathRaiz + trabajador.Imagen;

                deleteImage(pathViejo, res);

                return trabajadorModel.updateImageTrabajador(id, nombreArchivo)
                    .then(() => {
                        trabajador.Imagen = nombreArchivo;
                        res.status(200).json({ trabajador: trabajador})
                    }).catch((err) => {
                        res.status(500).json(mssqlErrors(err));
                });

            } else {
                return res.status(404).json({
                    ok: false,
                    "message": 'El identificador del trabajador solicitado no existe!',
                });
            }
        }).catch((err) => {
            return res.status(500).json(mssqlErrors(err));
        });
    }

    if (carpeta === 'usuarios') {

        usuarioModel.getUserById(id).then((results) => {
            const usuario  = results.recordset[0] || null;

            if (usuario) {
                const

                    =  pathRaiz + usuario.Imagen;

                deleteImage(pathViejo, res);

                return usuarioModel.updateImageUsuario(id, nombreArchivo)
                    .then(() => {
                        usuario.Imagen = nombreArchivo;
                        res.status(200).json({ usuario: usuario})
                    }).catch((err) => {
                        res.status(500).json(mssqlErrors(err));
                    });
            } else {
                return res.status(400).json({
                    ok: false,
                    "message": 'El identificador del usuario solicitado no existe!',
                });
            }

        }).catch((err) => {
            return res.status(500).json(mssqlErrors(err));
        });
    }

}

//Si existe , elimina la imagen anterior
function deleteImage(pathViejo, res) {
    if (fs.existsSync(pathViejo)) {
        fs.unlink(pathViejo, (err) =>{
            return res.status(500).json({
                "message": 'Error al eliminar la imagen!',
                "error": err
            });
        });
    }
}

module.exports = {
    uploadImage
};