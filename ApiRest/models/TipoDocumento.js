let sql             = require('mssql');
let db              = require('../services/database');

class TipoDocumentoModel {
    
    constructor() {
        this.aoj = [];
    }

    async getTiposDocumento( Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'Habilitado',      sql.Bit, +Habilitado);
        return db.storedProcExecute('USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION', aoj);
    }
    async createTipoDocumento( NombreTD, DescripcionTD ){
        this.aoj = [];
    
        db.pushAOJParam(aoj, 'NombreTD',        sql.NVarChar(50),       NombreTD);
        db.pushAOJParam(aoj, 'DescripcionTD',   sql.NVarChar(150),      DescripcionTD)
        return db.storedProcExecute('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
    async updateTipoDocumento( IdTipoDocumento, NombreTD, DescripcionTD ){
        this.aoj = [];
    
        db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int,                IdTipDoc);
        db.pushAOJParam(aoj, 'NombreTD',        sql.NVarChar(50),       NombreTD);
        db.pushAOJParam(aoj, 'DescripcionTD',   sql.NVarChar(150),      DescripcionTD);
        return db.storedProcExecute('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION', aoj );
    }
    
    async changeStateTipoDocumento( IdTipoDocumento, Habilitado ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int,        IdTipoDocumento)
        db.pushAOJParam(aoj, 'Habilitado',      sql.Bit,        +Habilitado)
        return db.storedProcExecute('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION', aoj)
    }
}

module.exports = TipoDocumentoModel;