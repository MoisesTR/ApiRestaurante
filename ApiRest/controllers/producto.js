const { mssqlErrors }   = require('../Utils/util');
const {matchedData}     = require('express-validator/filter')
const ProductoModel     = require('../models/Producto');
const Producto          = new ProductoModel();

function getProductoById(req, res) {
    let data = req.params;
    
    Producto.getProductoById( data.IdProducto )
    .then((results) => {
        var jsonString = results.recordset[0];
        jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        res.status(200).json(jsonString);
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getProductos(req, res) {
    const data = matchedData(req,{locations:['query']});
    
    ProductoModel.getProductos( data )
    .then((results) => {
        res.status(200).json({
            productos: results.recordset
        });
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function createProducto(req, res) {
    var data = matchedData(req, {locations:['body']});

    Producto.createProducto( data )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function updateProducto(req, res) {
    var data = matchedData(req,{locations: ['body', 'params']});

    Producto.updateProducto( data )
    .then((results) => {
        res.status(200)
            .json({
                success: 'Producto Actualizado exitosamente!!'
            });
        console.dir(results)
        console.log('Producto Actualizado con exito!')
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateProducto(req, res) {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log('Changing state')
    console.log(data.IdProducto + ' ! ', data.Habilitado)
    
    Producto.changeStateProducto( data.IdProducto, data.Habilitado)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Producto ' + accion + ' con exito!' } : { failed: 'No se encontro el producto solicitado!' })
        console.log('Producto cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}

module.exports = {
    createProducto,
    getProductoById,
    getProductos,
    updateProducto,
    changeStateProducto
}