var db = require('../services/database')
var sql = require('mssql')
const { mssqlErrors } = require('../Utils/util');
const { matchedData, sanitize } = require('express-validator/filter');
const BodegaApModel = require('../models/bodegaAp');
const BodegaAp  = new BodegaApModel();

function createEntradaBodegaAp(req, res){ 
    var data = matchedData(req, { locations:'body' } )
    
    BodegaAp.createEntradaBodegaAp( data )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    })
    .catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function createDetalleEntrada(req, res){ 
    var data = matchedData(req,{locations:'body'})

    BodegaAp.createDetalleEntrada( data )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

function getDetalleBodegaAp(req, res){
    let Habilitado = req.query.Habilitado;

    BodegaAp.getDetalleBodegaAp( Habilitado )
    .then((results) => {
        res.status(200).json({
            detalles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function generarFactura(req,res){
    let data = matchedData(req,{locations:'params'})
    
    BodegaAp.generarFactura( data.IdEntradaBodegaAP )
    .then((result) => {
        res.status(200).json({success:'Factura generada con exito!'})    
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

module.exports={
   createEntradaBodegaAp,
   getDetalleBodegaAp,
   generarFactura,
   createDetalleEntrada
}