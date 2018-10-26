let sql  = require('mssql');
let db = require('../services/database');

class CompraInsumosModel {
    constructor() {
        this.aoj = [];
    }

    async createFacturaCompra( data ) {
        this.aoj = [];

        db.pushAOJParam(aoj, 'NumRefFactura',       sql.NVarChar(50),   data.NumRefFactura);
        db.pushAOJParam(aoj, 'IdProveedor',         sql.Int,            data.IdProveedor);
        db.pushAOJParam(aoj, 'IdTrabajador',        sql.Int,            data.IdTrabajador);
        db.pushAOJParam(aoj, 'IdTipoMoneda',        sql.Int,            data.IdTipoMoneda);
        db.pushAOJParam(aoj, 'IdFormaPago',         sql.Int,            data.IdFormaPago);
        db.pushAOJParam(aoj, 'NombVendedor',        sql.NVarChar(100),  data.NombVendedor);
        db.pushAOJParam(aoj, 'FechaFactura',        sql.Date,           data.FechaFactura);
        db.pushAOJParam(aoj, 'FechaRecepcion',      sql.Date,           data.FechaRecepcion);
        db.pushAOJParam(aoj, 'SubTotal',            sql.Numeric(14,2),  data.SubTotal);
        db.pushAOJParam(aoj, 'TotalIva',            sql.Numeric(14,2),  data.TotalIva);
        db.pushAOJParam(aoj, 'CambioActual',        sql.Numeric(14,2),  data.CambioActual);
        db.pushAOJParam(aoj, 'TotalDescuento',      sql.Numeric(14,2),  data.TotalDescuento);
        db.pushAOJParam(aoj, 'TotalCordobas',       sql.Numeric(14,2),  data.TotalCordobas);
        db.pushAOJParam(aoj, 'TotalOrigenFactura',  sql.Numeric(14,2),  data.TotalOrigenFactura);
        db.pushAOJParam(aoj, 'Retencion',           sql.Bit,            data.Retencion);
        db.pushOutParam(aoj, 'IdFactura',           sql.Int);
        return db.storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    }
    
    async updateFacturaCompra( data ) {
        this.aoj    = [];

        db.pushAOJParam(aoj, 'NumRefFactura',   sql.NVarChar(50),   data.NumRefFactura);
        db.pushAOJParam(aoj, 'IdProveedor',     sql.Int,            data.IdProveedor);
        db.pushAOJParam(aoj, 'IdTrabajador',    sql.Int,            data.IdTrabajador);
        db.pushAOJParam(aoj, 'NombVendedor',    sql.NVarChar(100),  data.NombVendedor);
        db.pushAOJParam(aoj, 'FechaIngreso',    sql.Date,           data.FechaIngreso);
        db.pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        db.pushAOJParam(aoj, 'TotalIva',        sql.Numeric(14,2),  data.TotalIva);
        db.pushAOJParam(aoj, 'CambioActual',    sql.Numeric(14,2),  data.CambioActual);
        db.pushAOJParam(aoj, 'TotalDescuento',  sql.Numeric(14,2),  data.TotalDescuento);
        db.pushAOJParam(aoj, 'TotalCordobas',   sql.Numeric(14,2),  data.TotalCordobas);
        db.pushAOJParam(aoj, 'Retencion',       sql.Bit,            data.Retencion);
        db.pushOutParam(aoj, 'IdFactura',       sql.Int);
        return db.storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    }
    
    
    async createDetalleFacturaCompra( data ) {
        let aoj = [];

        db.pushOutParam(aoj, 'IdDetalle',       sql.Int);
        db.pushAOJParam(aoj, 'IdFactura',       sql.Int,            data.IdFactura);
        db.pushAOJParam(aoj, 'IdProducto',      sql.Int,            data.IdProducto);
        db.pushAOJParam(aoj, 'PrecioUnitario',  sql.Numeric(14,2),  data.PrecioUnitario);
        db.pushAOJParam(aoj, 'Cantidad',        sql.Int,            data.Cantidad);
        db.pushAOJParam(aoj, 'GravadoIva',      sql.Bit,            data.GravadoIva);
        db.pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        db.pushAOJParam(aoj, 'Iva',             sql.Numeric(14,2),  data.Iva);
        db.pushAOJParam(aoj, 'Descuento',       sql.Numeric(14,2),  data.Descuento);
        db.pushAOJParam(aoj, 'TotalDetalle',    sql.Numeric(14,2),  data.TotalDetalle);
        db.pushAOJParam(aoj, 'Bonificacion',    sql.Bit,            data.Bonificacion);
        return db.storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    }
    
    async updateDetalleFacturaCompra( data ) {
        let aoj = [];
     
        db.pushAOJParam(aoj, 'IdFactura',       sql.Int,            data.IdFactura);
        db.pushAOJParam(aoj, 'IdProducto',      sql.Int,            data.IdProducto);
        db.pushAOJParam(aoj, 'PrecioUnitario',  sql.Numeric(14,2),  data.PrecioUnitario);
        db.pushAOJParam(aoj, 'Cantidad',        sql.Int,            data.Cantidad);
        db.pushAOJParam(aoj, 'GravadoIva',      sql.Bit,            data.GravadoIva);
        db.pushAOJParam(aoj, 'SubTotal',        sql.Numeric(14,2),  data.SubTotal);
        db.pushAOJParam(aoj, 'Iva',             sql.Numeric(14,2),  data.Iva);
        db.pushAOJParam(aoj, 'Descuento',       sql.Numeric(14,2),  data.Descuento);
        db.pushAOJParam(aoj, 'TotalDetalle',    sql.Numeric(14,2),  data.TotalDetalle);
        db.pushAOJParam(aoj, 'Bonificacion',    sql.Bit,            data.Bonificacion);
        return db.storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    }
    
    
    async getFacturaById( IdFactura ) {
        let aoj = [];
     
        db.pushAOJParam(aoj, 'IdFactura',   sql.Int,    data.IdFactura);
        return db.storedProcExecute('USP_GET_FACTURA_BY_ID',aoj)
    }
    
    
    async getCambiosFacturaById( IdFactura ) {
        let aoj = [];

        db.pushAOJParam(aoj, 'IdFactura',       sql.Int,        IdFactura);
        return db.storedProcExecute('USP_GET_CAMBIOS_FACTURA_BY_ID',aoj)
    }
    
    
    async obtenerFacturasCompra({IdFechaFiltro, FechaInicio, FechaFin, IdProveedor, IdEstadoFactura} = {} ) {
        let aoj = [];
        
        db.pushAOJParam(aoj, 'IdFechaFiltro',   sql.Int,        IdFechaFiltro);
        db.pushAOJParam(aoj, 'FechaInicio',     sql.Date,       FechaInicio);
        db.pushAOJParam(aoj, 'FechaFin',        sql.Date,       FechaFin);
        db.pushAOJParam(aoj, 'IdProveedor',     sql.Int,        IdProveedor);
        db.pushAOJParam(aoj, 'IdEstadoFactura', sql.Int,        IdEstadoFactura);
        return db.storedProcExecute('USP_GET_FACTURAS_COMPRA',aoj)
    }       
}

module.exports = CompraInsumosModel;