const { mssqlErrors }   = require('../Utils/util');
const { matchedData }   = require('express-validator/filter')
const ProveedorModel    = require('../models/Proveedor');
const Proveedor         = new ProveedorModel();

function getProveedorById(req, res) {
    const data = req.params;

    Proveedor.getProveedorById( data.IdProveedor )
    .then((results) => {
        res.status(200)
            .json({ 
                    proveedor: results.recordset[0] 
                });
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function getProveedores(req, res) {
    var data = matchedData(req, {locations:['query']})
<<<<<<< HEAD
    console.log('Proveedores');
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_PROVEEDORES', aoj)
        .then((results) => {
            var jsonString = results.recordset[0];
            jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
            res.status(200).json(jsonString);
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
=======

    Proveedor.getProveedores( data.Habilitado ) 
    .then((results) => {
        res.status(200)
            .json({ proveedores: results.recordset })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
>>>>>>> redefinicion_base_10102018
}

function createProveedor(req, res) {
    var data = matchedData(req);

    Proveedor.createProveedor( data )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        console.log(err);
        
        res.status(500 || err.status)
            .json(mssqlErrors(err));
    });
}

function updateProveedor(req, res) {
    var data = matchedData(req, {locations: ['body','params']});

    Proveedor.updateProveedor( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Proveedor modificado con exito!' } : { failed: 'No se encontro el Proveedor solicitado!' })
    
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateProveedor(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    
    Proveedor.changeStateProveedor( data.IdProveedor, data.Habilitado)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Proveedor ' + accion + ' con exito!' } : { failed: 'No se encontro el proveedor solicitado!' })
        console.log('Proveedor cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.log('Error:', err)
    });
}

function createTelefonoProveedor(req,res) {
    let data = matchedData(req, {locations:['query','params','body']});

    Proveedor.createTelefonoProveedor( data )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
    });
}

function changeStateTelefonoProveedor(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});

    Proveedor.changeStateTelefonoProveedor( data.IdTelefono, data.Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Telefono ' + accion + ' con exito!' } : { failed: 'No se encontro el telefono solicitado!' })
        console.log('Proveedor cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500)
            .json(mssqlErrors(err));
        console.log('Error:', err)
    });
}


module.exports = {
    createProveedor,
    getProveedorById,
    getProveedores,
    updateProveedor,
    changeStateProveedor,
    createTelefonoProveedor,
    changeStateTelefonoProveedor
}
