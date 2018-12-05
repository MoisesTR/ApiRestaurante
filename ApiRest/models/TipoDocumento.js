const { sql, pushAOJParam, storedProcExecute } = require('../Utils/defaultImports')

class TipoDocumentoModel {
    
    constructor() {
        this.aoj = [];
    }

    getTiposDocumento( Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'Habilitado',      sql.Bit, +Habilitado);
        return storedProcExecute('USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION', aoj);
    }
    
    createTipoDocumento( NombTipDoc, DescTipDoc ){
        this.aoj = [];
    
        pushAOJParam(this.aoj, 'NombTipDoc',        sql.NVarChar(50),       NombTipDoc);
        pushAOJParam(this.aoj, 'DescTipDoc',   sql.NVarChar(150),      DescTipDoc)
        return storedProcExecute('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
     
    updateTipoDocumento( IdTipDoc, NombTipDoc, DescTipDoc ){
        this.aoj = [];
    
        pushAOJParam(this.aoj, 'IdTipDoc',          sql.Int,                IdTipDoc);
        pushAOJParam(this.aoj, 'NombTipDoc',          sql.NVarChar(50),       NombTipDoc);
        pushAOJParam(this.aoj, 'DescTipDoc',     sql.NVarChar(150),      DescTipDoc);
        return storedProcExecute('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
    
    
    changeStateTipoDocumento( IdTipDoc, Habilitado ) {
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdTipDoc',      sql.Int,        IdTipDoc)
        pushAOJParam(this.aoj, 'Habilitado',    sql.Bit,        +Habilitado)
        return storedProcExecute('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION', aoj)
    }
}

module.exports = TipoDocumentoModel;