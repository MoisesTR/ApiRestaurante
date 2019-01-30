    const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const { sql, pushAOJParam, pushAOJOuput,queryExecute, storedProcExecute } = require('../../Utils/defaultImports');
const baseSelect = `SELECT IdGrupo, G.IdClasCuenta,C.NombClasC,NombGrupo, G.Habilitado, G.CreatedAt, G.UpdatedAt 
 FROM CONTABILIDAD_GRUPO_CUENTA AS G
 INNER JOIN CONTABILIDAD_CLASE_CUENTA AS C
	ON G.IdClasCuenta = C.IdClasCuenta`;

module.exports = class GrupoCuenta {
    
    static async getGrupoCuenta( IdGrupo ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdGrupo', sql.TinyInt, +IdGrupo);

        const resp = await queryExecute(baseSelect + addEqualParamInFilter('','IdGrupo'), aoj);
        return resp.recordset[0];
    }

    static async getGruposCuentas({ IdClasCuenta, NombGrupo ,Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( IdClasCuenta ) {
            filter += addEqualParamInFilter(filter, 'IdClasCuenta', 'G.IdClasCuenta');
            pushAOJParam(aoj, 'IdClasCuenta',   sql.TinyInt,    IdClasCuenta);
        }
        
        if ( NombGrupo ) {
            filter += addLikeParamInFilter(filter, 'NombGrupo');
            pushAOJParam(aoj,   'NombGrupo',    sql.NVarChar(100),  NombGrupo);
        }

        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        Habilitado);
        }
        const resp = await queryExecute(baseSelect + filter, aoj);
        return resp.recordset;
    }

    createGrupoCuenta({ IdClasCuenta, NombGrupo }) {
        const aoj = []; 

        pushAOJParam(aoj,   'IdClasCuenta',     sql.TinyInt,    +IdClasCuenta);
        pushAOJParam(aoj,   'NombGrupo',        sql.NVarChar(100),  NombGrupo);
        pushAOJOuput(aoj,   'IdGrupo',          sql.TinyInt);
        return  storedProcExecute('USP_CREATE_GRUPO_CUENTA', aoj);
    }
}