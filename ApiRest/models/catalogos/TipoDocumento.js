const { sql, pushAOJParam, storedProcExecute } = require('../../Utils/defaultImports')

class TipoDocumentoModel {
    
    getTiposDocumento( Habilitado ) {
        const aoj = [];

        pushAOJParam(aoj, 'Habilitado',      sql.Bit, +Habilitado);
        return storedProcExecute('USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION', aoj);
    }
    
    createTipoDocumento( NombTipDoc, DescTipDoc ){
        const aoj = [];
    
        pushAOJParam(aoj, 'NombTipDoc',     sql.NVarChar(50),       NombTipDoc);
        pushAOJParam(aoj, 'DescTipDoc',     sql.NVarChar(150),      DescTipDoc)
        return storedProcExecute('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
     
    updateTipoDocumento( IdTipDoc, NombTipDoc, DescTipDoc ){
        const aoj = [];
    
        pushAOJParam(aoj, 'IdTipDoc',       sql.Int,                IdTipDoc);
        pushAOJParam(aoj, 'NombTipDoc',     sql.NVarChar(50),       NombTipDoc);
        pushAOJParam(aoj, 'DescTipDoc',     sql.NVarChar(150),      DescTipDoc);
        return storedProcExecute('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
    
    
    changeStateTipoDocumento( IdTipDoc, Habilitado ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTipDoc',      sql.Int,        IdTipDoc)
        pushAOJParam(aoj, 'Habilitado',    sql.Bit,        +Habilitado)
        return storedProcExecute('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION', aoj)
    }
}

module.exports = TipoDocumentoModel;