const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const CuentaModel = require('../../models/contabilidad/cuenta');

exports.createCuenta = (req,res) => {
    const data = matchedData(req, {locations: ['body']});
  
    const Cuenta = new CuentaModel();
    Cuenta.createCuenta(data)
    .then(result => {
        res.status(200)
            .json({success: 'Cuenta creada con exito.', NumCuenta: result.output.NumCuenta});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.actualizarCuenta = ( req, res ) => {
    const data = matchedData(req, {locations: ['body', 'params']});

    const Cuenta = new CuentaModel();
    Cuenta.updateCuenta(data)
    .then(clase => {
        res.status(200)
            .json({success: 'Cuenta actualizada con exito.'});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.obtenerCuentas = ( req,res ) => {
    const data = matchedData(req, {locations: ['query']});

    CuentaModel.getCuentas(data)
    .then(cuentas => {
        res.status(200)
            .json(cuentas);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.obtenerCuenta = ( req, res ) => {
    const NumCuenta = req.params.NumCuenta;

    CuentaModel.getCuenta( NumCuenta )
    .then(cuenta => {
        res.status(200)
            .json(cuenta);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};