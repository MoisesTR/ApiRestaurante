const { sql, pushAOJParam, pushAOJOuput, queryExecute, storedProcExecute } = require('../../Utils/defaultImports');
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const baseSelect = `SELECT IdCuenta, IdClasCuenta, IdGrupo, IdMoneda, NumCuenta, NombCuenta, DescCuenta, Habilitado, CreatedAt, UpdatedAt 
FROM CONTABILIDAD_CUENTA`

module.exports = class Cuenta {
    static async getCuenta( NumCuenta ) {
        const aoj = [];
        let filter = ' WHERE NumCuenta = @NumCuenta';

        pushAOJParam(aoj,   'NumCuenta',    sql.NVarChar(4),    NumCuenta);
        const resp = await queryExecute(baseSelect + filter, aoj);
        return resp.recordset[0];
    }

    static async getCuentas({IdClasCuenta, IdGrupo, Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( IdClasCuenta ) {
            filter += addEqualParamInFilter(filter, 'IdClasCuenta');
            pushAOJParam(aoj,   'IdClasCuenta', sql.TinyInt,    +IdClasCuenta);
        }
        if ( IdGrupo ) {
            filter += addEqualParamInFilter(filter, 'IdGrupo');
            pushAOJParam(aoj,   'IdGrupo',      sql.TinyInt,    +IdGrupo);
        }
        // if ( IdRestaurante ) {
        //     filter += addEqualParamInFilter(filter, 'IdRestaurante');
        //     pushAOJParam(aoj,   'IdRestaurante',    sql.Int,    +IdRestaurante);
        // }
        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        const resp = await queryExecute(baseSelect, aoj);
        return resp.recordset;
    }

    createCuenta({IdClasCuenta, IdGrupo, NombCuenta, DescCuenta, IdMoneda}) {
        const aoj = [];

        pushAOJParam(aoj,   'IdClasCuenta', sql.TinyInt,    IdClasCuenta);
        pushAOJParam(aoj,   'IdGrupo',      sql.TinyInt,    IdGrupo);
        // pushAOJParam(aoj,   'IdRestaurante',    sql.Int,    IdRestaurante);
        pushAOJParam(aoj,   'IdMoneda',     sql.TinyInt,    IdMoneda);
        pushAOJParam(aoj,   'NombCuenta',   sql.NVarChar(100),  NombCuenta);
        pushAOJParam(aoj,   'DescCuenta',   sql.NVarChar(150),  DescCuenta);
        pushAOJOuput(aoj,   'NumCuenta',    sql.NVarChar(4));
        return storedProcExecute('USP_CREATE_CUENTA', aoj);
    }
    
    updateCuenta({ NumCuenta, NombCuenta, DescCuenta}) {
        const aoj = [];
        
        // pushAOJParam(aoj,   'IdRestaurante',sql.Int,        IdRestaurante);
        pushAOJParam(aoj,   'NumCuenta',    sql.NVarChar(4), NumCuenta);
        pushAOJParam(aoj,   'NombCuenta',   sql.NVarChar(100),  NombCuenta);
        pushAOJParam(aoj,   'DescCuenta',   sql.NVarChar(150),  DescCuenta);
        return storedProcExecute('USP_UPDATE_CONTABILIDAD_CUENTA', aoj);
    }
}