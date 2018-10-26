let     sql         = require('mssql');
let     db          = require('../services/database');
const { mssqlErrors } = require('../Utils/util')


class EmpaqueModel {
    constructor() {
        this.aoj = [];
        this.baseSelect =   `SELECT IdEmpaque, NombEmpaque, DescEmpaque, Habilitado, CreatedAt, UpdatedAt 
                            FROM EMPAQUE`;
    }
    
    async getEmpaqueById( IdEmpaque ) {
        this.aoj     = [];
        let     filter  = '';
    
        filter += ' WHERE IdEmpaque = @IdEmpaque';
        db.pushAOJParam(aoj, 'IdEmpaque',   sql.Int,    IdEmpaque);
        return  db.queryExecute(baseSelect + filter, aoj)
    }
    
    async getEmpaques( {Habilitado} = {} ) {
        this.aoj     = [];
        let filter  = ' WHERE Habilitado = ISNULL(@Habilitado, Habilitado)';
    
        db.pushAOJParam(aoj, 'Habilitado',      sql.Bit(),  +Habilitado);
        return db.queryExecute( baseSelect + filter, aoj)
    }
    
    async createEmpaque( NombEmpaque, DescEmpaque ) {
        this.aoj    = [];
        db.pushAOJParam(aoj, 'NombEmpaque',     sql.NVarChar(50),   NombEmpaque);
        db.pushAOJParam(aoj, 'DescEmpaque',     sql.NVarChar(150),  DescEmpaque);
        return db.storedProcExecute('USP_CREATE_EMPAQUE', aoj)
    }
    
    async updateEmpaque( IdEmpaque, NombEmpaque, DescEmpaque ) {
        this.aoj    = [];
        db.pushAOJParam(aoj, 'IdEmpaque',       sql.Int,                IdEmpaque);
        db.pushAOJParam(aoj, 'NombEmpaque',     sql.NVarChar(50),       NombEmpaque);
        db.pushAOJParam(aoj, 'DescEmpaque',     sql.NVarChar(150),      DescEmpaque);
        return db.storedProcExecute('dbo.USP_UPDATE_EMPAQUE', aoj)
    }
    
    async changeStateEmpaque( IdEmpaque, Habilitado ){
        this.aoj    = [];
        db.pushAOJParam(aoj, 'IdEmpaque',   sql.Int(),  IdEmpaque);
        db.pushAOJParam(aoj, 'Habilitado',  sql.Bit(), +Habilitado);
        return db.storedProcExecute('dbo.USP_DISP_EMPAQUE', aoj)
    }
}   

module.exports = EmpaqueModel;