const { sql, pushAOJParam, pushAOJOuput, queryExecute, storedProcExecute } = require('../../Utils/defaultImports');
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const baseSelect = 'SELECT IdClasCuenta,NombClasC,DescClasC,Habilitado,CreatedAt, UpdatedAt FROM CONTABILIDAD_CLASE_CUENTA';


module.exports = class SubCuenta {
    static async getSubCuenta( NumSubCuenta ) {
        const aoj = [];

        pushAOJParam(aoj, 'NumSubCuenta', sql.NVarChar(6), NumSubCuenta);
        const resp = await queryExecute(baseSelect + addEqualParamInFilter('','NumSubCuenta'), aoj);
        return resp.recordset[0];
    }

    static async getSubCuentas({NumCuenta, NombSubCuenta, Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( NumCuenta ) {
            filter = addLikeParamInFilter(filter,'NumCuenta');
            pushAOJParam(aoj,   'NumCuenta',    sql.NVarChar(4),   NumCuenta);
        }
        if ( NombSubCuenta ) {
            filter = addLikeParamInFilter(filter,'NombSubCuenta');
            pushAOJParam(aoj,   'NombSubCuenta',    sql.NVarChar(100),  NombSubCuenta);
        }
        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        const resp = await queryExecute(baseSelect +  filter, aoj);
        return resp.recordset;
    }

    createSubCuenta({NumCuenta,NombSubCuenta, DescSubCuenta}) {
        const aoj = [];

        pushAOJParam(aoj,   'NumCuenta',            sql.NVarChar(4),  NumCuenta);
        pushAOJParam(aoj,   'NombSubCuenta',        sql.NVarChar(100),  NombSubCuenta);
        pushAOJParam(aoj,   'DescDescSubCuenta',    sql.NVarChar(150),  DescSubCuenta);
        pushAOJOuput(aoj,   'NumSubCuenta',         sql.NVarChar(6));
        return storedProcExecute('USP_CREATE_SUBCUENTA', aoj);
    }
    
    updateSubCuenta({NumSubCuenta, NombSubCuenta, DescSubCuenta}) {
        const aoj = [];
    
        pushAOJParam(aoj,   'NumSubCuenta',         sql.NVarChar(6),    NumSubCuenta);
        pushAOJParam(aoj,   'NombSubCuenta',        sql.NVarChar(100),  NombSubCuenta);
        pushAOJParam(aoj,   'DescDescSubCuenta',    sql.NVarChar(150),  DescSubCuenta);
        return storedProcExecute('USP_UPDATE_SUBCUENTA', aoj);
    }
}