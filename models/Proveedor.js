const statement = require('../sqlStatement/proveedorStatement');

const baseSelect = statement.SELECT_PROVEEDOR;
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports')

class ProveedorModel {
    constructor() {
        this.aoj = [];
    }
    
    getProveedorById( IdProveedor ) {
        this.aoj    = [];

        pushAOJParam(this.aoj,    'IdProveedor',        sql.Int,    IdProveedor);
        return  storedProcExecute('USP_GET_PROVEEDOR_BY_ID', this.aoj);
    }
    
    getProveedores( Habilitado ) {
        this.aoj    = [];

        pushAOJParam(this.aoj, 'Habilitado',  sql.Bit,    +Habilitado);

        return storedProcExecute('dbo.USP_GET_PROVEEDORES', this.aoj)
    }
    
    createProveedor( data ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdPais',                sql.Int,            data.IdPais);
        pushAOJParam(this.aoj, 'IsProvServicio',        sql.Bit,            +data.IsProvServicio);
        pushAOJParam(this.aoj, 'NombProveedor',         sql.NVarChar(50),   data.NombProveedor);
        pushAOJParam(this.aoj, 'Direccion',             sql.NVarChar(200),  data.Direccion);
        pushAOJParam(this.aoj, 'Email',                 sql.NVarChar(100),  data.Email);
        pushAOJParam(this.aoj, 'Imagen',                sql.NVarChar(50),   data.Imagen);
        pushAOJParam(this.aoj, 'DescProveedor',         sql.NVarChar(200),  data.DescProveedor);
        pushAOJParam(this.aoj, 'NombRepresentante',     sql.NVarChar(200),  data.NombRepresentante)
        pushAOJParam(this.aoj, 'IdTipDoc',              sql.Int,            data.IdTipDoc);
        pushAOJParam(this.aoj, 'Documento',             sql.NVarChar(50),   data.Documento)
        pushAOJParam(this.aoj, 'Abreviatura',           sql.NVarChar(20),   data.Abreviatura);
        pushAOJParam(this.aoj, 'IsMercado',             sql.Bit,            +data.IsMercado)
        return storedProcExecute('USP_CREATE_PROVEEDOR', this.aoj)
    }
    
    updateProveedor( data ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdProveedor',           sql.Int(),          data.IdProveedor);
        pushAOJParam(this.aoj, 'IdPais',                sql.Int,            data.IdPais);
        pushAOJParam(this.aoj, 'IsMercado',             sql.Bit,            data.IsMercado)
        pushAOJParam(this.aoj, 'NombProveedor',         sql.NVarChar(50),   data.NombProveedor);
        pushAOJParam(this.aoj, 'Direccion',             sql.NVarChar(200),  data.Direccion);
        pushAOJParam(this.aoj, 'Email',                 sql.NVarChar(100),  data.Email);
        pushAOJParam(this.aoj, 'DescProveedor',         sql.NVarChar(200),  data.DescProveedor);
        pushAOJParam(this.aoj, 'NombRepresentante',     sql.NVarChar(200),  data.NombRepresentante)
        pushAOJParam(this.aoj, 'IdTipDoc',              sql.Int,            data.IdTipDoc);
        pushAOJParam(this.aoj, 'Documento',             sql.NVarChar(50),   data.Documento)
        pushAOJParam(this.aoj, 'Abreviatura',           sql.NVarChar(20),   data.Abreviatura);
        return storedProcExecute('USP_UPDATE_PROVEEDOR', this.aoj);
    }
    
    changeStateProveedor( IdProveedor, Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdProveedor',       sql.Int(),      IdProveedor);
        pushAOJParam(this.aoj, 'Habilitado',        sql.Bit(),      +Habilitado);
        return storedProcExecute('USP_DISP_PROVEEDOR', this.aoj);
    }
    
    createTelefonoProveedor( data ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdProveedor',       sql.Int(),         data.IdProveedor);
        pushAOJParam(this.aoj, 'NombPAsignada',     sql.NVarChar(50),  data.NombPAsignada);
        pushAOJParam(this.aoj, 'Cargo',             sql.NVarChar(50),  data.Cargo);
        pushAOJParam(this.aoj, 'Extension',         sql.NVarChar(10),  data.Extension);
        pushAOJParam(this.aoj, 'Telefono',          sql.NVarChar(15),  data.Telefono);
        pushAOJParam(this.aoj, 'IsTitular',         sql.Bit,           +data.IsTitular);
        return storedProcExecute('USP_CREATE_TELEFONO_PROVEEDOR', this.aoj);
    }
    
    changeStateTelefonoProveedor( IdTelefono, Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdTelefono', sql.Int(),   IdTelefono);
        pushAOJParam(this.aoj, 'Habilitado', sql.Bit(),   +Habilitado);
        return storedProcExecute('USP_DISP_TELEFONO_PROVEEDOR', this.aoj);
    }
}

module.exports = ProveedorModel;