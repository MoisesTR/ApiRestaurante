const baseSelect        = 'SELECT IdRol, NombRol, DescRol, Habilitado, CreatedAt, UpdatedAt FROM ROL_USUARIO';
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports');

class RolModel {
    createRol( {NombRol, DescRol} ){ 
        let aoj = [];
        
        pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),      NombRol)
        pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),     DescRol)
        return storedProcExecute('USP_CREATE_ROL_USUARIO', aoj)
    }

    getRoles( Habilitado ){
        let aoj = [];

        pushAOJParam(aoj, 'Habilitado', sql.Int,    +Habilitado);
        return  queryExecute(baseSelect, aoj);
    }    

    getRolbyId( IdRol ){
        let aoj = [];
    
        pushAOJParam(aoj, 'IdRol',   sql.Int,    IdRol)
        return storedProcExecute('USP_GET_ROL', aoj) 
    }

    updateRol( data ){
        let aoj = [];
    
        pushAOJParam(aoj, 'IdRol',       sql.Int,            data.IdRol );
        pushAOJParam(aoj, 'NombRol',     sql.NVarChar(50),   data.NombRol );
        pushAOJParam(aoj, 'DescRol',     sql.NVarChar(150),  data.DescRol );
        return storedProcExecute('USP_UPDATE_ROL', aoj);
    }
}

module.exports = RolModel;