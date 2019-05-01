const { matchedData, mssqlErrors} = require('../../Utils/defaultImports');
const BodegaSucursalModel = require('../../models/restaurante/bodegaSucursal');
const DetalleBodSucModel = require('../../models/restaurante/detalleBodSucursal');

exports.getBodega = ( req, res, next ) => {
    const {IdSucursal, IdTipBode} = matchedData(req, {locations: ['body']});
    
    BodegaSucursalModel.getBodega(IdSucursal, IdTipBode)
    .then(bodega => {
        res.status(200)
            .json(bodega);
    }).catch((err) => {
        next(err);
    });
}

exports.getDetalleBodega = ( req, res, next ) => {
    const data = matchedData(req, {locations: ['body']});
  
    DetalleBodSucModel.getDetalle()
    .then(detalle => {
        res.status(200) 
            .json(detalle);
    }).catch((err) => {
        next(err);
    });

}

exports.createDetalle = (req, res, next) => {
    const data = matchedData(req, {locations: ['body']});
  
    DetalleBodSucModel.getDetalle()
    .then(detalle => {
        res.status(200) 
            .json(detalle);
    }).catch((err) => {
        next(err);
    });
}
