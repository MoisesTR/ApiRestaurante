const {validationResult, query, check, param, sanitize} = require('../defaultImports')

exports.Habilitado = [
    query('Habilitado','Habilitado debe ser booleano.').optional({nullable:true}).isBoolean(),
    sanitize('Habilitado').toBoolean()
]

exports.validsParams = (req, res, next) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(400).json(errors.array()): next();
}

exports.isDate = (nombreCampo ) => {
    return check(nombreCampo, nombreCampo + '  es requerido.').exists()
    .custom((value) => {
        let date = new Date(value);
       
        if(isNaN(date)) {
            console.log('No es una fecha')
            throw new Error(`El parametro ${nombreCampo} debe ser una fecha valida.`);
        }
        date = date.toISOString();
        return date;
    },`El parametro ${nombreCampo} debe ser una fecha valida.`)
}

exports.changeStateGeneric = (nameIdParam) => {
    return [
        param(nameIdParam).isInt(),
        check('Habilitado','Habilitado debe ser booleano.').isBoolean(),
        sanitize('Habilitado').toBoolean(),
        sanitize(nameIdParam).toInt()
    ]
}