const statement = require('../sqlStatement/userStatement');
const {pushAOJParam, storedProcExecute, queryExecute, sql} = require('../Utils/defaultImports')
const { addEqualParamInFilter } = require('../Utils/util'); 
const baseSelect = statement.BASE_SELECT_USER;
const baseRefreshT = statement.BASE_REFRESH_TK;
const baseUpdateRT = statement.BASE_UPDATE_RT;
const baseDeleteRT = statement.BASE_DELETE_RT;

class UserModel {

    constructor({IdUsuario, Username, Email,Imagen}) {
        this.IdUsuario = IdUsuario;
        this.Username = Username;
        this.Email = Email;
        this.Imagen = Imagen;
    }

    static async getUsers( Habilitado ) {
        let aoj = [];
        
        pushAOJParam(aoj, 'Habilitado', sql.Int, +Habilitado);
        const resp = await storedProcExecute('USP_GET_USUARIOS', aoj);
        return resp.recordset;        
    }

    static async getUserByUsername( Username ) {
        let aoj = [];

        pushAOJParam( aoj, 'Username',  sql.NVarChar(50),   Username);
        const resp = await storedProcExecute('dbo.USP_GET_USUARIO_BY_USERNAME', aoj );
        return resp.recordset[0];
    }

    static async getUserById( IdUsuario ) {
        let aoj = [];

        pushAOJParam( aoj, 'IdUsuario',  sql.Int,   IdUsuario);
        return queryExecute(statement.GET_USER_BY_ID + ' WHERE IdUsuario = @IdUsuario', aoj)
    }
    
    static async getUserByUsernameOrEmail( Username, Email ) {
        const aoj = [];
        let   filter = '';

        filter = ' WHERE Username = @Username';
        pushAOJParam(aoj, 'Username',   sql.NVarChar(50),   Username);
        if ( !!Email ) {
            filter += ' OR Email = @Email';
            pushAOJParam(aoj, 'Email',      sql.NVarChar(100),  Email);
        }
        
        const resp = await queryExecute( baseSelect + filter, aoj);
        return resp.recordset || [];
    }

    updateUser() {
        const aoj = [];

        pushAOJParam(aoj, 'IdUsuario',  sql.Int,    this.IdUsuario);
        pushAOJParam(aoj, 'Email',      sql.NVarChar(150),  this.Email);
        pushAOJParam(aoj, 'Email', )

        res.status(200).json({ status: 200, message: 'Usuario actualizado' });
    }

    createUser( userData ) {
        const aoj = [];

        console.log('Creando',userData);
        pushAOJParam(aoj, 'Username',   sql.NVarChar(50),   userData.Username);
        pushAOJParam(aoj, 'Email',      sql.NVarChar(100),  userData.Email);
        pushAOJParam(aoj, 'Imagen',     sql.NVarChar(100),  userData.Imagen);
        pushAOJParam(aoj, 'Password',   sql.NVarChar(100),  userData.Password);
        pushAOJParam(aoj, 'IdRol',          sql.Int,    userData.IdRol);
        pushAOJParam(aoj, 'IdTrabajador',   sql.Int,    userData.IdTrabajador)
        return storedProcExecute('USP_CREATE_USUARIO', aoj)
    }

    changeStateUser( Habilitado ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdUsuario',  sql.Int, this.IdUsuario)
        pushAOJParam(aoj, 'Habilitado', sql.Int, +Habilitado)
        return storedProcExecute('USP_DISP_USUARIO', aoj)
    }
    
    deleteAllRefreshT( ) {
        const aoj = [];
        let filter = ' WHERE IdUsuario  = @IdUsuario';
        
        pushAOJParam(aoj, 'IdUsuario',  sql.Int, this.IdUsuario)
        return queryExecute(baseDeleteRT + filter, aoj)
    }

    static deleteRefreshT( RefreshT ) {
        const aoj = [];
        let filter = ' WHERE RefreshT = @RefreshT';

        pushAOJParam(aoj,   'RefreshT',     sql.VarChar(30),    RefreshT);
        return queryExecute( baseDeleteRT + filter, aoj);
    }
    
    insertRefreshT( RefreshT, UserAgent ) {
        const aoj = [];
        
        pushAOJParam(aoj,   'IdUsuario',    sql.Int,            this.IdUsuario)
        pushAOJParam(aoj,   'RefreshT',     sql.VarChar(30),    RefreshT);
        pushAOJParam(aoj,   'UserAgent',    sql.VarChar(120),   UserAgent)
        return storedProcExecute('dbo.USP_INSERT_REFRESH_TOKEN', aoj);
    }
    
    static async getRefreshT( RefreshT ) {
        const aoj = [];
        let filter = ' WHERE RefreshT = @RefreshT';

        pushAOJParam(aoj,   'RefreshT',     sql.VarChar(30),    RefreshT);
        const resp = await queryExecute(baseRefreshT + filter, aoj);
        return resp.recordset[0];
    }

    static async updateImageUsuario( IdUsuario, Imagen) {
        const aoj = [];

        pushAOJParam(aoj, 'IdUsuario', sql.Int, IdUsuario);
        pushAOJParam(aoj, 'Imagen', sql.NVarChar(200), Imagen);
        return queryExecute(statement.UPDATE_IMAGE_USER + ' WHERE IdUsuario = @IdUsuario', aoj)
    }
}

module.exports = UserModel;