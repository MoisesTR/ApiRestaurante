const db                        = require('../services/database');
const sql                       = require('mssql');

class SucursalModel {
    constructor() {
        this.aoj = [];
    }
    async getSucursalById( IdSucursal ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdSucursal',      sql.Int,    IdSucursal)
        return db.storedProcExecute('USP_GET_SUCURSAL', aoj)
    }
    
    async getSucursales( Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'Habilitado',      sql.Int,    +Habilitado)
        return db.storedProcExecute('USP_GET_SUCURSALES', aoj)
    }
    
    async createSucursal( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj,    'IdRestaurante',    sql.Int,            data.IdRestaurante);
        db.pushAOJParam(aoj,    'NombreSucursal',   sql.NVarChar(100),  data.NombreSucursal)
        db.pushAOJParam(aoj,    'Direccion',        sql.NVarChar(250),  data.Direccion)
        db.pushAOJParam(aoj,    'Telefono1',        sql.NVarChar(20),   data.Telefono1)
        db.pushAOJParam(aoj,    'Telefono2',        sql.NVarChar(20),   data.Telefono2)
        return db.storedProcExecute('USP_CREATE_SUCURSAL', aoj)
    }
    
    async updateSucursal( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdSucursal',          sql.Int,            data.IdSucursal)
        db.pushAOJParam(aoj, 'NombreSucursal',      sql.NVarChar(100),  data.NombreSucursal)
        db.pushAOJParam(aoj, 'Direccion',           sql.NVarChar(250),  data.Direccion)
        db.pushAOJParam(aoj, 'Telefono1',           sql.NVarChar(20),   data.Telefono1)
        db.pushAOJParam(aoj, 'Telefono2',           sql.NVarChar(20),   data.Telefono2)
        return db.storedProcExecute('USP_UPDATE_SUCURSAL', aoj)
    }
    
    async changeStateSucursal( IdSucursal, Habilitado) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdSucursal',  sql.Int,    IdSucursal);
        db.pushAOJParam(aoj, 'Habilitado',  sql.Bit,    +Habilitado);
        return db.storedProcExecute('USP_DISP_SUCURSAL', aoj)
    }
}
module.exports = SucursalModel;