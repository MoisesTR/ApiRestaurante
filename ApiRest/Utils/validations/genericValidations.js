const {validationResult, query, sanitize} = require('../defaultImports')

exports.Habilitado = [
    query('Habilitado','Habilitado debe ser booleano.').optional({nullable:true}).isBoolean(),
    sanitize('Habilitado').toBoolean()
]

exports.validsParams = (req, res, next) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(400).json(errors.array()): next();
}