const {mssqlErrors, matchedData, sanitize, db, sql} = require('../../Utils/defaultImports.js')

class TrabajadorModel {
    
    getTrabajadorById(req, res) {
        var data = req.params;
        var aoj = [];
        
        pushAOJParam(aoj, 'IdTrabajador', sql.Int, data.IdTrabajador);
        return storedProcExecute('USP_GET_TRABAJADOR', aoj)
    }

    getTrabajadores(req, res) {
        let data = matchedData(req,{locations:['query']});
        var aoj = [];
        
        pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado);
        pushAOJParam(aoj, 'IdSucursal', sql.Int, data.IdSucursal);
        storedProcExecute('USP_GET_TRABAJADORES', aoj)
    }
    
    createTrabajador(req, res) {
        var trabajadorData = matchedData(req, { locations: ['body'] });
        var aoj = [];
        console.log(trabajadorData)
       
        pushAOJParam(aoj, 'IdSucursal', sql.Int, trabajadorData.IdSucursal);
        pushAOJParam(aoj, 'IdCargo', sql.Int, trabajadorData.IdCargo);
        pushAOJParam(aoj, 'Nombres', sql.NVarChar(50), trabajadorData.Nombres);
        pushAOJParam(aoj, 'Apellidos', sql.NVarChar(50), trabajadorData.Apellidos);
        pushAOJParam(aoj, 'IdTipDoc', sql.Int, trabajadorData.IdTipDoc);
        pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
        pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
        pushAOJParam(aoj, 'FechaNacimiento', sql.Date(), trabajadorData.FechaNacimiento);
        pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
        pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
        pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
        pushAOJParam(aoj, 'FechaIngreso', sql.Date(), trabajadorData.FechaIngreso);
        // pushOutParam(aoj, 'IdTrabajador', sql.Int)
        return storedProcExecute('USP_CREATE_TRABAJADOR', aoj)
    }
    
     updateTrabajador(req, res) {
        var trabajadorData = matchedData(req, {locations: ['body', 'params']});
        var aoj = [];

        console.log(trabajadorData);
        pushAOJParam(aoj, 'IdTrabajador', sql.Int, trabajadorData.IdTrabajador);
        pushAOJParam(aoj, 'IdSucursal', sql.Int, trabajadorData.IdSucursal);
        pushAOJParam(aoj, 'IdCargo', sql.Int, trabajadorData.IdCargo);
        pushAOJParam(aoj, 'Nombres', sql.NVarChar(50), trabajadorData.Nombres);
        pushAOJParam(aoj, 'Apellidos', sql.NVarChar(50), trabajadorData.Apellidos);
        pushAOJParam(aoj, 'IdTipDoc', sql.Int, trabajadorData.IdTipDoc);
        pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
        pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
        pushAOJParam(aoj, 'FechaNacimiento', sql.Date, trabajadorData.FechaNacimiento);
        pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
        pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
        pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
        pushAOJParam(aoj, 'FechaIngreso', sql.Date(), trabajadorData.FechaIngreso);  
        return storedProcExecute('USP_UPDATE_TRABAJADOR', aoj)
    }
    
    changeStateTrabajador(req, res) {
        let data = matchedData(req,{locations:['query','params','body']})
        var aoj = [];
        
        console.log('Changing state')
        pushAOJParam(aoj, 'IdTrabajador',    sql.Int, data.IdTrabajador);
        pushAOJParam(aoj, 'Habilitado',      sql.Bit, +data.Habilitado);
        return storedProcExecute('USP_DISP_TRABAJADOR', aoj)
    }
}

module.exports = TrabajadorModel;