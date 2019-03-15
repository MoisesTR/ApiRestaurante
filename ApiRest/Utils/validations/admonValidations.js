const { query,body, sanitize,oneOf, param} = require('../defaultImports');
const { isDate } = require('./genericValidations')

exports.createRestaurante = [
    body('IdPais').isInt(),
    body('IdMoneda').isInt(),
    body('IdMonedaFacturacion').isInt(),
    body('IsAutoBackup').isBoolean(),
    body('IsCuotaFija').isBoolean(),
    body('NombRestaurante').isString(),
    body('DescRestaurante').isString(),
    body('CuotaFija').isFloat().optional({nullable: true}),
    body('PorcIva').isFloat().optional({nullable: true}),
    body('RazonSocial').isString(),
    body('SitioWeb').isString().optional({nullable: true}),
    body('Correo').isEmail(),
    body('TelPrincipal').isString(),
    body('TelPrincipal2').isString().optional({nullable: true}),
    isDate('FechaFundacion'),
    sanitize('FechaFundacion').toDate(),
    sanitize('IsAutoBackup').toBoolean(),
    sanitize('IsCuotaFija').toBoolean(),
];


exports.getRestaurante = [
    param('IdRestaurante').isInt(),
    sanitize('IdRestaurante').toInt()
];

exports.getRestaurantes = [
    oneOf([
        query('IdPais').isInt(),
        query('IdMoneda').isInt(),
        query('IdMonedaFacturacion').isInt(),
        query('IsCuotaFija').isBoolean(),
        query('NombRestaurante').isString(),
        query('Habilitado').isBoolean()
    ]),
    sanitize('Habilitado').toBoolean()
];

exports.createTipoCambio = [
    body('IdMonedaPrincipal').isInt(),
    body('IdMonedaCambio').isInt(),
    body('ValorMonedaPrincipal').isNumeric(),
    body('ValorCambioOficial').isNumeric(),
    body('ValorCambioParalelo').isNumeric(),
    isDate('Fecha'),
    sanitize('Fecha').toDate()
];

exports.getTiposCambio = [
    query('IdMonedaPrincipal').isInt(),
    query('IdMonedaCambio').isInt(),
];

exports.getTipoCambio = [
    query('IdTipCambio').isInt(),
    query('IdMonedaPrincipal').isInt(),
    query('IdMonedaCambio').isInt(),
    isDate('Fecha'),
    sanitize('Fecha').toDate()
];