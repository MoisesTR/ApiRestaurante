const jwt = require('../../services/jwt');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const {mssqlErrors, matchedData, sanitize, db, sql} = require('../controllers/defaultImports')
const baseSelect = '';

export default class UserModel {

    constructor() {
        this.aoj    = [];
    }

    async getUsers( params ) {
        var aoj = [];
        db.pushAOJParam(aoj, 'Habilitado', sql.Int, +Habilitado);
        return  db.storedProcExecute('USP_GET_USUARIOS', aoj)
    }

    async getUserByUsername( Username ) {

    }
    
    async getUserByUsernameOREmail( Username, Email ) {

        db.pushAOJParam(aoj, 'Username', sql.NVarChar(50), userData.Username);
        db.pushAOJParam(aoj, 'Email', sql.NVarChar(100), userData.Email);
        return db.queryExecute( baseSelect + filter, this.aoj);
    }

    async updateUser(req, res) {
        db.pushAOJParam(aoj, 'IdUsuario', )
        db.pushAOJParam(aoj, 'Email')
        db.pushAOJParam(aoj, 'Email', )
        res.status(200).json({ status: 200, code: '', message: 'Usuario actualizado' });
    }

    async createUser( ) {
        db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(100), userData.Imagen);
        db.pushAOJParam(aoj, 'Password', sql.NVarChar(100), userData.Password);
        if ( typeof userData.IdTrabajador != 'undefined' ) {
            db.pushAOJParam(aoj, 'IdRol', sql.Int, userData.IdRol);
            db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, userData.IdTrabajador)
            return db.storedProcExecute('USP_CREATE_USUARIO', aoj)
        } else {
            return db.storedProcExecute('USP_CREATE_USUARIO_ADMIN', aoj)
        }
    }

    async changeStateUser(req, res) {
        let data = matchedData(req, {locations: ['body', 'params']});
        console.log(data)
        var aoj = [];
        db.pushAOJParam(aoj, 'IdUsuario', sql.Int, IdUsuario)
        db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
        return db.storedProcExecute('USP_DISP_USUARIO', aoj)
    }
}
