const  { whereHabilitadoFilter,sql, pushAOJParam, executeStoredProc, queryExecute } = require('../Utils/defaultImports');
const   baseSelect = `SELECT IdCargo,NombCargo,DescCargo,Habilitado,CreatedAt,UpdatedAt 
        FROM CARGO_TRABAJADOR `;

module.exports = class Cargo {

    static createCargo( NombCargo, DescCargo, CodCargo ) {
        const   aoj = [];

        pushAOJParam(aoj, 'NombCargo',  sql.NVarChar(50),   NombCargo);
        pushAOJParam(aoj, 'DescCargo',  sql.NVarChar(100),  DescCargo);
        pushAOJParam(aoj, 'CodCargo',   sql.NVarChar(4),    CodCargo);
        return executeStoredProc('USP_CREATE_CARGO', aoj)    
    }

    static updateCargo( IdCargo, NombCargo, DescCargo, CodCargo) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',        sql.Int,            IdCargo);
        pushAOJParam(aoj, 'NombCargo',      sql.NVarChar(50),   NombCargo);
        pushAOJParam(aoj, 'DescCargo',      sql.NVarChar(100),  DescCargo);
        pushAOJParam(aoj, 'CodCargo',       sql.NVarChar(4),    CodCargo);
        return executeStoredProc('USP_UPDATE_CARGO', aoj)
    }

    static getCargos( Habilitado ) {
        const   aoj = [];

        if ( Habilitado !== undefined ) {
            pushAOJParam(aoj, 'Habilitado',  sql.Bit,    +Habilitado);
        }
        return queryExecute(baseSelect + ((Habilitado !== undefined) ? whereHabilitadoFilter : ''), aoj)
    }

    static getCargo( IdCargo ) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',     sql.Int,    IdCargo);
        return queryExecute(baseSelect + ' WHERE IdCargo = @IdCargo', aoj)
    }

    static changeStateCargo( IdCargo, Habilitado ) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',    sql.Int,    IdCargo);
        pushAOJParam(aoj, 'Habilitado', sql.Bit,    +Habilitado);
        return executeStoredProc('USP_DISP_CARGO', aoj);
    }
}