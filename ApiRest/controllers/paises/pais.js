const {mssqlErrors} = require('../../Utils/util');
const {matchedData} = require('express-validator/filter');
const PaisModel     = require('../../models/Pais');
const Pais  = new PaisModel();

exports.getPaises   = ( req, res ) => {
    const data = matchedData( req);
    
    Pais.getPaises(data.Habilitado)
    .then( result => {
        res.status(200)
            .json(result.recordset)
    })
    .catch( err => {
        const error = mssqlErrors(err);
        console.log('error',error);
        
        res.status( error.status || 500)
        .json(error);
    } )
};

exports.getPais     = ( req, res ) => {
    const {IdPais}  = req.params;
    
    ejectPromiseSingleResponse(Pais.getPais( Number(IdPais) ), res)
};

function ejectPromiseSingleResponse ( promesa, res ) {
    promesa
    .then( result => {
        res.status(200)
            .json(result.recordset[0])
    })
    .catch( err => {
        const error = mssqlErrors(err);
        res.status( error.status | 500)
            .json(error);
    } )
}  

exports.createPais  = ( req, res ) => {

    return Pais.createPais(  )
};

exports.updatePais  = ( req, res ) => {

    return Pais.updatePais(  )
};