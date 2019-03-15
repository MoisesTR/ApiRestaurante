const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const ClaseCuentaModel = require('../../models/contabilidad/claseCuenta');

exports.getClaseCuenta = (req, res) => {
    const data = matchedData(req,{locations: ['params']});

    ClaseCuentaModel.getClaseCuenta( data.IdClasCuenta )
    .then(clase => {
        res.status(200)
            .json(clase);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.getClasesCuenta = (req, res) => {
    const data = matchedData(req, {locations:['query']});
    
    ClaseCuentaModel.getClasesCuentas(data)
    .then(clases => {
        res.status(200)
            .json(clases);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.createClaseCuenta = (req, res) => {
    const data = matchedData(req);
    const ClaseCuenta = new ClaseCuentaModel();

    ClaseCuenta.createClaseCuenta(data)
    .then((result) => {
        res.status(200)
            .json(result);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.updateClaseCuenta = (req, res) => {
    const data = matchedData(req);
    const ClaseCuenta = new ClaseCuentaModel();

    ClaseCuenta.updateClaseCuenta(data)
    .then((result) => {
        res.status(200)
            .json({success: 'Cuenta actualizada con exito.'});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};
