const baseSelect = `SELECT IdProveedor,IdPais,IsProvServicio,NombProveedor,Direccion,Email,Imagen,DescProveedor,NombRepresentante,IdTipDoc,Documento,Abreviatura,Retencion2,IsMercado,Habilitado,CreatedAt,UpdatedAt
FROM PROVEEDOR`;
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports')

class ProveedorModel {
    constructor() {
        this.aoj = [];
    }
    
    async getProveedorById( IdProveedor ) {
        this.aoj    = [];
        let filter  = ' WHERE IdProveedor = @IdProveedor';

        pushAOJParam(this.aoj, 'IdProveedor', sql.Int,    IdProveedor)
        return queryExecute(baseSelect+ filter, this.aoj)
    }
    
    async getProveedores( Habilitado ) {
        this.aoj    = [];
        let filter  = '';
    
        existParam( Habilitado ) && pushAOJParam(this.aoj, 'Habilitado',  sql.Int,    +Habilitado)

        return queryExecute(baseSelect + filter, this.aoj)
    }
    
    async createProveedor( data ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdPais',                sql.Int,            data.IdPais);
        pushAOJParam(this.aoj, 'IsProvServicio',        sql.Bit,            data.IsProvServicio);
        pushAOJParam(this.aoj, 'NombProveedor',         sql.NVarChar(50),   data.NombProveedor);
        pushAOJParam(this.aoj, 'Direccion',             sql.NVarChar(200),  data.Direccion);
        pushAOJParam(this.aoj, 'Email',                 sql.NVarChar(100),  data.Email);
        pushAOJParam(this.aoj, 'Imagen',                sql.NVarChar(50),   data.Imagen);
        pushAOJParam(this.aoj, 'DescProveedor',         sql.NVarChar(200),  data.DescProveedor);
        pushAOJParam(this.aoj, 'NombRepresentante',     sql.NVarChar(200),  data.NombRepresentante)
        pushAOJParam(this.aoj, 'IdTipDoc',              sql.Int,            data.IdTipDoc);
        pushAOJParam(this.aoj, 'Documento',             sql.NVarChar(50),   data.Documento)
        pushAOJParam(this.aoj, 'Abreviatura',           sql.NVarChar(20),   data.Abreviatura);
        pushAOJParam(this.aoj, 'Retencion2',            sql.Bit,            data.Retencion2)
        pushAOJParam(this.aoj, 'IsMercado',             sql.Bit,            data.IsMercado)
        return storedProcExecute('USP_CREATE_PROVEEDOR', this.aoj)
    }
    
    async updateProveedor( data ) {
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
        pushAOJParam(this.aoj, 'Retencion2',            sql.Bit,            data.Retencion2)
        return storedProcExecute('USP_UPDATE_PROVEEDOR', this.aoj);
    }
    
    async changeStateProveedor( IdProveedor, Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdProveedor',       sql.Int(),      IdProveedor);
        pushAOJParam(this.aoj, 'Habilitado',        sql.Bit(),      +Habilitado);
        return storedProcExecute('USP_DISP_PROVEEDOR', this.aoj);
    }
    
    async createTelefonoProveedor( data ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdProveedor', sql.Int(),         data.IdProveedor);
        pushAOJParam(this.aoj, 'Nombre',      sql.NVarChar(50),  data.Nombre);
        pushAOJParam(this.aoj, 'Cargo',       sql.NVarChar(50),  data.Cargo);
        pushAOJParam(this.aoj, 'Telefono',    sql.NVarChar(15),  data.Telefono);
        pushAOJParam(this.aoj, 'Titular',     sql.Bit,           data.Titular);
        return storedProcExecute('USP_CREATE_TELEFONO_PROVEEDOR', this.aoj);
    }
    
    async changeStateTelefonoProveedor( IdTelefono, Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdTelefono', sql.Int(),   IdProveedor);
        pushAOJParam(this.aoj, 'Habilitado', sql.Bit(),   +Habilitado);
        return storedProcExecute('USP_DISP_TELEFONO_PROVEEDOR', this.aoj);
    }
}

module.exports = ProveedorModel;