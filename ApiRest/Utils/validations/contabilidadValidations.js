const { query, body, oneOf, param }    = require('express-validator/check');
const { sanitize }              = require('express-validator/filter');
const { isDate } = require('./genericValidations');

const habilitadoQuery = [
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean(),
];

const basicoClaseCuenta = [
    body('NombClasC').isLength({min:4, max:100}),
    body('DescClasC').isLength({min: 4, max:150}).optional({nullable: true}),
];
exports.createClaseCuenta = basicoClaseCuenta.concat([
    body('Naturaleza').isBoolean(),
    sanitize('Naturaleza').toBoolean()
]);

exports.updateClaseCuenta = basicoClaseCuenta.concat([
    param('IdClasCuenta').isInt(),
    sanitize('IdClasCuenta').toInt()
]);

exports.getClaseCuenta = [
    param('IdClasCuenta').isInt()
];

exports.getClasesCuentas = [
    query('NombClasC').isLength({min:2, max:100}).optional({nullable: true}),
    query('Naturaleza').isBoolean().optional({nullable: true}),
    sanitize('Naturaleza').toBoolean(),
    ...habilitadoQuery
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
    ...habilitadoQuery
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
    ...habilitadoQuery
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
    ...habilitadoQuery
];

exports.getMovimientosCuenta = [
    query('NumCuenta').isLength(6).optional({nullable: true}),
    query('IdDocumento').isInt().optional({nullable: true}),
    query('IdMoneda').isInt().optional({nullable: true}),
    isDate('FechaMovimiento'),
    isDate('FechaMin'),
    isDate('FechaMax'),
    sanitize('FechaMovimiento').toDate(),
    sanitize('FechaMin').toDate(),
    sanitize('FechaMax').toDate(),
];
const baseMovimientoCuenta = [
    isDate('FechaMovimiento'),
    body('Debe').isNumeric(),
    body('DebeMonLocal').isNumeric(),
    body('Haber').isNumeric(),
    body('HaberMonLocal').isNumeric(),
];

exports.createMovimientoCuenta = baseMovimientoCuenta.concat([
    body('NumSubCuenta').isLength(6),
    body('IdDocumento').isInt(),
    body('IdMoneda').isInt(),
]);

exports.updateMovimientoCuenta = baseMovimientoCuenta.concat([
    param('IdMovimiento').isInt(),
]);
const basicoDocumento = [
    body('IdSucursal').isInt(),
    body('IdMoneda').isInt(),
    body('NombDoc').isLength({min:4, max:50}),
    body('DescDoc').isLength({min: 5, max: 150}),
];

exports.createDocumento = basicoDocumento.concat([
    body('IdTipDoc').isInt(),
    body('IdRestaurante').isInt(),
    body('Serie').isLength({min: 2, max:10})
]);

exports.updateDocumento = basicoDocumento.concat([
    param('IdDocumento').isInt(), 
]);

exports.getDocumentos = [
    body('IdRestaurante').isInt(),
    body('IdSucursal').isInt(),
    body('IdMoneda').isInt(),
    body('Serie').isLength({min: 2, max:10}),
    ...habilitadoQuery
];