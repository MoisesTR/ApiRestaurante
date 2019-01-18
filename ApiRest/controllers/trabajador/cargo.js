const {mssqlErrors, matchedData, db, sql} = require('../../Utils/defaultImports.js')
const CargoModel = require('../../models/Cargo');

function createCargo(req, res) {
    const data = matchedData(req);
    
    CargoModel.createCargo( data.NombCargo, data.DescCargo )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    })
}

function getCargos(req, res) {
    const data = matchedData(req,{locations:['query']});
    
    CargoModel.getCargos( data.Habilitado )
    .then((results) => {
        res.status(200).json({
            cargos: results.recordset
        })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function updateCargo(req, res) {
    const data = matchedData(req, {locations: ['body','params']});
   

    CargoModel.updateCargo( data.IdCargo, data.NombCargo, data.DescCargo )
    .then((results) => {
        const afectadas = results.rowsAffected[0];
        res.status(200)
            .json((afectadas > 0) ? { success: 'Cargo modificado con exito!' } : { failed: 'No se encontro el Cargo solicitado!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getCargoById(req, res) {
    const data = req.params;
    
    CargoModel.getCargo( data.IdCargo )
    .then((results) => {
        res.status(200).json({ cargo: results.recordset[0] })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateCargo(req, res) {
    const data = matchedData(req,{locations:['params','query','body']});
    
   
    CargoModel.changeStateCargo( data.IdCargo, data.Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion =( data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Cargo ' + accion + ' con exito!' } : { failed: 'No se encontro el producto solicitado!' })
        console.log('Cargo cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createCargo,
    getCargoById,
    getCargos,
    updateCargo,
    changeStateCargo
}