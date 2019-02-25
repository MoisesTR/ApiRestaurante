const   { matchedData } = require('express-validator/filter');
const   {mssqlErrors }      = require('../Utils/util');
const   CompraInsumosModel  = require('../models/CompraInsumos');
const   MovimientoCuenta    = require('../models/contabilidad/movimientoCuenta');
const   sql = require('mssql');
const   { getConnectionPoolGlobal }   = require('../config/mssqlConfig');
const   CompraInsumos       = new CompraInsumosModel();

exports.createFacturaCompra = (req, res) => {
    let data = matchedData(req);
    
    CompraInsumos.createFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({
                    IdFactura: result.output.IdFactura
                });
    })
    .catch( err => res.status(500).json( mssqlErrors(err) ) )
}

exports.bulkCreateFacturaCompra = async ( req, res, next ) =>  {
    const data = matchedData(req);
    
    try {
        const pool = await getConnectionPoolGlobal();
        const tran = new sql.Transaction(pool); 
        const err = await tran.begin();
        const resInFact = await CompraInsumos.createFacturaCompra( data, tran );
        const IdFactura = resInFact.output.IdFactura;
         
        const table = new sql.Table('DETALLE_FACTURA_COMPRA');
            // table.columns.add('IdDetalle',       sql.Int,   {nullable: false, primary: true, identi}); 
        table.columns.add('IdFactura',       sql.Int,   {nullable: false});
        table.columns.add('IdProducto',      sql.Int,   {nullable: false});
        table.columns.add('PrecioUnitario',  sql.Numeric(17,5), {nullable: false});
        table.columns.add('Cantidad',        sql.Numeric(17,5), {nullable: false});
        table.columns.add('GravadoIva',      sql.Bit,   {nullable: false});
        table.columns.add('SubTotal',        sql.Numeric(17,5), {nullable: false});
        table.columns.add('Iva',             sql.Numeric(17,5), {nullable: false});
        table.columns.add('Descuento',       sql.Numeric(17,5), {nullable: false});
        table.columns.add('TotalDetalle',    sql.Numeric(17,5), {nullable: false});
        table.columns.add('Bonificacion',    sql.Bit,   {nullable: true});
        
        for (let i = 0; i < productos.length; i++) {
            let {IdProducto, PrecioUnitario, Cantidad, GravadoIva, SubTotal, Iva, Descuento, TotalDetalle, Bonificacion} = productos[i];
            table.rows.add(
                IdFactura,
                IdProducto,
                PrecioUnitario,
                Cantidad,
                GravadoIva,
                SubTotal,
                Iva,
                Descuento,
                TotalDetalle,
                Bonificacion,
            );  
        }
        const insDetail = await tran.request()
                                    .bulk(table);

        // Aqui tendrian que ir las inserciones a los documentos y cuentas

        tran.commit();
        res.status(201)
            .json({
                IdFactura,
                message: "Factura ingresada con exito!!"
            })
    } catch( _err ) {
        if ( (_err.code !== 'ENOTBEGUN') && !!tran ) {
            tran.rollback((err) => {
                if ( err ) {
                    console.error('Error Haciendo Rollback');
                }   else  {
                    console.log('Rollback Transaction Exitoso.');
                }
            })
        }
        next(_err);
    }
}

exports.updateFacturaCompra = (req, res) => {
    const data = matchedData(req);

    CompraInsumos.updateFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({IdFactura: result.output.IdFactura})
    })
    .catch(err  => res.status(500).json (mssqlErrors(err) ))
}


exports.createDetalleFacturaCompra = (req, res) => {
    let data = matchedData(req);
   
    CompraInsumos.createDetalleFacturaCompra( data )
    .then((result) => {
        res.status(200)
            .json({IdDetalle: result.output.IdDetalle})
    })
    .catch((err) => {
        res.status(500)
            .json(mssqlErrors(err))
    })
}

exports.updateDetalleFacturaCompra = (req, res) => {
    let data = matchedData(req);

    CompraInsumos.updateDetalleFacturaCompra( data )
    .then((result) => {
        res.status(200).json({IdDetalle: result.output.IdDetalle})
    })
    
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}


exports.getFacturaById = (req, res ) => {
    let data = matchedData(req,{locations:['params','query','body']});
    
    CompraInsumos.getFacturaById( data.IdFactura ) 
    .then((result) => {
            
        res.status(200)
            .json({
                    factura:result.recordset[0]['Factura'][0]
                })
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err))
        console.error(err)
    })
}


exports.getCambiosFacturaById = (req, res ) => {
    let data = matchedData(req,{locations:['params','query','body']});
    
    CompraInsumos.getCambiosFacturaById( data.IdFactura )
    .then((result) => {
        res.status(200)
            .json({cambios:result.recordset})
    })
    .catch( err =>   res.status(500).json( mssqlErrors(err) )  )
}


exports.obtenerFacturasCompra = (req, res ) => {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    
    CompraInsumos.obtenerFacturasCompra( data )
    .then((result) => {
        res.status(200)
            .json({
                    facturas:result.recordset
                });
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err));
        console.error(err);
    })  
}

exports.getFacturasIngresadas = (req, res ) => {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    
    CompraInsumos.getFacturasIngresadas( data )
    .then((result) => {
        res.status(200)
            .json({
                    facturas:result.recordset
                });
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err));
        console.error(err);
    })  
}


exports.getProductosMasComprados = (req, res ) => {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    
    CompraInsumos.getProductosMasComprados( data )
    .then((result) => {
        res.status(200)
            .json({
                productostop:result.recordset
                });
    })
    .catch((err) =>  {
        res.status(500)
            .json(mssqlErrors(err));
        console.error(err);
    })  
}