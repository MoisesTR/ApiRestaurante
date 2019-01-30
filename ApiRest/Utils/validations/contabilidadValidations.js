const { query, body, oneOf, param }    = require('express-validator/check');
const { sanitize }              = require('express-validator/filter');

exports.createClaseCuenta = [
    body('NombClasC').isLength({min:4, max:100}),
    body('DescClasC').isLength({min: 4, max:150}).optional({nullable: true}),
];

exports.getClaseVenta = [
    param('IdClasCuenta').isInt()
];

exports.getClasesVentas = [
    query('NombClasC').isLength({min:2, max:100}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean()
];

exports.createGrupoCuenta = [
    body('IdClasCuenta').isInt(),
    body('NombGrupo').isLength({min: 3, max: 100}),
];

exports.getGrupoCuenta = [
    param('IdGrupo').isInt()
];

exports.getGruposCuenta = [
    query('IdClasCuenta').isInt().optional({nullable: true}),
    query('NombGrupo').isLength({min: 3, max:100}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean()  
];