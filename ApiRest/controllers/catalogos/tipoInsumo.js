const { matchedData }   = require('express-validator/filter');
const { mssqlErrors }   = require('../../Utils/util');
const TipoInsumoModel = require('../../models/catalogos/tipoInsumo');


exports.getTipoInsumo = ( req, res ) => {
    const Id = +req.params.IdTipInsumo;
  
    TipoInsumoModel.getTipoInsumo( Id )
    .then( insumo => {
        res.status(200)
            .json(insumo);
    }).catch((err) => {
        res.status(err.status || 500)
        .json(mssqlErrors(err))
    });
};

exports.getTiposInsumo = ( req, res ) => {
    const data = matchedData(req);
        
    TipoInsumoModel.getTiposInsumo( data )
    .then( insumos => {
        res.status(200)
            .json(insumos);
    })
    .catch((err) => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    });
};
    
exports.createTipoInsumo = ( req, res ) => {
    const data = matchedData(req);
    
    TipoInsumoModel.createTipoInsumo( data.NombTipInsumo, data.DescTipInsumo )
    .then((result) => {
        res.status(200)
            .json({success: 'Insumo creado con exito!'})
    }).catch((err) => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    });
};