const   { matchedData } = require('express-validator/filter');
let     {mssqlErrors }      = require('../Utils/util');
const   CompraInsumosModel  = require('../models/CompraInsumos');
const   CompraInsumos       = new CompraInsumosModel();

function createFacturaCompra(req, res) {
    let data = matchedData(req);
    
    CompraInsumos.createFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({
                    IdFactura: result.output.IdFactura
                });
    })
    .catch( err => res.status(500).json( mssqlErrors(err) ) )
}

function updateFacturaCompra(req, res) {
    let data = matchedData(req);

    CompraInsumos.updateFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({IdFactura: result.output.IdFactura})
    })
    .catch(err  => res.status(500).json (mssqlErrors(err) ))
}


function createDetalleFacturaCompra(req, res) {
    let data = matchedData(req);
   
    CompraInsumos.createDetalleFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({IdDetalle: result.output.IdDetalle})
    })
    .catch((err) => {
        res.status(500)
            .json(mssqlErrors(err))
    })
}

function updateDetalleFacturaCompra(req, res) {
    let data = matchedData(req);

    CompraInsumos.updateDetalleFacturaCompra( data )
    .then((result) => {
        res.status(200).json({IdDetalle: result.output.IdDetalle})
    })
    
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}


function getFacturaById(req, res ) {
    let data = matchedData(req,{locations:['params','query','body']});
    
    CompraInsumos.getFacturaById( data.IdFactura ) 
    .then((result) => {
        var jsonString = result.recordset[0];
        jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        console.log(JSON.stringify(jsonString));
        res.status(200)
            .json({
                    factura:jsonString.Factura[0]
                })
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err))
        console.error(err)
    })
}


function getCambiosFacturaById(req, res ) {
    let data = matchedData(req,{locations:['params','query','body']});
    
    CompraInsumos.getCambiosFacturaById( data.IdFactura )
    .then((result) => {
        res.status(200)
            .json({cambios:result.recordset})
    })
    .catch( err =>   res.status(500).json( mssqlErrors(err) )  )
}


function obtenerFacturasCompra(req, res ) {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    
    CompraInsumos.obtenerFacturasCompra( data )
    .then((result) => {
        res.status(200)
            .json({
                    facturas:result.recordset
                });
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err));
        console.error(err);
    })  
}


module.exports = {
    createFacturaCompra, 
    createDetalleFacturaCompra,
    getCambiosFacturaById,
    getFacturaById,
    updateFacturaCompra,
    updateDetalleFacturaCompra,
    obtenerFacturasCompra
    
}
