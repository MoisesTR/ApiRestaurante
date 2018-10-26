const { mssqlErrors,existParam } = require('../Utils/util');
const {matchedData} = require('express-validator/filter');
const ClasificacionModel = require('../models/Clasificacion')
const Clasificacion = new ClasificacionModel();

function createClasificacion(req, res) {
    let data = matchedData(req, {locations:'body'});
    console.log(data);
    
    Clasificacion.createClasificacion(data.NombCategoria, data.DescCategoria)
    .then((results) => {
        res.status(201)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    })
}

function getClasificaciones(req, res) {
    let data    = matchedData(req,{locations: ['query']});
   
    Clasificacion.getClasificaciones( data )
    .then((results) => {
        res.status(200).json({
            clasificaciones: results.recordset
        })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getClasificacionesByIdCategoria(req,res){
    let data    = req.params;
    
    Clasificacion.getClasificacionesByIdCategoria( data.IdCategoria)
    .then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

function updateClasificacion(req, res) {
    let data = matchedData(req,{locations: ['body', 'params']});

    Clasificacion.updateClasificacion(data)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'Clasificación modificada con exito!' } : { failed: 'No se encontro la Clasificación solicitada!' })
    
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getClasificacionById(req, res) {
    let data    = req.params;

    Clasificacion.getClasificacionById( data.IdClasificacion )
    .then((results) => {
        res.status(200)
            .json({ 
                clasificacion: results.recordset[0] 
            });
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateClasificacion(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});

    Clasificacion.changeStateClasificacion( data.IdClasificacion, data.Habilitado)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Clasificacion ' + accion + ' con exito!' } : { failed: 'No se encontro la clasificacion solicitada!' })
        console.log('Clasificacion cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createClasificacion,
    getClasificacionById,
    getClasificacionesByIdCategoria,
    getClasificaciones,
    updateClasificacion,
    changeStateClasificacion
}