const baseSelect        = 'SELECT IdRol, NombRol, DescRol, Habilitado, CreatedAt, UpdatedAt FROM ROL_USUARIO';
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports');

class RolModel {
    async createRol( data ){ 
        let aoj = [];
        
        pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),   data.NombRol)
        pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),  data.DescRol)
        return storedProcExecute('USP_CREATE_ROL_USUARIO', aoj)
    }

    async getRoles( data ){
        let aoj = [];

        pushAOJParam(aoj, 'Habilitado',sql.Int,+data.Habilitado);
        let result = await queryExecute(baseSelect, aoj);
        return result;
    }    

    async getRolbyId( IdRol ){
        let IdRol = req.params.IdRol;
        let aoj = [];
        pushAOJParam(aoj, 'IdRol',   sql.Int,    IdRol)
        return storedProcExecute('USP_GET_ROL', aoj) 
    }

    async updateRol( data ){
        let aoj = [];
        pushAOJParam(aoj, 'IdRol',       sql.Int,            data.IdRol );
        pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),   data.NombRol );
        pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),  data.DescRol );
        return storedProcExecute('USP_UPDATE_ROL', aoj);
    }
}

module.exports = RolModel;