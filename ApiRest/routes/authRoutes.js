const   express             = require('express');
const   AuthController      = require('../controllers/auth/auth.controller');
const   validations         = require('../Utils/validations/authValidations');
const   router              = express.Router();
const   { ensureAuth }      = require('../services/jwt');
const   { validsParams } = validations;

router
    //Rutas para manejo de Usuarios
    .post('/signup',        validations.userSignUpValidation,       validsParams, AuthController.signUp)
    .post('/signin',        validations.userSignInValidation,       validsParams, AuthController.singIn)
    .get( '/me',            ensureAuth,     validations.meInfo,     validsParams, AuthController.getAuthenticateUserInfo)
    .post('/refresh',       AuthController.refreshToken)
    .get( '/users',         validations.Habilitado,                 validsParams, AuthController.getUsers)
    .put( '/update-user/:IdUsuario(\\d+)',   validations.userSignInValidation, validations.userUpdate, validsParams, AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)',       AuthController.changeStateUser)

module.exports = router;