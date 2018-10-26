const {mssqlErrors} =  require('../Utils/util');
const {matchedData} = require('express-validator/filter');
const ClasificacionUdmModel = require('../models/ClasificacionUdm');
const ClasificacionUdm = new ClasificacionUdmModel();

function getClasificacionesUdm(req,res){
    let data = matchedData(req,{locations:['query']});
    
    ClasificacionUdm.getClasificaciones( data )
    .then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

function getClasificacionUdmById(req,res){
    var data = req.params;
    
    ClasificacionUdm.getClasificacion( data.IdClasifUDM )
    .then((results) => {
        res.status(200)
            .json({
                    clasificacion:results.recordset[0]
                }); 
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    });
}

module.exports={
   getClasificacionesUdm,
   getClasificacionUdmById
}
