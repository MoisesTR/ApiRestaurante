const sql               = require('mssql');
const db                = require('../../services/database');
const baseSelect        = 'SELECT IdRol, NombRol, DescRol, Habilitado, CreatedAt, UpdatedAt FROM ROL_USUARIO';


export default class RolModel {
    async createRol( data ){ 
        let aoj = [];
        db.pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),   data.NombRol)
        db.pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),  data.DescRol)
        return db.storedProcExecute('USP_CREATE_ROL_USUARIO', aoj)
    }

    async getRoles( data ){
        let aoj = [];
        db.pushAOJParam(aoj, 'Habilitado',sql.Int,+data.Habilitado);
        let result = await db.queryExecute(baseSelect, aoj);
        return result;
    }    

    async getRolbyId( IdRol ){
        let IdRol = req.params.IdRol;
        let aoj = [];
        db.pushAOJParam(aoj, 'IdRol',   sql.Int,    IdRol)
        return db.storedProcExecute('USP_GET_ROL', aoj) 
    }

    async updateRol( data ){
        let aoj = [];
        db.pushAOJParam(aoj, 'IdRol',       sql.Int,            data.IdRol );
        db.pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),   data.NombRol );
        db.pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),  data.DescRol );
        return db.storedProcExecute('USP_UPDATE_ROL', aoj);
    }
}