const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../Utils/defaultImports');
const baseSelect =   `SELECT IdEmpaque, NombEmpaque, DescEmpaque, Habilitado, CreatedAt, UpdatedAt 
FROM EMPAQUE`;

class EmpaqueModel {
    constructor() {
        this.aoj = [];
    }
    
    getEmpaqueById( IdEmpaque ) {
        this.aoj     = [];
        let     filter  = '';
    
        filter += ' WHERE IdEmpaque = @IdEmpaque';
        pushAOJParam(this.aoj, 'IdEmpaque',   sql.Int,    IdEmpaque);
        return  queryExecute(baseSelect + filter, this.aoj)
    }
    
    getEmpaques( {Habilitado} = {} ) {
        this.aoj     = [];

        let filter  = ' WHERE Habilitado = ISNULL(@Habilitado, Habilitado)';
    
        pushAOJParam(this.aoj, 'Habilitado',      sql.Bit(),  +Habilitado);
        return queryExecute( baseSelect + filter, this.aoj)
    }
    
    createEmpaque( NombEmpaque, DescEmpaque ) {
        this.aoj    = []; 

        pushAOJParam(this.aoj, 'NombEmpaque',     sql.NVarChar(50),   NombEmpaque);
        pushAOJParam(this.aoj, 'DescEmpaque',     sql.NVarChar(150),  DescEmpaque);
        return storedProcExecute('USP_CREATE_EMPAQUE', this.aoj)
    }
    
    updateEmpaque( IdEmpaque, NombEmpaque, DescEmpaque ) {
        this.aoj    = [];

        pushAOJParam(this.aoj, 'IdEmpaque',       sql.Int,                IdEmpaque);
        pushAOJParam(this.aoj, 'NombEmpaque',     sql.NVarChar(50),       NombEmpaque);
        pushAOJParam(this.aoj, 'DescEmpaque',     sql.NVarChar(150),      DescEmpaque);
        return storedProcExecute('dbo.USP_UPDATE_EMPAQUE', this.aoj)
    }
    
    changeStateEmpaque( IdEmpaque, Habilitado ){
        this.aoj    = [];

        pushAOJParam(this.aoj, 'IdEmpaque',   sql.Int(),  IdEmpaque);
        pushAOJParam(this.aoj, 'Habilitado',  sql.Bit(), +Habilitado);
        return storedProcExecute('dbo.USP_DISP_EMPAQUE', this.aoj)
    }
}   

module.exports = EmpaqueModel;