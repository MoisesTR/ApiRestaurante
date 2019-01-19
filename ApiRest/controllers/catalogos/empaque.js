const { matchedData } = require('express-validator/filter');
const { mssqlErrors } = require('../../Utils/util')
const EmpaqueModel = require('../../models/catalogos/Empaque');
const Empaque = new EmpaqueModel();

function getEmpaqueById(req, res) {
    const   data    = req.params;

    Empaque.getEmpaqueById( data.IdEmpaque )
    .then((results) => {
        res.status(200)
            .json({ empaque: results.recordset[0] })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getEmpaques(req, res) {
    let data    = matchedData(req, {locations:['query']});

    Empaque.getEmpaques( data )
    .then((results) => {
        res.status(200)
            .json({ empaques: results.recordset })
    }).catch((err) => {
        console.log(err)
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function createEmpaque(req, res) {
    const data = matchedData(req, {locations: 'body'});
   
    Empaque.createEmpaque( data.NombEmpaque, data.DescEmpaque )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function updateEmpaque(req, res) {
    let data = matchedData(req, { locations: ['body', 'params'] });

    Empaque.updateEmpaque( data.IdEmpaque, data.NombEmpaque, data.DescEmpaque)
    .then((result) => {
        let afectadas = result.rowsAffected[0]
    
        res.status(200)
            .json((afectadas > 0) ? { success: 'Empaque editado con exito!' } : { failed: 'No se encontro el Empaque solicitado!' })   
    
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    })
}

function changeStateEmpaque(req,res){
    let data = matchedData(req, {locations:['query','params']});
    
    Empaque.changeStateEmpaque( data.IdEmpaque, data.Habilitado )
    .then((results) => {
        console.log(results.rowsAffected)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Empaque ' + accion + ' con exito!' } : { failed: 'No se encontro el Empaque solicitado!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createEmpaque,
    getEmpaqueById,
    getEmpaques,
    updateEmpaque,
    changeStateEmpaque
}