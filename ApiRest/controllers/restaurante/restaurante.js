const { matchedData, mssqlErrors } = require('../../Utils/defaultImports');
const RestauranteModel = require('../../models/Restaurante');

exports.getRestaurantes = ( req, res) => {
    const   data    = matchedData(req, {locations:'query'});
    
    RestauranteModel.getRestaurantes( data )
    .then( result => {
        res.status(200) 
            .json({restaurantes: result.recordset})
    })
    .catch( error => res.status( error.status | 500).json( mssqlErrors(error) ))
}

exports.getRestaurante = (req, res) => {
    const data = matchedData(req,{locations: 'param'});

    RestauranteModel.getRestaurante( data.IdRestaurante )
    .then( result => {
        console.log(result);
        
        res.status(200) 
            .json(result.recordset[0])
    })
    .catch( error => res.status( error.status | 500).json( mssqlErrors(error) ))
}

exports.createRestaurante = (req, res) => {
    const   data    = matchedData(req, {locations:'body'});
    
    RestauranteModel.createRestaurante( data )
    .then( result => {
        res.status(200)
            .json(result)
    })
    .catch(err =>{
        res.status(err.status | 500)
            .json( mssqlErrors( err) )
    })
}

exports.updateRestaurante = (req, res) => {
    
}