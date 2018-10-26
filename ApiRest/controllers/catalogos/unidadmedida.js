const {db, sql, mssqlErrors, matchedData} = require('../defaultImports');
import  UnidadMedidaModel from '../../models/UnidadMedida'
import { Habilitado } from '../../Utils/validations/genericValidations';
const   UnidadMedida = new UnidadMedidaModel();

function getUnidadById(req,res){
    const data = req.params;
   
   UnidadMedida.getUnidadById( IdUnidadMedida ) 
    .then((results) => {
        res.status(200)
            .json({
                unidadmedida:results.recordset[0]
            }) 
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    });
}
function getUnidadesMedida(req,res){
    let data    = matchedData(req, {locations:['query']})

    UnidadMedida.getUnidadesMedida( data )
    .then((results) => {
        res.status(200).json({unidadesmedida:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createUnidadMedida(req,res){
    const data = matchedData(req);
    
    UnidadMedida.createUnidadMedida( data )
    .then((results) => {
        res.status(201)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function updateUnidadMedida(req,res){
    const data = matchedData(req);
    var aoj = [];

    UnidadMedida.updateUnidadMedida( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida actualizada con exito!' } : { failed: 'No se encontro actualizo la unidad de medida solicitado!' })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function changeStateUnidadMedida(req,res){
    let data = matchedData(req, {locations:['query','params','body']});

    UnidadMedida.changeStateUnidadMedida( data.IdUnidadMedida, Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0];
        let accion = (data.Habilitado == false) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida ' + accion + ' con exito!' } : { failed: 'No se encontro la unidad de medida solicitada!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports={
    createUnidadMedida,
    getUnidadById,
    getUnidadesMedida,
    updateUnidadMedida,
    changeStateUnidadMedida
}