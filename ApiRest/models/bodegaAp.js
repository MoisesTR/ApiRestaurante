const { sql, pushAOJParam } = require('../Utils/defaultImports')

class BodegaAp {
    
    createEntradaBodegaAp = async ( data ) => { 
        let aoj     = [];

        pushAOJParam(aoj,    'IdBodegaAreap',            sql.Int,            data.IdBodegaAreaP);
        pushAOJParam(aoj,    'IdTrabajador',             sql.Int,            data.IdTrabajador);
        pushAOJParam(aoj,    'IdProveedor',              sql.Int,            data.IdProveedor);
        pushAOJParam(aoj,    'NFactura',                 sql.NVarChar(20),   data.NFactura);
        pushAOJParam(aoj,    'RepresentanteProveedor',   sql.NVarChar(50),   data.RepresentanteProveedor);
        pushAOJParam(aoj,    'PorcRetencion',            sql.Int,            data.PorcRetencion);
        pushAOJParam(aoj,    'PorcIva',                  sql.Int,            data.PorcIva);
        pushAOJParam(aoj,    'PorcDescuento',            sql.Int,            data.PorcDescuento);
        pushAOJParam(aoj,    'FechaHora',                sql.Date,           data.FechaHora);
        return await storedProcExecute('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }

    
    createDetalleEntrada    = async ( data ) => { 
        let aoj = [];

        pushAOJParam(aoj,    'IdEntradaBodegaAP',    sql.Int,    data.IdEntradaBodegaAP);
        pushAOJParam(aoj,    'IdProductoProveedor',  sql.Int,    data.IdProductoProveedor);
        pushAOJParam(aoj,    'Cantidad',             sql.Int,    data.Cantidad);
        pushAOJParam(aoj,    'PrecioUnitarioEntrada',sql.Money,  data.PrecioUnitarioEntrada);
        pushAOJParam(aoj,    'DescuentoCalculado',   sql.Money,  data.DescuentoCalculado);
        return await storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }

    createDetalleEntrada    = async ( data ) => { 
        let aoj = [];

        pushAOJParam(aoj,    'IdEntradaBodegaAP',    sql.Int,    data.IdEntradaBodegaAP);
        pushAOJParam(aoj,    'IdProductoProveedor',  sql.Int,    data.IdProductoProveedor);
        pushAOJParam(aoj,    'Cantidad',             sql.Int,    data.Cantidad);
        pushAOJParam(aoj,    'PrecioUnitarioEntrada',sql.Money,  data.PrecioUnitarioEntrada);
        pushAOJParam(aoj,    'DescuentoCalculado',   sql.Money,  data.DescuentoCalculado);
        return await storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    }
    
    getDetalleBodegaAp = async ( Habilitado ) => {
        let aoj=[];

        pushAOJParam( aoj,   'IdBodegaAreaP',    sql.Int,    Habilitado);
        return await storedProcExecute('USP_GET_DETALLE_BODEGA_AP',aoj)
    }
    
    generarFactura  = async ( IdEntradaBodegaAP ) => {
        let aoj =[];

        pushAOJParam( aoj,   'IdEntradaBodegaAP',    IdEntradaBodegaAP)
        return await storedProcExecute('USP_GENERAR_FACTURA',aoj)
    }
}

module.exports = BodegaAp;