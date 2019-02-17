const { sql, pushAOJParam, queryExecute,storedProcExecute } = require('../Utils/defaultImports');
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../Utils/util');

class ProductoModel {
    getProductoById( IdProducto ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdProducto',      sql.Int,    IdProducto)
        return  storedProcExecute('dbo.USP_GET_PRODUCTO', aoj)
    }
    
    static getProductos( {Habilitado, IdProveedor, IdTipInsumo, IsGranel} ) {
        const aoj = [];
        let     filter = '';

        if ( !!IdProveedor ) {
            filter += addEqualParamInFilter(filter, 'IdProveedor');
            pushAOJParam(aoj,   'IdProveedor',      sql.Int,    IdProveedor);
        }
        if ( !!IdTipInsumo ) {
            filter += addEqualParamInFilter(filter, 'IdTipInsumo');
            pushAOJParam(aoj,   'IdTipInsumo',      sql.Int,    IdTipInsumo);
        }
        if ( !!IsGranel ) {
            filter +=  addEqualParamInFilter(filter, 'IsGranel');
            pushAOJParam(aoj,   'IsGranel',     sql.Bit,    +IsGranel);
        }
        if ( undefined !== Habilitado ) {
            filter  += addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',       sql.Bit,    +Habilitado);
        }
        return queryExecute('SELECT * FROM VIEW_BASIC_GET_PRODUCT' + filter, aoj)
    }

    static getProductosByIdProveedor(IdProveedor) {
        let aoj = [];

        pushAOJParam(aoj, 'IdProveedor',       sql.Int,        IdProveedor);
        return storedProcExecute('USP_GET_PRODUCTOS_PROVEEDOR',aoj)
    }
    
    createProducto( data ) {
        const aoj = [];
        console.log(+data.IsGranel);
        console.log(data);
        pushAOJParam(aoj, 'IdProveedor',        sql.Int,            data.IdProveedor)
        pushAOJParam(aoj, 'IdSubClasificacion', sql.Int,            data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdEstado',           sql.Int,            data.IdEstado);
        pushAOJParam(aoj, 'NombProducto',       sql.NVarChar(50),   data.NombProducto);
        pushAOJParam(aoj, 'DescProducto',       sql.NVarChar(200),  data.DescProducto);
        pushAOJParam(aoj, 'Imagen',             sql.NVarChar(100),  data.Imagen);
        pushAOJParam(aoj, 'IdEnvase',           sql.Int,            data.IdEnvase);
        pushAOJParam(aoj, 'IdEmpaque',          sql.Int,            data.IdEmpaque);
        pushAOJParam(aoj, 'IsGranel',           sql.Bit(),            +data.IsGranel);
        pushAOJParam(aoj, 'IdUnidadMedida',     sql.Int,            data.IsGranel  ? null : data.IdUnidadMedida);
        pushAOJParam(aoj, 'ValorUnidadMedida',  sql.Numeric(10, 5), data.IsGranel  ? null : data.ValorUnidadMedida)
        pushAOJParam(aoj, 'CantidadEmpaque',    sql.Int,            data.CantidadEmpaque);
        pushAOJParam(aoj, 'DiasRotacion',       sql.Int,            data.DiasRotacion);
        pushAOJParam(aoj, 'IdTipInsumo',        sql.Int,            data.IdTipInsumo);
        pushAOJParam(aoj, 'CodOriginal',        sql.NVarChar(25),   data.CodOriginal);
        pushAOJParam(aoj, 'CodProd',            sql.NVarChar(25),   data.CodProd);
        pushAOJParam(aoj, 'CodBarra',           sql.NVarChar(200),  data.CodBarra);
        return  storedProcExecute('dbo.USP_CREATE_PRODUCTO', aoj)
    }
    
    updateProducto( data ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdProveedor',        sql.Int,            data.IdProveedor)
        pushAOJParam(aoj, 'IdProducto',         sql.Int,            data.IdProducto)
        pushAOJParam(aoj, 'IdCategoria',        sql.Int,            data.IdCategoria)
        pushAOJParam(aoj, 'IdSubClasificacion', sql.Int,            data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdEstado',           sql.Int,            data.IdEstado)
        pushAOJParam(aoj, 'NombProducto',       sql.NVarChar(50),   data.NombProducto)
        pushAOJParam(aoj, 'DescProducto',       sql.NVarChar(200),  data.DescProducto)
        pushAOJParam(aoj, 'Imagen',             sql.NVarChar(100),  data.Imagen)
        pushAOJParam(aoj, 'IdEnvase',           sql.Int,            data.IdEnvase);
        pushAOJParam(aoj, 'IdEmpaque',          sql.Int,            data.IdEmpaque);
        pushAOJParam(aoj, 'IdUnidadMedida',     sql.Int,            data.IdUnidadMedida);
        pushAOJParam(aoj, 'ValorUnidadMedida',  sql.Numeric(10, 5), data.ValorUnidadMedida);
        pushAOJParam(aoj, 'CantidadEmpaque',    sql.Int,            data.CantidadEmpaque);
        pushAOJParam(aoj, 'DiasRotacion',       sql.Int,            data.DiasCaducidad);
        pushAOJParam(aoj, 'TipoInsumo',         sql.Int,            data.TipoInsumo);
        pushAOJParam(aoj, 'CodOriginal',        sql.NVarChar(200),  data.CodOriginal);
        pushAOJParam(aoj, 'CodProd',            sql.NVarChar(200),  data.CodProd);
        pushAOJParam(aoj, 'CodBarra',           sql.NVarChar(200),  data.CodBarra);
        return  storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
    }
    
    changeStateProducto( IdProducto, Habilitado ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdProducto', sql.Int(),   IdProducto)
        pushAOJParam(aoj, 'Habilitado', sql.Bit(),   +Habilitado)
        return  storedProcExecute('USP_DISP_PRODUCTO', aoj)
    }
}

module.exports = ProductoModel;