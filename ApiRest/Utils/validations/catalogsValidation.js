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

exports.createUdMFuncional = [
    body('IdUnidadMedida').isInt(),
    body('NombUdmFunc').isLength({min: 3, max:50}),
    body('DescUdmFunc').isLength({min:3, max:150}),
    body('ValorUdm').isNumeric(),
];

exports.getUdmFuncionales = [
    query('IdUnidadMedida').isInt(),
];

exports.createTipoInsumo = [
    body('NombTipInsumo').isLength({min: 3, max: 50}),
    body('DescTipInsumo').isLength({min: 3, max: 150})
];

exports.getTiposInsumo = [
    query('Habilitado').isBoolean().optional({nullable: true}),
    query('NombTipInsumo').isLength({min:2, max:50}).optional({nullable: true}),
    sanitize('Habilitado').toBoolean()  
];

const createCategoria = [
    body('IdTipInsumo', 'Selecciona el tipo de insumo').isInt(),
    body('NombCategoria', 'El nombre de la categoria es requerido').isString(),
    body('DescCategoria', 'La descripcion de la categoria es requerida!').isString(),
    sanitize('IdTipInsumo').toInt()
];

exports.updateCategoria = createCategoria.concat([
    query('IdCategoria').isInt(),
    sanitize('IdCategoria').toInt(),
]);

exports.createCategoria = createCategoria;