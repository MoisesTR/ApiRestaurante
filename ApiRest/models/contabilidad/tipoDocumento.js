const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const { sql, pushAOJParam, pushAOJOuput,queryExecute, storedProcExecute } = require('../../Utils/defaultImports')
const baseSelect = 'SELECT IdTipDoc, IdTipCuenta, NombTipDoc, DescTipDoc, Habilitado,CreatedAt,UpdatedAt FROM CONTABILIDAD_TIPO_DOCUMENTO';

module.exports = class TipoDocumento {
    createTipoDocumento() {
        const aoj = [];

        pushAOJParam(aoj, 'NombTipDoc', sql.NVarChar(50),   NombTipDoc);
        pushAOJParam(aoj, 'DescTipDoc', sql.NVarChar(150),  DescTipDoc);
        pushAOJOuput(aoj, 'IdTipDoc',   sql.Int);
        return storedProcExecute('USP_CREATE_CONTABILIDAD_TIPO_DOCUMENTO', aoj);
    }

    updateTipoDocumento() {
        const aoj = [];

        pushAOJParam(aoj, 'IdTipDoc',   sql.Int,            IdTipDoc);
        pushAOJParam(aoj, 'NombTipDoc', sql.NVarChar(50),   NombTipDoc);
        pushAOJParam(aoj, 'DescTipDoc', sql.NVarChar(150),  DescTipDoc);
        return storedProcExecute('USP_UPDATE_CONTABILIDAD_TIPO_DOCUMENTO', aoj);
    }

    static async getTipoDocumento( IdTipDoc ){
        const aoj = [];

        pushAOJParam(aoj,   'IdTipDoc',   sql.TinyInt,  IdTipDoc);
        const resp = await queryExecute( baseSelect + ' WHERE IdTipDoc = @IdTipDoc', aoj);
        return resp.recordset[0];
    }

    static async getTiposDocumentos({NombTipDoc, Habilitado}) {
        const aoj   = [];
        let   filter = '';

        if ( NombTipDoc ) {
            filter +=  addLikeParamInFilter(filter, 'NombTipDoc');
            pushAOJParam(aoj,   'NombTipDoc',   sql.NVarChar(50),   NombTipDoc);
        }
        if ( Habilitado !== undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilidato',   sql.Bit,            Habilitado);
        }
        const resp = await queryExecute(baseSelect + filter, aoj);
        return resp.recordset;
    }
}