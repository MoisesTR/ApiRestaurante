const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const GrupoCuentaModel = require('../../models/contabilidad/grupoCuenta');

exports.getGrupoCuenta = (req, res) => {
    const data = matchedData(req,{locations: ['params']});

    GrupoCuentaModel.getGrupoCuenta( data.IdGrupo )
    .then(grupo => {
        res.status(200)
            .json(grupo);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.getGruposCuenta = (req, res) => {
    const data = matchedData(req);
    
    GrupoCuentaModel.getGruposCuentas(data)
    .then(grupos => {
        res.status(200)
            .json(grupos);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.createGrupoCuenta = (req, res) => {
    const data = matchedData(req);
    const GrupoCuenta = new GrupoCuentaModel();

    GrupoCuenta.createGrupoCuenta(data)
    .then((result) => {
        res.status(200)
            .json(result);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};