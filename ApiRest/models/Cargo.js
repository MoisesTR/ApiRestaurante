const  { pushAOJOuput,sql, pushAOJParam, executeStoredProc, queryExecute } = require('../Utils/defaultImports');
const   baseSelect = '';

module.exports = class Cargo {

    static createCargo( NombCargo, DescCargo ) {
        const   aoj = [];

        pushAOJParam(aoj, 'NombCargo',   sql.NVarChar(50),  NombCargo);
        pushAOJParam(aoj, 'DescCargo',   sql.NVarChar(100), DescCargo);
        return executeStoredProc('USP_CREATE_CARGO', aoj)    
    }

    static updateCargo( IdCargo, NombCargo, DescCargo) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',     sql.Int,           IdCargo);
        pushAOJParam(aoj, 'NombCargo',   sql.NVarChar(50),  NombCargo);
        pushAOJParam(aoj, 'DescCargo',   sql.NVarChar(100), DescCargo);
        return executeStoredProc('USP_UPDATE_CARGO', aoj)
    }

    static getCargos( Habilitado ) {
        const   aoj = [];

        pushAOJParam(aoj, 'Habilitado',  sql.Bit,    +Habilitado);
        return executeStoredProc('USP_GET_CARGOS', aoj)
    }

    static getCargo( IdCargo ) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',     sql.Int,    IdCargo);
        return executeStoredProc('USP_GET_CARGO', aoj)
    }

    static changeStateCargo( IdCargo, Habilitado ) {
        const   aoj = [];

        pushAOJParam(aoj, 'IdCargo',    sql.Int,    IdCargo);
        pushAOJParam(aoj, 'Habilitado', sql.Bit,    +Habilitado);
        return executeStoredProc('USP_DISP_CARGO', aoj);
    }
}