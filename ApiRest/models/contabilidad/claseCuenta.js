const { sql, pushAOJParam, pushAOJOuput, queryExecute, storedProcExecute } = require('../../Utils/defaultImports');
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const baseSelect = 'SELECT IdClasCuenta,NombClasC,DescClasC,Habilitado,CreatedAt, UpdatedAt FROM CONTABILIDAD_CLASE_CUENTA';


module.exports = class ClaseCuenta {
    static async getClaseCuenta( IdClasCuenta ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdClasCuenta', sql.TinyInt, +IdClasCuenta);
        const resp = await queryExecute(baseSelect + addEqualParamInFilter('','IdClasCuenta'), aoj);
        return resp.recordset[0];
    }

    static async getClasesCuentas({NombClasC, Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( NombClasC ) {
            filter = addLikeParamInFilter(filter,'NombClasC');
            pushAOJParam(aoj,   'NombClasC',    sql.NVarChar(100),  NombClasC);
        }
        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        const resp = await queryExecute(baseSelect +  filter, aoj);
        return resp.recordset;
    }

    createClaseCuenta({NombClasC, DescClasC, IdClasCuenta}) {
        const aoj = [];

        pushAOJParam(aoj,   'NombClasC',    sql.NVarChar(100),  NombClasC);
        pushAOJParam(aoj,   'DescClasC',    sql.NVarChar(150),  DescClasC);
        pushAOJOuput(aoj,   'IdClasCuenta', sql.TinyInt);
        return storedProcExecute('USP_CREATE_CLASE_CUENTA', aoj);
    }
}