
const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const TipoDocumentoModel = require('../../models/contabilidad/tipoDocumento');

exports.getTipoDocumento = (req, res) => {
    const data = matchedData(req,{locations: ['params']});

    TipoDocumentoModel.getTipoDocumento( data.IdTipDoc )
    .then(tipdoc => {
        res.status(200)
            .json(tipdoc);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.getTiposDocumentos = (req, res) => {
    const data = matchedData(req, {locations:['query']});
    
    TipoDocumentoModel.getTiposDocumentos(data)
    .then(tipdocs => {
        res.status(200)
            .json(tipdocs);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.createTipoDocumento = (req, res) => {
    const data = matchedData(req);
    const TipoDocumento = new TipoDocumento();

    TipoDocumento.createTipoDocumento(data)
    .then((result) => {
        res.status(200)
            .json({success: 'Tipo documento creado con exito!', IdTipDoc: result.output.IdTipDoc});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.updateTipoDocumento = (req, res) => {
    const data = matchedData(req);
    const TipoDocumento = new TipoDocumentoModel();

    TipoDocumento.updateTipoDocumento(data)
    .then((result) => {
        res.status(200)
            .json({success: 'Tipo Documento actualizado con exito.'});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};
