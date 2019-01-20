const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const sqlInsert = 'INSERT INTO dbo.TIPO_INSUMO(NombTipInsumo, DescTipInsumo) VALUES(@NombTipInsumo, @DescTipInsumo)'
const baseSelect = `SELECT IdTipInsumo, Descripcion, Habilitado, CreatedAt, UpdatedAt FROM TIPO_INSUMO`;

class TipoInsumo {
    static createTipoInsumo( NombTipInsumo, DescTipInsumo ) {
        const aoj = [];

        pushAOJParam(aoj,   'NombTipInsumo',    sql.VarChar(50),    NombTipInsumo);
        pushAOJParam(aoj,   'DescTipInsumo',    sql.VarChar(150),   DescTipInsumo);
        return queryExecute(sqlInsert, aoj);
    }
    
    static async getTipoInsumo( IdTipInsumo ) {
        const aoj = [];
        let filter  = ' WHERE IdTipInsumo = @IdTipInsumo';

        pushAOJParam(aoj,   'IdTipInsumo',  sql.TinyInt,    IdTipInsumo);
        const resp = await queryExecute(baseSelect + filter, aoj)
        return resp.recordset[0];
    }

    static async getTiposInsumo( {NombTipInsumo, Habilitado} ) {
        const aoj = [];
        let filter  = '';

        if ( !!NombTipInsumo ) { 
            filter += addLikeParamInFilter(filter, 'NombTipInsumo');
            pushAOJParam(aoj,   'NombTipInsumo', sql.VarChar(50),   NombTipInsumo);
        }
        if ( Habilitado !== undefined ) {
            filter  +=   addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',  sql.Bit,    +Habilitado);
        }

        const resp = await queryExecute(baseSelect + filter, aoj)
        return resp.recordset;
    }
}

module.exports = TipoInsumo;