const { mssqlErrors }   = require('../Utils/util')
const {matchedData }    = require('express-validator/filter')
const SubClasificacionModel = require('../models/SubClasificacion');
const SubClasificacion      = new SubClasificacionModel();

function getSubclasificById(req, res) {
    var data = req.params;

    SubClasificacion.getSubclasificById( data.IdSubclasificacion )
    .then((results) => {
        res.status(200)
            .json({ subclasificacion: results.recordset[0] })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getSubclasificaciones(req, res) {
    var data = matchedData(req,{locations:['query']});

    SubClasificacion.getSubclasificaciones( data.Habilitado )
    .then((results) => {
        res.status(200).json({
            subclasificaciones: results.recordset
        });
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.error(err)
    });
}

function createSubclasificacion(req, res) {
    var data = matchedData(req,{locations:['body']});

    SubClasificacion.createSubclasificacion( data )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function updateSubclasificacion(req, res) {
    var data = matchedData(req, {locations: ['body', 'params']});

    SubClasificacion.updateSubclasificacion( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'SubClasificacion modificada con exito!' } : { failed: 'No se encontro la SubClasificacion solicitada!' })

    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getSubclasificacionesByIdClasificacion(req, res) {
    var data = req.params;

    SubClasificacion.getSubclasificacionesByIdClasificacion( data.IdClasificacion )
    .then((results) => {
        res.status(200)
            .json({ subclasificaciones: results.recordset })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateSubClasificacion(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    
    SubClasificacion.changeStateSubClasificacion( data.IdSubclasificacion, data.Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas   = results.rowsAffected[0]
        let accion      = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200)
            .json((afectadas > 0) ? { success: 'SubClasificacion '  + accion + ' con exito!' } : { failed: 'No se encontro la SubClasificacion solicitada!' })
        console.log('SubClasificacion cambiada de estado con exito!')
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createSubclasificacion,
    getSubclasificById,
    getSubclasificaciones,
    updateSubclasificacion,
    getSubclasificacionesByIdClasificacion,
    changeStateSubClasificacion
}