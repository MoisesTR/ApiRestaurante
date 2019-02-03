const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const DocumentoModel  = require('../../models/contabilidad/documento');

exports.crearDocumento = (req,res) => {
    const data = matchedData(req, {locations: ['body']});
  
    const Documento = new DocumentoModel();
    Documento.createDocumento(data)
    .then(result => {
        res.status(200)
            .json({success: 'Documento creada con exito.', NumDocumento: result.output.IdDocumento});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.updateDocumento = (req, res) => {
    const data = matchedData(req, {locations: ['body']});
  
    const Documento = new DocumentoModel();
    Documento.updateDocumento(data)
    .then(result => {
        res.status(200)
            .json({success: 'Documento actualizado con exito.'});
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
}

exports.getDocumento = (req, res) => {
    const {IdDocumento} = req.params;

    DocumentoModel.getDocumento( IdDocumento )
    .then(cuenta => {
        res.status(200)
            .json(cuenta);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};

exports.getDocumentos = (req, res) => {
    const data = matchedData(req, {locations: ['query']});

    DocumentoModel.getDocumentos(data)
    .then(cuentas => {
        res.status(200)
            .json(cuentas);
    }).catch((err) => {
        res.status(err.status || 500) 
            .json(mssqlErrors(err))
    });
};