let sql     = require('mssql');
let db      = require('../services/database');

class ProductoModel {

    constructor() {
        this.aoj = [];
    }
    
    async getProductoById( IdProducto ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdProducto',      sql.Int,    IdProducto)
        return  db.storedProcExecute('dbo.USP_GET_PRODUCTO', aoj)
    }
    
    async getProductos( Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'Habilitado',      sql.Int,     +Habilitado)
        return db.storedProcExecute('USP_GET_PRODUCTOS', aoj)
    }
    
    async createProducto( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdProveedor',         sql.Int,     data.IdProveedor)
        db.pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,     data.IdSubClasificacion)
        db.pushAOJParam(aoj, 'IdEstado',            sql.Int,        data.IdEstado)
        db.pushAOJParam(aoj, 'NombreProducto',      sql.NVarChar(50), data.NombreProducto)
        db.pushAOJParam(aoj, 'Descripcion',         sql.NVarChar(200), data.Descripcion)
        db.pushAOJParam(aoj, 'Imagen',              sql.NVarChar(100), data.Imagen);
        db.pushAOJParam(aoj, 'IdEnvase',            sql.Int,        data.IdEnvase);
        db.pushAOJParam(aoj, 'IdEmpaque',           sql.Int,        data.IdEmpaque);
        db.pushAOJParam(aoj, 'IdUnidadMedida',      sql.Int,        data.IdUnidadMedida);
        db.pushAOJParam(aoj, 'ValorUnidadMedida',   sql.Numeric(10, 5), data.ValorUnidadMedida)
        db.pushAOJParam(aoj, 'CantidadEmpaque',     sql.Int,            data.CantidadEmpaque);
        db.pushAOJParam(aoj, 'DiasRotacion',        sql.Int,            data.DiasRotacion);
        db.pushAOJParam(aoj, 'IdTipoInsumo',        sql.Int,            data.IdTipoInsumo);
        db.pushAOJParam(aoj, 'CodigoProducto',      sql.NVarChar(200), data.CodigoProducto);
        db.pushAOJParam(aoj, 'CodigoInterno',       sql.NVarChar(200), data.CodigoInterno);
        db.pushAOJParam(aoj, 'CodigoBarra',         sql.NVarChar(200), data.CodigoBarra);
        return  db.storedProcExecute('dbo.USP_CREATE_PRODUCTO', aoj)
    }
    
    async updateProducto( data ) {
        this.aoj = [];
        
        db.pushAOJParam(aoj, 'IdProveedor',         sql.Int,            data.IdProveedor)
        db.pushAOJParam(aoj, 'IdProducto',          sql.Int,            data.IdProducto)
        db.pushAOJParam(aoj, 'IdCategoria',         sql.Int,            data.IdCategoria)
        db.pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,            data.IdSubClasificacion)
        db.pushAOJParam(aoj, 'IdEstado',            sql.Int,            data.IdEstado)
        db.pushAOJParam(aoj, 'NombreProducto',      sql.NVarChar(50),   data.NombreProducto)
        db.pushAOJParam(aoj, 'Descripcion',         sql.NVarChar(200),  data.Descripcion)
        db.pushAOJParam(aoj, 'Imagen',              sql.NVarChar(100),  data.Imagen)
        db.pushAOJParam(aoj, 'IdEnvase',            sql.Int,            data.IdEnvase);
        db.pushAOJParam(aoj, 'IdEmpaque',           sql.Int,            data.IdEmpaque);
        db.pushAOJParam(aoj, 'IdUnidadMedida',      sql.Int,            data.IdUnidadMedida);
        db.pushAOJParam(aoj, 'ValorUnidadMedida',   sql.Numeric(10, 5), data.ValorUnidadMedida);
        db.pushAOJParam(aoj, 'CantidadEmpaque',     sql.Int,            data.CantidadEmpaque);
        db.pushAOJParam(aoj, 'DiasRotacion',        sql.Int,            data.DiasCaducidad);
        db.pushAOJParam(aoj, 'TipoInsumo',          sql.Int,            data.TipoInsumo);
        db.pushAOJParam(aoj, 'CodigoProducto',      sql.NVarChar(200),  data.CodigoProducto);
        db.pushAOJParam(aoj, 'CodigoInterno',       sql.NVarChar(200),  data.CodigoInterno);
        db.pushAOJParam(aoj, 'CodigoBarra',         sql.NVarChar(200),  data.CodigoBarra);
        return  db.storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
    }
    
    async changeStateProducto( IdProducto, Habilitado ) {
        this.aoj = [];
        db.pushAOJParam(aoj, 'IdProducto', sql.Int(),   IdProducto)
        db.pushAOJParam(aoj, 'Habilitado', sql.Bit(),   +Habilitado)
        return  db.storedProcExecute('USP_DISP_PRODUCTO', aoj)
    }
}

module.exports = ProductoModel;