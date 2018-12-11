const { mssqlErrors } = require('../Utils/util')
const { matchedData } = require('express-validator/filter');
const EnvaseModel  = require('../models/Envase');
const Envase = new EnvaseModel();

function getEnvaseById(req, res) {
    let data = req.params;

    Envase.getEnvaseById( data.IdEnvase )
    .then((results) => {
        res.status(200)
            .json({ 
                    envase: results.recordset[0] 
                });
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getEnvases(req, res) {
    const   data    = matchedData(req, {locations:['query']});

    Envase.getEnvases( data )
    .then((results) => {
        res.status(200).json({
            envases: results.recordset
        });
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));;
    });
}

function createEnvase(req, res) {
    let data = matchedData(req, { locations: 'body' });

    Envase.createEnvase( data.NombEnvase, data.DescEnvase )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {

        res.status(500).json(mssqlErrors(err));
    });
}

function updateEnvase(req, res) {
    let data = matchedData(req, { locations: ['body', 'params'] });
    
    Envase.updateEnvase( data.IdEnvase, data.NombEnvase, data.DescEnvase )
    .then((result) => {
        let afectadas = result.rowsAffected[0];
        res.status(200)
            .json(
                (afectadas > 0) ? { success: 'Envase modificado con exito!' } : { failed: 'No se encontro el envase solicitado!' }
                )
    
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    })
}
function changeStateEnvase(req,res){
    let data = matchedData(req, {locations:['query','params','body']});
    
    Envase.changeStateEnvase( data.IdEnvase, data.Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Envase ' + accion + ' con exito!' } : { failed: 'No se encontro el envase solicitado!' })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    getEnvaseById,
    getEnvases,
    createEnvase,
    updateEnvase,
    changeStateEnvase
}