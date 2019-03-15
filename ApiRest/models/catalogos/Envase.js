const baseSelect        = 'SELECT IdEnvase,NombEnvase,DescEnvase,Habilitado,createdAt,updatedAt FROM ENVASE';
const baseSelectMinified = 'SELECT IdEnvase,NombEnvase, DescEnvase FROM ENVASE';
const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports');


class EnvaseModel {
    constructor() {
        this.aoj = [];
    }

    getEnvaseById( IdEnvase ) {
        this.aoj    = [];

        pushAOJParam(this.aoj, 'IdEnvase',    sql.Int,   IdEnvase);
        return  queryExecute(baseSelect+' WHERE IdEnvase = @IdEnvase', this.aoj)
    }
    
    getEnvases( {NombEnvase, Habilitado} = {}) {
        this.aoj     = [];
        let     filters = '';
    
        if ( !!NombEnvase ) {
            pushAOJParam(this.aoj, 'NombEnvase', sql.NVarChar(),  NombEnvase)
            filters = ' WHERE NombEnvase = @NombEnvase'
        }
        if ( !!Habilitado ) {
            pushAOJParam(this.aoj, 'Habilitado', sql.Bit(),       +Habilitado);
            filters = (filters === '') ? ' WHERE Habilitado = @Habilitado' : ' AND Habilitado = @Habilitado';
        }
        return  queryExecute(baseSelect + filters, this.aoj)
    }
    
    createEnvase( NombEnvase, DescEnvase ) {
        this.aoj    = [];
        
        pushAOJParam(this.aoj, 'NombEnvase', sql.NVarChar(50),    NombEnvase)
        pushAOJParam(this.aoj, 'DescEnvase', sql.NVarChar(150),   DescEnvase)
        return  storedProcExecute('USP_CREATE_ENVASE', this.aoj)
    }
    
    updateEnvase( IdEnvase, NombEnvase, DescEnvase ) {
        this.aoj    = [];

        pushAOJParam(this.aoj, 'IdEnvase',    sql.Int,            IdEnvase);
        pushAOJParam(this.aoj, 'NombEnvase',  sql.NVarChar(50),   NombEnvase);
        pushAOJParam(this.aoj, 'DescEnvase',  sql.NVarChar(150),  DescEnvase);
        return  storedProcExecute('dbo.USP_UPDATE_ENVASE', this.aoj)
    }

    changeStateEnvase( IdEnvase, Habilitado ){
        this.aoj = [];

        pushAOJParam(this.aoj, 'IdEnvase',    sql.Int(),      IdEnvase);
        pushAOJParam(this.aoj, 'Habilitado',  sql.Bit(),      +Habilitado);
        return  storedProcExecute('dbo.USP_DISP_ENVASE', this.aoj)
    }
}

module.exports = EnvaseModel;