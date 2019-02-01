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
const basicoCuentas =  [
    body('NombCuenta').isLength({min: 4, max: 100}),
    body('DescCuenta').isLength({min: 5, max: 150}).optional({nullable: true})
]

exports.createCuenta = basicoCuentas.concat([
    body('IdClasCuenta').isInt(),
    body('IdGrupo').isInt(),
    body('IdMoneda').isInt(),
    body('IdRestaurante').isInt(),
    sanitize('IdClasCuenta').toInt(),
    sanitize('IdGrupo').toInt(),
    sanitize('IdRestaurante').toInt(),
]);

exports.getCuentas = [
    query('IdClasCuenta').isInt().optional({nullable: true}),
    query('IdGrupo').isInt().optional({nullable: true}),
    query('IdRestaurante').isInt().optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('Habilitado').toBoolean(),
];
exports.updateCuenta = basicoCuentas.concat([
    body('IdRestaurante').isInt(),
    param('NumCuenta').isLength(4),
    sanitize('IdRestaurante').toInt()
]);