'use strict';
const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const MonedaModel   =   require('../../models/facturacion/Moneda');
const moneda        =   new MonedaModel();

exports.getMonedas = ( req, res ) => {
    const data = matchedData( req,{locations: 'query'});

    moneda.getMonedas( data )
    .then((result) => {
        // console.log(result);
        res.status(200)
            .json(result.recordset)
    }).catch((err) => {
        console.error(err);
        res.status( err.status || 500)
            .json( mssqlErrors( err ) );
    });
}

function ejectPromiseSingleResponse ( promesa, res ) {
    promesa
    .then( result => {
        res.status(200)
            .json(result.recordset[0])
    })
    .catch( err => {
        const error = mssqlErrors(err);
        res.status( error.status || 500)
            .json(error);
    } )
}  

exports.getMoneda = (req, res ) => {
    const { IdMoneda } = req.params;

    ejectPromiseSingleResponse( moneda.getMonedaById( IdMoneda ), res )
}

exports.getMonedaByIdPais =( req, res ) => {
    ejectPromiseSingleResponse( moneda.getMonedaByIdPais() )
}

exports.getMonedaByCodIso = (req, res) => {
    ejectPromiseSingleResponse( moneda.get)
}

exports.createMoneda = (req, res) => {
    
};