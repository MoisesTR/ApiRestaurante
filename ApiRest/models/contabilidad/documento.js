const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const { sql, pushAOJParam, pushAOJOuput,queryExecute, storedProcExecute } = require('../../Utils/defaultImports')
const baseSelect = 'SELECT IdTipDoc,NombTipDoc, DescTipDoc, Enabled,CreatedAt,UpdatedAt FROM CONTABILIDAD_TIPO_DOCUMENTO';

module.exports = class Documento {
    static async getDocumento( IdDocumento ) {
        const aoj = [];

        pushAOJParam(aoj,   'IdDocumento',  sql.TinyInt,    IdDocumento);
        return queryExecute(baseSelect +  addEqualParamInFilter('','IdDocumento'), aoj)
    }

    static async getDocumentos({IdRestaurante, IdSucursal, IdMoneda, Serie, Habilitado}) {
        const aoj = [];
        let filter = '';

        if (IdRestaurante ) {
            filter +=  addEqualParamInFilter(filter, 'IdRestaurante');
            pushAOJParam(aoj,   'IdRestaurante',    sql.Int,        IdRestaurante);
        }
        if ( IdSucursal ) {
            filter += addEqualParamInFilter(filter, 'IdSucursal');
            pushAOJParam(aoj,   'IdSucursal',       sql.Int,        IdSucursal);
        }
        if ( IdMoneda ) {
            filter += addEqualParamInFilter(filter, 'IdMoneda');
            pushAOJParam(aoj,   'IdMoneda',         sql.TinyInt,    IdMoneda);
        }
        if ( Serie  ) {
            filter  +=  addEqualParamInFilter(filter, 'Serie');
            pushAOJParam(aoj,   'Serie',            sql.NVarChar(10),   Serie);
        }
        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        return queryExecute(baseSelect + filter, aoj);
    }

    createDocumento({IdTipDoc, IdRestaurante, IdSucursal, IdMoneda, Serie, NumDoc, NombDoc, DescDoc}, tran) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTipDoc',   sql.TinyInt,    IdTipDoc);
        pushAOJParam(aoj, 'IdRestaurante', sql.Int,     IdRestaurante);
        pushAOJParam(aoj, 'IdSucursal', sql.Int,    IdSucursal);
        pushAOJParam(aoj, 'IdMoneda',   sql.TinyInt, IdMoneda);
        pushAOJParam(aoj, 'Serie',      sql.NVarChar(10),   Serie);
        pushAOJParam(aoj, 'NumDoc',     sql.Int,    NumDoc);
        pushAOJParam(aoj, 'NombDoc',    sql.NVarChar(50),   NombDoc);
        pushAOJParam(aoj, 'DescDoc',    sql.NVarChar(150),  DescDoc)
        pushAOJOuput(aoj, 'IdDocumento',    sql.TinyInt);
        return storedProcExecute('USP_CREATE_CONTABILIDAD_DOCUMENTO', aoj);
    }

    updateDocumento({IdDocumento, IdSucursal, IdMoneda, NombDoc, DescDoc}) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdDocumento',    sql.TinyInt,    IdDocumento);
        pushAOJParam(aoj, 'IdSucursal', sql.Int,            IdSucursal);
        pushAOJParam(aoj, 'IdMoneda',   sql.TinyInt,        IdMoneda);
        pushAOJParam(aoj, 'NombDoc',    sql.NVarChar(50),   NombDoc);
        pushAOJParam(aoj, 'DescDoc',    sql.NVarChar(150),  DescDoc)
        return storedProcExecute('USP_UPDATE_CONTABILIDAD_DOCUMENTO', aoj);
    }
}