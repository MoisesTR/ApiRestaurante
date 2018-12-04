let {matchedData}   = require('express-validator/filter');
let {mssqlErrors}   = require('../Utils/util');
const TipoDocumentoModel    = require('../models/TipoDocumento');
const TipoDocumento         = new TipoDocumentoModel();


function getTiposDocumento(req, res) {
    let data = matchedData(req, {locations:['query']});

    TipoDocumento.getTiposDocumento( data.Habilitado )
    .then((results) => {
        res.status(200)
            .json({ documentos: results.recordset })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}
function createTipoDocumento(req, res){
    let data = matchedData(req, {locations:['body']});

    TipoDocumento.createTipoDocumento( data.NombreTD, data.DescripcionTD)
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    })
    .catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}
function updateTipoDocumento(req, res){
    let data = matchedData(req, {locations:['body', 'params']});

    TipoDocumento.updateTipoDocumento( data.IdTipoDocumento, data.NombreTD, data.DescripcionTD)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'Tipo de Documento modificado con exito!' } : { failed: 'No se encontro el Tipo de Documento solicitado!' })
    })
    .catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateTipoDocumento(req, res) {
    let data = matchedData(req, {locations:['query','params']});

    TipoDocumento.changeStateTipoDocumento( data.IdTipoDocumento, data.Habilitado)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Tipo de Documento '  + accion + ' con exito!' } : { failed: 'No se encontro el Tipo de Documento solicitado!' })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.error('Error:', err)
    });
}
module.exports = {
    createTipoDocumento,
    updateTipoDocumento,
    getTiposDocumento,
    changeStateTipoDocumento
}