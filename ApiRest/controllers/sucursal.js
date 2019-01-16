const { mssqlErrors }           = require('../Utils/util');
const { matchedData } = require('express-validator/filter');
const SucursalModel     = require('../models/Sucursal');

function getSucursalById(req, res) {
    const data = req.params;

    SucursalModel.getSucursalById( data.IdSucursal )
    .then((results) => {
        res.status(200)
            .json({ sucursal: results.recordset[0] })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getSucursales(req, res) {
    const data = matchedData(req,{locations:['query']});

    SucursalModel.getSucursales( data.Habilitado )
    .then((results) => {
        res.status(200)
            .json({ sucursales: results.recordset })
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function createSucursal(req, res) {
    const data = matchedData(req, {locations: 'body'});

    SucursalModel.createSucursal( data )
    .then( results => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    })
}

function updateSucursal(req, res) {
    const data =  matchedData(req, {locations:['body','params']});

    Sucursal.updateSucursal( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'Sucursal modificada con exito!' } : { failed: 'No se encontro la Sucursal solicitada!' })

    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateSucursal(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});

    SucursalModel.changeStateSucursal( data.IdSucursal. data.Habilitado )
    .then((results) => {
        let afectadas   = results.rowsAffected[0]
        let accion      = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Sucursal ' + accion + ' con exito!' } : { failed: 'No se encontro la Sucursal solicitada!' })
        console.log('Sucursal cambiada de estado con exito!')
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createSucursal,
    updateSucursal,
    getSucursales,
    getSucursalById,
    changeStateSucursal
}