const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const SubCuentaModel = require('../../models/contabilidad/subCuenta');

exports.createSubCuenta = (req, res) => {
    const data = matchedData(req,{locations: ['body']});

    const SubCuenta = new SubCuentaModel();
    SubCuenta.createSubCuenta(data)
    .then(result => {
        res.status(200)
            .json({success: 'Cuenta creada con exito!', NumSubCuenta: result.output.NumSubCuenta});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
}

exports.updateSubCuenta = (req, res) => {
    const data = matchedData(req,{locations: ['body', 'params']});

    const SubCuenta = new SubCuentaModel();
    SubCuenta.updateSubCuenta(data)
    .then(result => {
        res.status(200)
            .json({success: 'SubCuenta actualizada con exito!'});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
}

exports.getSubCuenta = (req, res) => {
    const NumSubCuenta = req.params.NumSubCuenta;

    SubCuentaModel.getSubCuenta( NumSubCuenta )
    .then(subcuenta => {
        res.status(200)
            .json(subcuenta);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
}

exports.getSubCuentas = (req, res) => {
    const data = matchedData(req,{locations: ['query']});

    SubCuentaModel.getSubCuentas(data)
    .then(subcuentas => {
        res.status(200)
            .json(subcuentas);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
}