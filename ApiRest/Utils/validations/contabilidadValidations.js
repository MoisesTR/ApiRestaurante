const { query, body, oneOf, param }    = require('express-validator/check');
const { sanitize }              = require('express-validator/filter');

const basicoClaseCuenta = [
    body('NombClasC').isLength({min:4, max:100}),
    body('DescClasC').isLength({min: 4, max:150}).optional({nullable: true}),
];
exports.createClaseCuenta = basicoClaseCuenta;

exports.updateClaseCuenta = basicoClaseCuenta.concat([
    param('IdClasCuenta').isInt(),
    sanitize('IdClasCuenta').toInt()
]);

exports.getClaseVenta = [
    param('IdClasCuenta').isInt()
];

exports.getClasesVentas = [
    query('NombClasC').isLength({min:2, max:100}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean()
];

const basicoGrupoCuenta = [
    body('IdClasCuenta').isInt(),
    body('NombGrupo').isLength({min: 3, max: 100}),
];

exports.createGrupoCuenta = basicoGrupoCuenta;

exports.updateGrupoCuenta = basicoGrupoCuenta.concat([
    param('IdGrupo').isInt(),
    sanitize('IdGrupo').toInt()
]);

exports.getGrupoCuenta = [
    param('IdGrupo').isInt()
];

exports.getGruposCuenta = [
    query('IdClasCuenta').isInt().optional({nullable: true}),
    query('NombGrupo').isLength({min: 3, max:100}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean()  
];
const basicoCuentas =  [
    body('NombCuenta').isLength({min: 4, max: 100}),
    body('DescCuenta').isLength({min: 5, max: 150}).optional({nullable: true})
]

exports.createCuenta = basicoCuentas.concat([
    body('IdClasCuenta').isInt(),
    body('IdGrupo').isInt(),
    body('IdMoneda').isInt(),
    // body('IdRestaurante').isInt(),
    sanitize('IdClasCuenta').toInt(),
    sanitize('IdGrupo').toInt(),
    // sanitize('IdRestaurante').toInt(),
]);

exports.getCuentas = [
    query('IdClasCuenta').isInt().optional({nullable: true}),
    query('IdGrupo').isInt().optional({nullable: true}),
    // query('IdRestaurante').isInt().optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean(),
];
exports.updateCuenta = basicoCuentas.concat([
    // body('IdRestaurante').isInt(),
    param('NumCuenta').isLength(4),
    // sanitize('IdRestaurante').toInt()
]);

const basicoSubCuenta = [
    body('NombSubCuenta').isLength({min: 4, max: 100}),
    body('DescSubCuenta').isLength({min: 3, max:150}).optional({nullable: true})
];

exports.createSubCuenta = basicoSubCuenta.concat([
    body('NumCuenta').isInt(),
    sanitize('NumCuenta').toInt()
]);

exports.updateSubCuenta = basicoSubCuenta.concat([
    param('NumSubCuenta').isLength(6)
]);

exports.getSubCuentas = [
    query('NumCuenta').isLength(6).optional({nullable: true}),
    query('NombSubCuenta').isLength({min:3, max:100}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean()
];