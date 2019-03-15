const {mssqlErrors} = require('../Utils/util');
const {matchedData} = require('express-validator/filter');
const EstadoProductoModel = require('../models/EstadoProducto');
const EstadoProducto = new EstadoProductoModel();

function getEstados(req,res){
    let data = matchedData(req,{locations:['query']});

    EstadoProducto.getEstados( data )
    .then((results) => {
        res.status(200)
            .json({
                estados:results.recordset
                });
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    })
}
function getEstadoById(req,res){
    let IdEstado = req.params.IdEstado;
    
    EstadoProducto.getEstadoById( IdEstado )
    .then((results) => {
        res.status(200)
            .json({ 
                    estado: results.recordset[0]
                });
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    })
}
module.exports={
    getEstadoById,
    getEstados
}