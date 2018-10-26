const   express             = require('express');
const   AuthController      = require('../controllers/auth');
const   validations         = require('../Utils/validations/authValidations');
let     router              = express.Router();
let     { validsParams } = validations;

router
    //Rutas para manejo de Usuarios
    .post('/signup',        validations.userSignUpValidation,       validsParams, AuthController.signUp)
    .post('/signupAdmin',   validations.userSignUpValidationAdmin,  validsParams, AuthController.signUp)
    .post('/signin',        validations.userSignInValidation,       validsParams, AuthController.singIn)
    .get('/users',          validations.Habilitado,                 validsParams, AuthController.getUsers)
    .put('/update-user/:IdUsuario(\\d+)',   validations.userSignInValidation, validations.userUpdate, validsParams, AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)',       AuthController.changeStateUser)

module.exports = router;