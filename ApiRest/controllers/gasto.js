const { matchedData, sanitize } = require('express-validator/filter');
let sql  = require('mssql');
let db = require('../services/database');
let {mssqlErrors } = require('../Utils/util');

function createGasto(req, res) {
    let data = matchedData(req);
    let aoj = [];

    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int,data.IdClasificacion);
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int,data.IdSubClasificacion);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date,data.FechaIngreso);
    db.pushAOJParam(aoj, 'NoReferencia', sql.Int,data.NoReferencia);
    db.pushAOJParam(aoj, 'CodigoFactura', sql.NVarChar(100),data.CodigoFactura);
    db.pushAOJParam(aoj, 'MontoTotal', sql.Numeric(14,2) ,data.MontoTotal);
    db.pushAOJParam(aoj, 'ConceptoGasto', sql.NVarChar(1000),data.ConceptoGasto);
    db.pushOutParam(aoj, 'IdGasto', sql.Int);
    db.storedProcExecute('USP_CREATE_GASTO',aoj)
    .then((result) => {
        res.status(200).json({IdGasto: result.output.IdGasto})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function getGastoById(req, res) {
    const data = req.params;
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.pushAOJParam(aoj, 'IdGasto', sql.Int, data.IdGasto)
    db.storedProcExecute('USP_GET_GASTO', aoj)
        .then((results) => {
            res.status(200).json({ proveedor: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getGastos(req, res) {
    var data = matchedData(req,{locations:['query']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_GASTOS', aoj)
        .then((results) => {
            res.status(200).json({
                gastos: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}


function getClasificacionesGasto(req, res) {
    var data = matchedData(req,{locations:['query']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_CLASIFICACIONES_GASTO', aoj)
        .then((results) => {
            res.status(200).json({
                clasificaciones: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function getSubclasificaciones(req, res) {
    var data = matchedData(req,{locations:['query']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_SUBCLASIFICACIONES_GASTO', aoj)
        .then((results) => {
            res.status(200).json({
                subclasificaciones: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function getSubclasificacionByIdClasificacion(req, res) {
    var data = matchedData(req);
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
    db.storedProcExecute('USP_GET_SUBCLASIFICACIONES_GASTO_BY_ID_CLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json({
                subclasificaciones: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function getGastosPorFiltro(req, res) {
    var data = matchedData(req,{locations:['query','params']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
    db.pushAOJParam(aoj, 'FechaInicio', sql.Date, data.FechaInicio)
    db.pushAOJParam(aoj, 'FechaFin', sql.Date, data.FechaFin)
    db.storedProcExecute('USP_BUSQUEDA_FILTRO_GASTOS', aoj)
        .then((results) => {
            res.status(200).json({
                gastos: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function getTopProductos(req, res) {
    var data = matchedData(req,{locations:['query','params']});
    var aoj = [];
    console.log(data);
    db.storedProcExecute('USP_GET_PRODUCTOS_MAS_COMPRADOS', aoj)
        .then((results) => {
            res.status(200).json({
                productostop: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

module.exports = {
    createGasto, 
    getGastoById,
    getGastos,
    getClasificacionesGasto,
    getSubclasificaciones,
    getSubclasificacionByIdClasificacion,
    getGastosPorFiltro,
    getTopProductos
}
