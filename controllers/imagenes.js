const fs = require('fs');
var path = require('path');
/**
 * TIPO -- CARPETA DONDE ESTA UBICADA LA IMAGEN
 * IMG -- NOMBRE DE IMAGEN A BUSCAR
 * @param req
 * @param res
 */
function getImage(req, res) {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let pathNoImagen = path.resolve(__dirname, '../uploads/temp/no-img.jpg')
        res.sendFile(pathNoImagen);
    }

}

function deleteImage(req,res) {
    var tipo = req.params.tipo;
    var img = req.params.img;

     //Carpetas de imagenes validas
     var tiposValidos = ['productos', 'trabajadores', 'usuarios','temp'];

     if (tiposValidos.indexOf(tipo) < 0) {
         return res.status(400)
            .json({
                "ok": false,
                "message": 'Carpeta no encontrada'
            });
     }

     var path = `./uploads/${ tipo }/${ img }`;

    
       if (fs.existsSync(path)) {
            fs.unlink(path);

           return res.status(200).json({
                "message": 'Peticion realizada correctamente',
                "image": '',
                "success" : true
            });
       }  else {
            return res.status(400).json({
                "ok": false,
                "message": 'La imagen a remover no existe en la carpeta'
            });
       }

}

module.exports = {
    getImage,
    deleteImage
}