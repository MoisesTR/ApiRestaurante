const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const TipoCambio = require('../../models/facturacion/TipoCambio');

exports.getTiposCambio = (req, res) => {
    const data = matchedData(req);

    TipoCambio.getTiposCambio()
    .then(tiposCambio => {
        res.status(200)
            .json(tiposCambio);
    }).catch((err) => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    });
  
};

exports.getTipoCambio = (req, res) => {
    const data = matchedData(req);

    TipoCambio.getTipoCambio()
    .then(tipoCambio => {
        res.status(200)
            .json(tipoCambio);
    }).catch((err) => {
        res.status(err.status || 500)
            .json( mssqlErrors(err) )
    });
};

exports.createTipoCambio = (req, res) => {
    const data = matchedData(req, {locations: ['body']});
  
    TipoCambio.createTipoCambio()
    .then(tipoCambio => {
        res.status(200)
            .json({
                success: 'Tipo de Cambio creado con Exito!'
            })
    }).catch((err) => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    });
};

exports.disHableTipoCambio = (req, res) => {
  
    TipoCambio.disHableTipoCambio()
    .then(result => {
        
    }).catch((err) => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    });
};