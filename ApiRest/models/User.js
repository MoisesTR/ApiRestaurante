const {pushAOJParam, storedProcExecute, queryExecute, sql} = require('../Utils/defaultImports')
const baseSelect = '';

class UserModel {

    constructor() {
        this.aoj    = [];
    }

    getUsers( Habilitado ) {
        let aoj = [];
        
        pushAOJParam(aoj, 'Habilitado', sql.Int, +Habilitado);
        return  storedProcExecute('USP_GET_USUARIOS', aoj)
    }

    getUserByUsername( Username ) {
        let aoj = [];

        pushAOJParam( aoj, 'Username',  sql.NVarChar(50),   Username);
        return  storedProcExecute('dbo.USP_GET_USUARIO_BY_USERNAME', aoj );
    }
    
    getUserByUsernameOREmail( Username, Email ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'Username',   sql.NVarChar(50),   Username);
        pushAOJParam(aoj, 'Email',      sql.NVarChar(100),  Email);
        return queryExecute( baseSelect + filter, this.aoj);
    }

    updateUser(req, res) {
        const aoj = [];

        pushAOJParam(aoj, 'IdUsuario', )
        pushAOJParam(aoj, 'Email')
        pushAOJParam(aoj, 'Email', )

        res.status(200).json({ status: 200, code: '', message: 'Usuario actualizado' });
    }

    createUser( userData ) {
        const aoj = [];

        pushAOJParam(aoj, 'Imagen',     sql.NVarChar(100),  userData.Imagen);
        pushAOJParam(aoj, 'Password',   sql.NVarChar(100),  userData.Password);
        if ( !!userData.IdTrabajador ) {
            pushAOJParam(aoj, 'IdRol',          sql.Int,    userData.IdRol);
            pushAOJParam(aoj, 'IdTrabajador',   sql.Int,    userData.IdTrabajador)
            return storedProcExecute('USP_CREATE_USUARIO', aoj)
        } else {
            return storedProcExecute('USP_CREATE_USUARIO_ADMIN', aoj)
        }
    }

    changeStateUser( IdUsuario, Habilitado ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdUsuario',  sql.Int, IdUsuario)
        pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
        return storedProcExecute('USP_DISP_USUARIO', aoj)
    }
}

module.exports = UserModel;