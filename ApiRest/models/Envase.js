const db    = require('../services/database');
const sql   = require('mssql');
const {existParam}      = require('../Utils/util')
const baseSelect        = 'SELECT IdEnvase,NombEnvase,DescEnvase,Habilitado FROM ENVASE';
const baseSelectMinified = 'SELECT IdEnvase,Nombenvase, DescEnvase FROM ENVASE';

class EnvaseModel {
    constructor() {
        this.aoj = [];
    }

    async getEnvaseById( IdEnvase ) {
        this.aoj    = [];
        db.pushAOJParam(aoj, 'IdEnvase',    sql.Int,   IdEnvase);
        return  db.queryExecute(baseSelect+' WHERE IdEnvase = @IdEnvase', aoj)
    }
    
    async getEnvases( {NombEnvase, Habilitado} = {}) {
        this.aoj     = [];
        let     filters = '';
    
        if ( existParam( NombEnvase ) ) {
            db.pushAOJParam(aoj, 'NombEnvase', sql.NVarChar(),  data.NombEnvase)
            filters = ' WHERE NombEnvase = @NombEnvase'
        }
        if ( existParam(Habilitado) ) {
            db.pushAOJParam(aoj, 'Habilitado', sql.Bit(),       +data.Habilitado);
            filters = (filters === '') ? ' WHERE Habilitado = @Habilitado' : ' AND Habilitado = @Habilitado';
        }
        return  db.queryExecute(baseSelect + filters, aoj)
    }
    
    async createEnvase( NombEnvase, DescEnvase ) {
        this.aoj    = [];
        db.pushAOJParam(aoj, 'NombEnvase', sql.NVarChar(50),    NombEnvase)
        db.pushAOJParam(aoj, 'DescEnvase', sql.NVarChar(150),   DescEnvase)
        return  db.storedProcExecute('USP_CREATE_ENVASE', aoj)
    }
    
    async updateEnvase( IdEnvase, NombEnvase, DescEnvase ) {
        this.aoj    = [];

        db.pushAOJParam(aoj, 'IdEnvase',    sql.Int,            IdEnvase);
        db.pushAOJParam(aoj, 'NombEnvase',  sql.NVarChar(50),   NombEnvase);
        db.pushAOJParam(aoj, 'DescEnvase',  sql.NVarChar(150),  DescEnvase);
        return  db.storedProcExecute('dbo.USP_UPDATE_ENVASE', aoj)
    }

    async changeStateEnvase( IdEnvase, Habilitado ){
        this.aoj = [];

        db.pushAOJParam(aoj, 'IdEnvase',    sql.Int(),      IdEnvase);
        db.pushAOJParam(aoj, 'Habilitado',  sql.Bit(),      +Habilitado);
        return  db.storedProcExecute('dbo.USP_DISP_ENVASE', aoj)
    }
}

module.exports = EnvaseModel;