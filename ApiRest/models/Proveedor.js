const db = require('../services/database');
const sql = require('mssql');

class ProveedorModel {
    constructor() {
        this.aoj = [];
    }
    
    async getProveedorById( IdProveedor ) {
        this.aoj    = [];

        db.pushAOJParam(aoj, 'IdProveedor', sql.Int,    IdProveedor)
        return db.storedProcExecute('USP_GET_PROVEEDOR', aoj)
    }
    
    async getProveedores( Habilitado ) {
        this.aoj = [];
    
        db.pushAOJParam(aoj, 'Habilitado',  sql.Int,    +Habilitado)
        return db.storedProcExecute('USP_GET_PROVEEDORES', aoj)
    }
    
    async createProveedor( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'NombProveedor',       sql.NVarChar(50),   data.NombreProveedor);
        db.pushAOJParam(aoj, 'Direccion',           sql.NVarChar(200),  data.Direccion);
        db.pushAOJParam(aoj, 'Email',               sql.NVarChar(100),  data.Email);
        db.pushAOJParam(aoj, 'DescProveedor',       sql.NVarChar(200),  data.Descripcion)
        db.pushAOJParam(aoj, 'NombRepresentante',   sql.NVarChar(200),  data.NombreRepresentante)
        db.pushAOJParam(aoj, 'Documento',           sql.NVarChar(50),   data.Documento)
        db.pushAOJParam(aoj, 'Telefono2',           sql.NVarChar(20),   data.Telefono2)
        db.pushAOJParam(aoj, 'Telefono1',           sql.NVarChar(20),   data.Telefono1)
        db.pushAOJParam(aoj, 'Retencion2',          sql.Bit,            data.Retencion2)
        db.pushAOJParam(aoj, 'IsMercado',           sql.Bit,            data.Mercado)
        return db.storedProcExecute('USP_CREATE_PROVEEDOR', aoj)
    }
    
    async updateProveedor( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdProveedor',         sql.Int, data.IdProveedor)
        db.pushAOJParam(aoj, 'NombreProveedor',     sql.NVarChar(50), data.NombreProveedor);
        db.pushAOJParam(aoj, 'Direccion',           sql.NVarChar(200), data.Direccion);
        db.pushAOJParam(aoj, 'Email',               sql.NVarChar(100), data.Email);
        db.pushAOJParam(aoj, 'Descripcion',         sql.NVarChar(200), data.Descripcion)
        db.pushAOJParam(aoj, 'NombreRepresentante', sql.NVarChar(200), data.NombreRepresentante)
        db.pushAOJParam(aoj, 'Documento',           sql.NVarChar(20), data.Documento)
        db.pushAOJParam(aoj, 'Telefono1',           sql.NVarChar(200), data.Telefono1)
        db.pushAOJParam(aoj, 'Telefono2',           sql.NVarChar(200), data.Telefono2)
        db.pushAOJParam(aoj, 'Retencion2',          sql.Int, data.Retencion2)
        return db.storedProcExecute('USP_UPDATE_PROVEEDOR', aoj);
    }
    
    async changeStateProveedor( IdProveedor, Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdProveedor',     sql.Int(),  IdProveedor);
        db.pushAOJParam(aoj, 'Habilitado',      sql.Bit(), +Habilitado);
        return db.storedProcExecute('USP_DISP_PROVEEDOR', aoj);
    }
    
    async createTelefonoProveedor( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdProveedor', sql.Int(), data.IdProveedor);
        db.pushAOJParam(aoj, 'Nombre',      sql.NVarChar(50), data.Nombre);
        db.pushAOJParam(aoj, 'Cargo',       sql.NVarChar(50), data.Cargo);
        db.pushAOJParam(aoj, 'Telefono',    sql.NVarChar(15), data.Telefono);
        db.pushAOJParam(aoj, 'Titular',     sql.Bit, data.Titular);
        return db.storedProcExecute('USP_CREATE_TELEFONO_PROVEEDOR', aoj);
    }
    
    async changeStateTelefonoProveedor( IdTelefono, Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdTelefono', sql.Int(),   IdProveedor);
        db.pushAOJParam(aoj, 'Habilitado', sql.Bit(),   +Habilitado);
        return db.storedProcExecute('USP_DISP_TELEFONO_PROVEEDOR', aoj);
    }
}

module.exports = ProveedorModel;