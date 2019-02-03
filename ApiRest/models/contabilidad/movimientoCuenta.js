const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const { sql, pushAOJParam,pushAOJOuput, queryExecute, storedProcExecute } = require('../../Utils/defaultImports')
const baseSelect =`SELECT IdMovimiento, NumSubCuenta, IdDocumento,IdMoneda, FechaMovimiento, Debe, DebeMonLocal, Haber, HaberMonLocal, Habilitado, CreatedAt, UpdatedAt 
FROM CONTABILIDAD_MOVIMIENTO_SUBCUENTA`;
const baseUpdate = `UPDATE CONTABILIDAD_MOVIMIENTO_SUBCUENTA SET Habilitado = @Habilitado, UpdatedAt = GETDATE()`;
const baseDelete = 'DELETE FROM CONTABILIDAD_MOVIMIENTO_SUBCUENTA';

module.exports = class MovimientoSubCuenta {
    static async getMovimientoCuenta( ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdMovimiento',       sql.Int,    IdMovimiento)
        const response = await queryExecute( baseSelect + addEqualParamInFilter('','IdMovimiento'), aoj)
        return response.recordset[0];
    }   

    static async getMovimientosCuenta({NumSubCuenta, IdDocumento, IdMoneda, FechaMovimiento, FechaMin, FechaMax}) {
        const aoj = [];

        if ( NumSubCuenta ) {
            filter +=  addEqualParamInFilter(filter, 'NumSubCuenta');
            pushAOJParam(aoj, 'NumSubCuenta' ,       sql.NVarChar(6),   NumSubCuenta)
        }
        if ( IdDocumento ) {
            filter +=  addEqualParamInFilter(filter, 'IdDocumento');
            pushAOJParam(aoj, 'IdDocumento' ,       sql.Int,IdDocumento)
        }
        if ( IdMoneda ) {
            filter += addEqualParamInFilter(filter, 'IdMoneda');
            pushAOJParam(aoj, 'IdMoneda'    ,       sql.TinyIntNYINT,IdMoneda)
        }
        if ( FechaMovimiento ) {
            filter +=  addEqualParamInFilter(filter, 'FechaMovimiento');
            pushAOJParam(aoj, 'FechaMovimiento' ,   sql.SmallDateTime(),FechaMovimiento)
        }
        if ( FechaMin ) {
            filter +=  addEqualParamInFilter(filter, 'FechaMin');
            pushAOJParam(aoj, 'FechaMin' ,   sql.SmallDateTime(),   FechaMin);
        }
        if ( FechaMax ) {
            filter +=  addEqualParamInFilter(filter, 'FechaMax');
            pushAOJParam(aoj, 'FechaMax' ,   sql.SmallDateTime(),   FechaMax);
        }
        const response = await queryExecute(baseSelect + filter, aoj);
        return response.recordset;
    }

    createMovimiento({NumSubCuenta, IdDocumento,FechaMovimiento,IdMoneda, Debe, DebeMonLocal, Haber, HaberMonLocal}, conn) {
        const aoj = [];
        
        pushAOJOuput(aoj, 'IdMovimiento',       sql.Int);
        pushAOJParam(aoj, 'NumSubCuenta' ,      sql.NVarChar(6),    NumSubCuenta)
        pushAOJParam(aoj, 'IdDocumento' ,       sql.Int,            +IdDocumento);
        pushAOJParam(aoj, 'FechaMovimiento',    sql.SmallDateTime(),    FechaMovimiento);
        pushAOJParam(aoj, 'IdMoneda'    ,       sql.TinyIntNYINT,   +IdMoneda)
        pushAOJParam(aoj, 'Debe'    ,           sql.Numeric(17,5),  +Debe)
        pushAOJParam(aoj, 'DebeMonLocal',       sql.Numeric(17,5),  +DebeMonLocal)
        pushAOJParam(aoj, 'Haber'   ,           sql.Numeric(17,5),  +Haber)
        pushAOJParam(aoj, 'HaberMonLocal' ,     sql.Numeric(17,5),  +HaberMonLocal)
        return storedProcExecute('USP_CREATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA', aoj)
    }
    
    updateMovimiento({}, conn) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdMovimiento',       sql.Int,        +IdMovimiento)
        pushAOJParam(aoj, 'FechaMovimiento' ,   sql.SmallDateTime(),FechaMovimiento)
        pushAOJParam(aoj, 'Debe'    ,           sql.Numeric(17,5),  +Debe)
        pushAOJParam(aoj, 'DebeMonLocal',       sql.Numeric(17,5),  +DebeMonLocal)
        pushAOJParam(aoj, 'Haber'   ,           sql.Numeric(17,5),  +Haber)
        pushAOJParam(aoj, 'HaberMonLocal' ,     sql.Numeric(17,5),  +HaberMonLocal)
        return storedProcExecute('USP_UPDATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA', aoj)
    }


    dishableMovimiento({IdMovimiento, IdDocumento}, conn) {
        const aoj = [];
        let filter = '';
        
        if ( IdMovimiento ) {
            filter += addEqualParamInFilter(filter, 'IdMovimiento');
            pushAOJParam(aoj,   'IdMovimiento', sql.Int,    IdMovimiento);
        }
        if ( IdDocumento ) {
            filter += addEqualParamInFilter(filter, 'IdDocumento');
            pushAOJParam(aoj,   'IdDocumento', sql.Int,    IdDocumento);
        }
        return queryExecute( baseUpdate + update, aoj );
    }

    deleteMovimiento({IdMovimiento, IdDocumento}, conn) {
        const aoj = [];
        let filter = '';
        
        if ( IdMovimiento ) {
            filter += addEqualParamInFilter(filter, 'IdMovimiento');
            pushAOJParam(aoj,   'IdMovimiento', sql.Int,    IdMovimiento);
        }
        if ( IdDocumento ) {
            filter += addEqualParamInFilter(filter, 'IdDocumento');
            pushAOJParam(aoj,   'IdDocumento', sql.Int,    IdDocumento);
        }
        return queryExecute( baseDelete + update, aoj );
    }
}