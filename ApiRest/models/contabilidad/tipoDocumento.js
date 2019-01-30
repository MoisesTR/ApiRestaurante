
const baseSelect = 'SELECT IdTipDoc, IdTipCuenta, NombTipDoc, DescTipDoc, Habilitado,CreatedAt,UpdatedAt FROM CONTABILIDAD_TIPO_DOCUMENTO';
const { sql, pushAOJParam,queryExecute } = require('../../Utils/defaultImports')

module.exports = class TipoDocumento {
    
    static async obtenerTipoDocumento( IdTipDoc ){
        const aoj = [];

        pushAOJParam(aoj,   'IdTipDoc',   sql.TinyInt,  IdTipDoc);
        const resp = await queryExecute( baseSelect + ' WHERE IdTipDoc = @IdTipDoc', aoj);
        return resp.recordset[0];
    }

    static async obtenerTiposDocumentos({NombTipDoc, Habilitado}) {
        const aoj   = [];
        let   filter = '';

        pushAOJParam(aoj,   'NombTipDoc',   sql.NVarChar(50),   NombTipDoc);
        pushAOJParam(aoj,   'Habilidato',   sql.Bit,            Habilitado);
        const resp = await queryExecute(baseSelect + filter, aoj);
        return resp.recordset;
    }
}