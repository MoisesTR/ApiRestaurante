const { sql, pushAOJParam } = require('../Utils/defaultImports')

class BodegaAp {
    
    createEntradaBodegaAp( data ) { 
        const aoj     = [];

        pushAOJParam(aoj,    'IdBodegaAreap',            sql.Int,            data.IdBodegaAreaP);
        pushAOJParam(aoj,    'IdTrabajador',             sql.Int,            data.IdTrabajador);
        pushAOJParam(aoj,    'IdProveedor',              sql.Int,            data.IdProveedor);
        pushAOJParam(aoj,    'NFactura',                 sql.NVarChar(20),   data.NFactura);
        pushAOJParam(aoj,    'RepresentanteProveedor',   sql.NVarChar(50),   data.RepresentanteProveedor);
        pushAOJParam(aoj,    'PorcRetencion',            sql.Int,            data.PorcRetencion);
        pushAOJParam(aoj,    'PorcIva',                  sql.Int,            data.PorcIva);
        pushAOJParam(aoj,    'PorcDescuento',            sql.Int,            data.PorcDescuento);
        pushAOJParam(aoj,    'FechaHora',                sql.Date,           data.FechaHora);
        return storedProcExecute('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }

    
    createDetalleEntrada( data ) { 
        const aoj = [];

        pushAOJParam(aoj,    'IdEntradaBodegaAP',    sql.Int,    data.IdEntradaBodegaAP);
        pushAOJParam(aoj,    'IdProductoProveedor',  sql.Int,    data.IdProductoProveedor);
        pushAOJParam(aoj,    'Cantidad',             sql.Int,    data.Cantidad);
        pushAOJParam(aoj,    'PrecioUnitarioEntrada',sql.Money,  data.PrecioUnitarioEntrada);
        pushAOJParam(aoj,    'DescuentoCalculado',   sql.Money,  data.DescuentoCalculado);
        return storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }

    createDetalleEntrada( data ) { 
        const aoj = [];

        pushAOJParam(aoj,    'IdEntradaBodegaAP',    sql.Int,    data.IdEntradaBodegaAP);
        pushAOJParam(aoj,    'IdProductoProveedor',  sql.Int,    data.IdProductoProveedor);
        pushAOJParam(aoj,    'Cantidad',             sql.Int,    data.Cantidad);
        pushAOJParam(aoj,    'PrecioUnitarioEntrada',sql.Money,  data.PrecioUnitarioEntrada);
        pushAOJParam(aoj,    'DescuentoCalculado',   sql.Money,  data.DescuentoCalculado);
        return storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }
    
    getDetalleBodegaAp( IdBodegaAreaP ) {
        const aoj=[];

        pushAOJParam( aoj,   'IdBodegaAreaP',    sql.Int,    IdBodegaAreaP);
        return storedProcExecute('USP_GET_DETALLE_BODEGA_AP',aoj)
    }
    
    generarFactura ( IdEntradaBodegaAP ) {
        const aoj =[];

        pushAOJParam( aoj,   'IdEntradaBodegaAP',    IdEntradaBodegaAP)
        return storedProcExecute('USP_GENERAR_FACTURA',aoj)
    }
}

module.exports = BodegaAp;