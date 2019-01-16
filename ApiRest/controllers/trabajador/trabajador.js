const {mssqlErrors, matchedData} = require('../../Utils/defaultImports.js')
const TrabajadorModel = require('../../models/Trabajador');

function getTrabajadorById(req, res) {
    const data = req.params;

    TrabajadorModel.getTrabajadorById(data.IdTrabajador)
        .then((results) => {
            res.status(200).json({ trabajador: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getTrabajadores(req, res) {
    const data = matchedData(req,{locations:['query']});

    TrabajadorModel.getTrabajadores( data.Habilitado, data.IdSucursal, data.IdPais)
        .then((results) => {
            res.status(200).json({ trabajadores: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createTrabajador(req, res) {
    const trabajadorData = matchedData(req, { locations: ['body'] });
  
    TrabajadorModel.createTrabajador( trabajadorData ) 
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function updateTrabajador(req, res) {
    const trabajadorData = matchedData(req, {locations: ['body', 'params']});

    TrabajadorModel.updateTrabajador( trabajadorData ).then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json(
            (afectadas > 0) ? { success: 'Trabajador modificado con exito!' } : { failed: 'No se encontro el Trabajador solicitado!' })

    }).catch((err) => {
        console.log(err);
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateTrabajador(req, res) {
    const data = matchedData(req,{locations:['query','params','body']})

    TrabajadorModel
    .then((results) => {
        let afectadas = results.rowsAffected[0]
            let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Trabajador '  + accion + ' con exito!' } : { failed: 'No se encontro el Trabajador solicitado!' })
            console.log('Trabajador cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}


module.exports = {
    createTrabajador,
    getTrabajadores,
    getTrabajadorById,
    updateTrabajador,
    changeStateTrabajador
}