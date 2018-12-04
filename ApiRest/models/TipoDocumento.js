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
    
    createTipoDocumento( NombreTD, DescripcionTD ){
        this.aoj = [];
    
        pushAOJParam(this.aoj, 'NombreTD',        sql.NVarChar(50),       NombreTD);
        pushAOJParam(this.aoj, 'DescripcionTD',   sql.NVarChar(150),      DescripcionTD)
        return storedProcExecute('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
     
    updateTipoDocumento( IdTipDoc, NombreTD, DescripcionTD ){
        this.aoj = [];
    
        pushAOJParam(this.aoj, 'IdTipDoc',          sql.Int,                IdTipDoc);
        pushAOJParam(this.aoj, 'NombreTD',          sql.NVarChar(50),       NombreTD);
        pushAOJParam(this.aoj, 'DescripcionTD',     sql.NVarChar(150),      DescripcionTD);
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