const { sql, pushAOJParam, storedProcExecute } = require('../Utils/defaultImports');

class ProductoModel {

    constructor() {
        this.aoj = [];
    }
    
    async getProductoById( IdProducto ) {
        this.aoj = [];

        pushAOJParam(aoj, 'IdProducto',      sql.Int,    IdProducto)
        return  storedProcExecute('dbo.USP_GET_PRODUCTO', aoj)
    }
    
    async getProductos( Habilitado ) {
        this.aoj = [];

        pushAOJParam(aoj, 'Habilitado',      sql.Int,     +Habilitado)
        return storedProcExecute('USP_GET_PRODUCTOS', aoj)
    }
    
    async createProducto( data ) {
        this.aoj = [];

        pushAOJParam(aoj, 'IdProveedor',         sql.Int,     data.IdProveedor)
        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,     data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdEstado',            sql.Int,        data.IdEstado)
        pushAOJParam(aoj, 'NombreProducto',      sql.NVarChar(50), data.NombreProducto)
        pushAOJParam(aoj, 'Descripcion',         sql.NVarChar(200), data.Descripcion)
        pushAOJParam(aoj, 'Imagen',              sql.NVarChar(100), data.Imagen);
        pushAOJParam(aoj, 'IdEnvase',            sql.Int,        data.IdEnvase);
        pushAOJParam(aoj, 'IdEmpaque',           sql.Int,        data.IdEmpaque);
        pushAOJParam(aoj, 'IdUnidadMedida',      sql.Int,        data.IdUnidadMedida);
        pushAOJParam(aoj, 'ValorUnidadMedida',   sql.Numeric(10, 5), data.ValorUnidadMedida)
        pushAOJParam(aoj, 'CantidadEmpaque',     sql.Int,            data.CantidadEmpaque);
        pushAOJParam(aoj, 'DiasRotacion',        sql.Int,            data.DiasRotacion);
        pushAOJParam(aoj, 'IdTipoInsumo',        sql.Int,            data.IdTipoInsumo);
        pushAOJParam(aoj, 'CodigoProducto',      sql.NVarChar(200), data.CodigoProducto);
        pushAOJParam(aoj, 'CodigoInterno',       sql.NVarChar(200), data.CodigoInterno);
        pushAOJParam(aoj, 'CodigoBarra',         sql.NVarChar(200), data.CodigoBarra);
        return  storedProcExecute('dbo.USP_CREATE_PRODUCTO', aoj)
    }
    
    async updateProducto( data ) {
        this.aoj = [];
        
        pushAOJParam(aoj, 'IdProveedor',         sql.Int,            data.IdProveedor)
        pushAOJParam(aoj, 'IdProducto',          sql.Int,            data.IdProducto)
        pushAOJParam(aoj, 'IdCategoria',         sql.Int,            data.IdCategoria)
        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,            data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdEstado',            sql.Int,            data.IdEstado)
        pushAOJParam(aoj, 'NombreProducto',      sql.NVarChar(50),   data.NombreProducto)
        pushAOJParam(aoj, 'Descripcion',         sql.NVarChar(200),  data.Descripcion)
        pushAOJParam(aoj, 'Imagen',              sql.NVarChar(100),  data.Imagen)
        pushAOJParam(aoj, 'IdEnvase',            sql.Int,            data.IdEnvase);
        pushAOJParam(aoj, 'IdEmpaque',           sql.Int,            data.IdEmpaque);
        pushAOJParam(aoj, 'IdUnidadMedida',      sql.Int,            data.IdUnidadMedida);
        pushAOJParam(aoj, 'ValorUnidadMedida',   sql.Numeric(10, 5), data.ValorUnidadMedida);
        pushAOJParam(aoj, 'CantidadEmpaque',     sql.Int,            data.CantidadEmpaque);
        pushAOJParam(aoj, 'DiasRotacion',        sql.Int,            data.DiasCaducidad);
        pushAOJParam(aoj, 'TipoInsumo',          sql.Int,            data.TipoInsumo);
        pushAOJParam(aoj, 'CodigoProducto',      sql.NVarChar(200),  data.CodigoProducto);
        pushAOJParam(aoj, 'CodigoInterno',       sql.NVarChar(200),  data.CodigoInterno);
        pushAOJParam(aoj, 'CodigoBarra',         sql.NVarChar(200),  data.CodigoBarra);
        return  storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
    }
    
    async changeStateProducto( IdProducto, Habilitado ) {
        this.aoj = [];
        pushAOJParam(aoj, 'IdProducto', sql.Int(),   IdProducto)
        pushAOJParam(aoj, 'Habilitado', sql.Bit(),   +Habilitado)
        return  storedProcExecute('USP_DISP_PRODUCTO', aoj)
    }
}

module.exports = ProductoModel;