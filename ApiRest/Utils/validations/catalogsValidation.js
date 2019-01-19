const { query, body, oneOf, param }    = require('express-validator/check');
const { sanitize }              = require('express-validator/filter');

let createTipoDocumento = [
    body('NombTipDoc', 'Tipo de Documento necesario.').isLength({min:2,max:50 }),
    body('DescTipDoc','Es Necesaria la Descripcion del Tipo de Documento').isLength({min:2, max:50}),
];

exports.createTipoDocumentoI = createTipoDocumento

exports.updateTipoDocumentoI = createTipoDocumento.concat([
    param('IdTipDoc').isInt(),
    sanitize('IdTipDoc').toInt()
])

exports.getBancos = [
    query('IdPais').isInt().optional({nullable: true}),
    query('Banco').isLength({min: 3, max: 100}).optional({nullable: true}),
    query('Siglas').isLength({min: 3, max:10}).optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('IdPais').toInt()
];

exports.createBanco = [
    body('IdPais').isInt(),
    body('Banco').isLength({min: 3, max: 100}),
    body('Siglas').isLength({min: 3, max:10}),
    body('Direccion').isLength({min: 5, max: 200}),
    body('Telefono1').isLength({min: 5, max:20}),
    body('Telefono2').isLength({min: 5, max:20}).optional({nullable: true}),
    body('Correo').isEmail(),
    body('Web').isLength({min:3, max:100}).isURL(),
];