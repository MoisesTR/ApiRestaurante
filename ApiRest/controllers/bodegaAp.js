const { mssqlErrors } = require('../Utils/util');
const { matchedData, sanitize } = require('express-validator/filter');
const BodegaApModel = require('../models/bodegaAp');
const BodegaAp  = new BodegaApModel();

exports.createEntradaBodegaAp = (req, res) => { 
    const data = matchedData(req, { locations:'body' } )
    
    BodegaAp.createEntradaBodegaAp( data )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    })
    .catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

exports.createDetalleEntrada = ( req, res ) => { 
    const data = matchedData(req,{locations:'body'})

    BodegaAp.createDetalleEntrada( data )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

exports.getDetalleBodegaAp = (req, res) => {
    const Habilitado = req.query.Habilitado;

    BodegaAp.getDetalleBodegaAp( Habilitado )
    .then((results) => {
        res.status(200).json({
            detalles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

exports.generarFactura = (req, res ) => {
    const data = matchedData(req,{locations:'params'})
    
    BodegaAp.generarFactura( data.IdEntradaBodegaAP )
    .then((result) => {
        res.status(200).json({success:'Factura generada con exito!'})    
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}