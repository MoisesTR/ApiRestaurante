const { query, body, check }    = require('express-validator/check');
const { sanitize }              = require('express-validator/filter');
const generic                   = require('./genericValidations');

Object.assign(exports, generic);

exports.userSignUpValidation = [
    body('IdRol', 'IdRol es requerido y debe ser un entero').isInt(),
    body('IdTrabajador', 'IdTrabajador es requerido y debe ser un entero').isInt(),
    body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
    body('Email', 'Campo email debe ser un Email').isEmail().optional({ nullable: true }),
    body('Imagen', 'Imagen debe ser un archivo').optional({ nullable: true }),
    body('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
    sanitize('IdRol').toInt(),
    sanitize('IdTrabajador').toInt()
];

exports.meInfo = [
    query('addOtherUInfo', 'Es requerido y debe ser un booleano.').isBoolean(),
    query('addRolAndPermissions', 'Es requerido y debe ser un booleano.').toBoolean(),
    sanitize('addOtherUInfo').toBoolean(),
    sanitize('addRoleAndPermissions').toBoolean()
]

exports.userSignUpValidationAdmin = [
    body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
    body('Email', 'Campo email debe ser un Email').isEmail().optional({ nullable: true }),
    body('Imagen', 'Imagen debe ser un archivo').optional({ nullable: true }),
    body('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
    sanitize('username').toString(),
    sanitize('email').toString(), 
    sanitize('password').toString()
];

exports.userFindUsername = [
    body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 })
];

exports.userSignInValidation = [
    body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
    body('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
    body('gettoken', 'El parametro gettoken es requerido y debe ser un boleano').isBoolean(),
    sanitize('gettoken').toBoolean(),
    sanitize('Username').toString(),
    sanitize('Password').toString()
];

exports.userUpdate = [
    check('IdUsuario', 'IdUsuario debe ser un Entero!').isInt().optional({ nullable: false }),
    check('Username', 'username debe tener un minimo de 5 caracteres').isLength({ min: 5, max: 50 }),
    check('Password', 'password es requerido!').exists(),
    check('Password', 'El password debe tener una longitud minima de 8 y maxima de 20').isLength({ min: 4, max: 20 }),
    check('IdRol').optional({ nullable: true })
];

exports.userFindEmail = [
    check('Email', 'Campo Email no es una direccion de correo electronico valida!').isEmail()
];