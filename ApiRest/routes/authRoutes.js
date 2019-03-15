const   express             = require('express');
const   AuthController      = require('../controllers/auth/auth.controller');
const   RoleController            = require('../controllers/auth/rol.controller');
const   validations         = require('../Utils/validations/authValidations');
const   router              = express.Router();
const   { containToken,ensureAuth }      = require('../services/jwt');
const   { validsParams, Habilitado,changeStateGeneric } = require('../Utils/validations/genericValidations');

router
    //Rutas para manejo de Usuarios
    .post('/signup',        validations.userSignUpValidation,       validsParams, AuthController.signUp)
    .post('/signin',        validations.userSignInValidation,       validsParams, AuthController.signIn)
    .get( '/me',            containToken,   ensureAuth,     validations.meInfo,     validsParams, AuthController.getAuthenticateUserInfo)
    .post('/refreshtoken',  containToken,   ensureAuth,     validations.refreshToken,   validsParams,     AuthController.refreshToken)
    .get( '/users',         Habilitado,                 validsParams, AuthController.getUsers)
    .put( '/update-user/:IdUsuario(\\d+)',  validations.userSignInValidation, validations.userUpdate, validsParams, AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)',       changeStateGeneric('IdUsuario'), validsParams, AuthController.changeStateUser)
    //Rutas para Rol Controller     
    .post('/rol',               validations.createRol,      validsParams,       RoleController.createRol)
    .get('/roles',              Habilitado,            validsParams,       RoleController.getRoles)
    .get('/rol/:IdRol(\\d+)',   RoleController.getRolbyId)
    .put('/rol/:IdRol(\\d+)',   validations.updateRol,      validsParams,       RoleController.updateRol)

module.exports = router;