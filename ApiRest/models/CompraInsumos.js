const { sql, pushAOJParam, storedProcExecute } = require('../Utils/defaultImports');

class CompraInsumosModel {
    constructor() {
        this.aoj = [];
    }

    async createFacturaCompra( data ) {
        this.aoj = [];

        pushAOJParam(aoj, 'NumRefFactura',       sql.NVarChar(50),   data.NumRefFactura);
        pushAOJParam(aoj, 'IdProveedor',         sql.Int,            data.IdProveedor);
        pushAOJParam(aoj, 'IdTrabajador',        sql.Int,            data.IdTrabajador);
        pushAOJParam(aoj, 'IdTipoMoneda',        sql.Int,            data.IdTipoMoneda);
        pushAOJParam(aoj, 'IdFormaPago',         sql.Int,            data.IdFormaPago);
        pushAOJParam(aoj, 'NombVendedor',        sql.NVarChar(100),  data.NombVendedor);
        pushAOJParam(aoj, 'FechaFactura',        sql.Date,           data.FechaFactura);
        pushAOJParam(aoj, 'FechaRecepcion',      sql.Date,           data.FechaRecepcion);
        pushAOJParam(aoj, 'SubTotal',            sql.Numeric(14,2),  data.SubTotal);
        pushAOJParam(aoj, 'TotalIva',            sql.Numeric(14,2),  data.TotalIva);
        pushAOJParam(aoj, 'CambioActual',        sql.Numeric(14,2),  data.CambioActual);
        pushAOJParam(aoj, 'TotalDescuento',      sql.Numeric(14,2),  data.TotalDescuento);
        pushAOJParam(aoj, 'TotalCordobas',       sql.Numeric(14,2),  data.TotalCordobas);
        pushAOJParam(aoj, 'TotalOrigenFactura',  sql.Numeric(14,2),  data.TotalOrigenFactura);
        pushAOJParam(aoj, 'Retencion',           sql.Bit,            data.Retencion);
        pushOutParam(aoj, 'IdFactura',           sql.Int);
        return storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    }
    
    async updateFacturaCompra( data ) {
        this.aoj    = [];

        pushAOJParam(aoj, 'NumRefFactura',   sql.NVarChar(50),   data.NumRefFactura);
        pushAOJParam(aoj, 'IdProveedor',     sql.Int,            data.IdProveedor);
        pushAOJParam(aoj, 'IdTrabajador',    sql.Int,            data.IdTrabajador);
        pushAOJParam(aoj, 'NombVendedor',    sql.NVarChar(100),  data.NombVendedor);
        pushAOJParam(aoj, 'FechaIngreso',    sql.Date,           data.FechaIngreso);
        pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        pushAOJParam(aoj, 'TotalIva',        sql.Numeric(14,2),  data.TotalIva);
        pushAOJParam(aoj, 'CambioActual',    sql.Numeric(14,2),  data.CambioActual);
        pushAOJParam(aoj, 'TotalDescuento',  sql.Numeric(14,2),  data.TotalDescuento);
        pushAOJParam(aoj, 'TotalCordobas',   sql.Numeric(14,2),  data.TotalCordobas);
        pushAOJParam(aoj, 'Retencion',       sql.Bit,            data.Retencion);
        pushOutParam(aoj, 'IdFactura',       sql.Int);
        return storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    }
    
    
    async createDetalleFacturaCompra( data ) {
        let aoj = [];

        pushOutParam(aoj, 'IdDetalle',       sql.Int);
        pushAOJParam(aoj, 'IdFactura',       sql.Int,            data.IdFactura);
        pushAOJParam(aoj, 'IdProducto',      sql.Int,            data.IdProducto);
        pushAOJParam(aoj, 'PrecioUnitario',  sql.Numeric(14,2),  data.PrecioUnitario);
        pushAOJParam(aoj, 'Cantidad',        sql.Int,            data.Cantidad);
        pushAOJParam(aoj, 'GravadoIva',      sql.Bit,            data.GravadoIva);
        pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        pushAOJParam(aoj, 'Iva',             sql.Numeric(14,2),  data.Iva);
        pushAOJParam(aoj, 'Descuento',       sql.Numeric(14,2),  data.Descuento);
        pushAOJParam(aoj, 'TotalDetalle',    sql.Numeric(14,2),  data.TotalDetalle);
        pushAOJParam(aoj, 'Bonificacion',    sql.Bit,            data.Bonificacion);
        return storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    }
    
    async updateDetalleFacturaCompra( data ) {
        let aoj = [];
     
        pushAOJParam(aoj, 'IdFactura',       sql.Int,            data.IdFactura);
        pushAOJParam(aoj, 'IdProducto',      sql.Int,            data.IdProducto);
        pushAOJParam(aoj, 'PrecioUnitario',  sql.Numeric(14,2),  data.PrecioUnitario);
        pushAOJParam(aoj, 'Cantidad',        sql.Int,            data.Cantidad);
        pushAOJParam(aoj, 'GravadoIva',      sql.Bit,            data.GravadoIva);
        pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        pushAOJParam(aoj, 'Iva',             sql.Numeric(14,2),  data.Iva);
        pushAOJParam(aoj, 'Descuento',       sql.Numeric(14,2),  data.Descuento);
        pushAOJParam(aoj, 'TotalDetalle',    sql.Numeric(14,2),  data.TotalDetalle);
        pushAOJParam(aoj, 'Bonificacion',    sql.Bit,            data.Bonificacion);
        return storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    }
    
    
    async getFacturaById( IdFactura ) {
        let aoj = [];
     
        pushAOJParam(aoj, 'IdFactura',   sql.Int,    IdFactura);
        return storedProcExecute('USP_GET_FACTURA_BY_ID',aoj)
    }
    
    
    async getCambiosFacturaById( IdFactura ) {
        let aoj = [];

        pushAOJParam(aoj, 'IdFactura',       sql.Int,        IdFactura);
        return storedProcExecute('USP_GET_CAMBIOS_FACTURA_BY_ID',aoj)
    }
    
    
    async obtenerFacturasCompra({IdFechaFiltro, FechaInicio, FechaFin, IdProveedor, IdEstadoFactura} = {} ) {
        let aoj = [];
        
        pushAOJParam(aoj, 'IdFechaFiltro',   sql.Int,        IdFechaFiltro);
        pushAOJParam(aoj, 'FechaInicio',     sql.Date,       FechaInicio);
        pushAOJParam(aoj, 'FechaFin',        sql.Date,       FechaFin);
        pushAOJParam(aoj, 'IdProveedor',     sql.Int,        IdProveedor);
        pushAOJParam(aoj, 'IdEstadoFactura', sql.Int,        IdEstadoFactura);
        return storedProcExecute('USP_GET_FACTURAS_COMPRA',aoj)
    }       
}

module.exports = CompraInsumosModel;