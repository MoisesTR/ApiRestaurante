const { matchedData }   = require('express-validator/filter');
const { mssqlErrors }   = require('../../Utils/util');
const BancoModel = require('../../models/Banco');

exports.getBancos = ( req, res ) => {
    const data = matchedData(req, {locations: 'query'});
-
    BancoModel.getBancos(data)
    .then(bancos => {
        res.status(200)
            .json(bancos)
    }).catch((err) => {
        res.status(500|| err.code)
            .json(mssqlErrors(err))
    });
}

exports.getBanco = ( req, res ) => {
    const IdBanco = +req.params.IdBanco;

    BancoModel.getBanco( IdBanco )
    .then( banco => {
        res.status(200)
            .json(banco)
    }).catch( err => {
        res.status(500|| err.code)
            .json(mssqlErrors(err))
        });
    }
    
    exports.createBanco = (req, res) => {
        const data  = matchedData(req);
        
        BancoModel.createBanco(data.IdPais, data.Banco, data.Siglas, data.Direccion, data.Telefono1, data.Telefono2, data.Correo, data.Web)
        .then((result) => {
            res.status(200)
                .json({success: 'Banco creado con exito!'})
        }).catch((err) => {
            res.status(500|| err.code)
                .json(mssqlErrors(err))
        });
    }