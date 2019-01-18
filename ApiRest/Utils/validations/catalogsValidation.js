const { query, body, check, param }    = require('express-validator/check');
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