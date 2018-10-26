const { mssqlErrors }   = require('../../Utils/util');
const { matchedData}    = require('express-validator/filter');
import  RolModel from '../../models/Rol';
const   Rol = new RolModel();

function createRol(req,res){ 
    let data = matchedData(req, {locations: ['body']});
   
    Rol.createRol( data )
    .then((results) => {
        res.status(201)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function getRoles(req,res){
    let data = matchedData(req, {locations:['query']})
    console.log(data)

    Rol.getRoles( data )
    .then((results) => {
        res.status(200).json({
            roles:results.recordset
        })
    }).catch((err) => {
        res.status(err.status | 500)
            .json( mssqlErrors(err) );
    });
}
function getRolbyId(req,res){
    let IdRol = req.params.IdRol;

    Rol.getRolbyId( IdRol )
    .then((results) => {
        res.status(200)
        .json({
            rol:results.recordset[0]
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    }); 
}
function updateRol(req,res){
    let data = matchedData(req, {locations: ['body', 'params']});
    
    Rol.updateRol( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'Rol modificado con exito!' } : { failed: 'No se encontro el Rol solicitado!' })
    
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

module.exports={
    createRol,
    getRoles,
    getRolbyId,
    updateRol
}