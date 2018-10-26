exports.addErrorCode = (errores)  => {
    errores.error = true;
    errores.code = "BADPARAMS";
    return errores;
}

exports.postValidator = (req, res, next) => {
    let errores = validationResult(req).mapped();
    (errores) ? res.status(400).json({ errors: errores }): next();
}

/***
 * @name mssqlErrors
 * @param {number: Number} err 
 */
exports.mssqlErrors = (err) => {
    console.error(err);
    return {
        "showMessage" : (err.number == 50000) ? true : false,
        "code": err.code,
        "name": err.name,
        "number": err.number,
        "message": ((err.message) ? err.message : (err.originalError.message) ? err.originalError.message : err.originalError.info.message)
    }
}

exports.existParam = ( param ) => {
    return (param !== undefined)
} 

exports.addLikeParamInFilter =  (filter, param ) => {
    return  (filter === '' ? ' WHERE ' : ' AND ') + ` ${param} LIKE \'%\'+@${param }+\'%\'`;
}

exports.addEqualParamInFilter = ( filter , param ) => {
    return  (filter === '' ? ' WHERE ' : ' AND ') + ` ${param} = @${param}`;
}