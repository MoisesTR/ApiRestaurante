const { sql, pushAOJParam, pushOutParam, storedProcExecute } = require('../Utils/defaultImports')

class SucursalModel {
    constructor() {
        this.aoj = [];
    }

    getSucursalById( IdSucursal ) {
        this.aoj = [];

        pushAOJParam(aoj, 'IdSucursal',      sql.Int,    IdSucursal)
        return storedProcExecute('USP_GET_SUCURSAL', aoj)
    }
    
    getSucursales( Habilitado ) {
        this.aoj = [];

        pushAOJParam(aoj, 'Habilitado',      sql.Int,    +Habilitado)
        return storedProcExecute('USP_GET_SUCURSALES', aoj)
    }
    
    createSucursal( data ) {
        this.aoj = [];

        pushAOJParam(aoj,    'IdRestaurante',    sql.Int,            data.IdRestaurante);
        pushAOJParam(aoj,    'NombreSucursal',   sql.NVarChar(100),  data.NombreSucursal)
        pushAOJParam(aoj,    'Direccion',        sql.NVarChar(250),  data.Direccion)
        pushAOJParam(aoj,    'Telefono1',        sql.NVarChar(20),   data.Telefono1)
        pushAOJParam(aoj,    'Telefono2',        sql.NVarChar(20),   data.Telefono2)
        return storedProcExecute('USP_CREATE_SUCURSAL', aoj)
    }
    
    updateSucursal( data ) {
        this.aoj = [];

        pushAOJParam(aoj, 'IdSucursal',          sql.Int,            data.IdSucursal)
        pushAOJParam(aoj, 'NombreSucursal',      sql.NVarChar(100),  data.NombreSucursal)
        pushAOJParam(aoj, 'Direccion',           sql.NVarChar(250),  data.Direccion)
        pushAOJParam(aoj, 'Telefono1',           sql.NVarChar(20),   data.Telefono1)
        pushAOJParam(aoj, 'Telefono2',           sql.NVarChar(20),   data.Telefono2)
        return storedProcExecute('USP_UPDATE_SUCURSAL', aoj)
    }
    
    changeStateSucursal( IdSucursal, Habilitado) {
        this.aoj = [];

        pushAOJParam(aoj, 'IdSucursal',  sql.Int,    IdSucursal);
        pushAOJParam(aoj, 'Habilitado',  sql.Bit,    +Habilitado);
        return storedProcExecute('USP_DISP_SUCURSAL', aoj)
    }
}
module.exports = SucursalModel;