
SELECT IdTipDoc,NombTipDoc, DescTipDoc, Habilitado,CreatedAt,UpdatedAt FROM CONTABILIDAD_TIPO_DOCUMENTO
SET IDENTITY_INSERT CONTABILIDAD_TIPO_DOCUMENTO ON;

INSERT INTO CONTABILIDAD_TIPO_DOCUMENTO(IdTipDoc,IdTipCuenta, NombTipDoc)
VALUES(1,5,'Recibo Compra'),(2,4,'Recibo Venta'),(3,NULL,'Cotizacion'),(4,null,'Devolucion'),(5,7,'Pedido'),(6,,'Nota de Credito')
		,(7,'Factura'),(8, 'Cheque'),(9,'Pago Servicio'),(10,'Gasto')

SET IDENTITY_INSERT CONTABILIDAD_TIPO_DOCUMENTO OFF;
INSERT INTO CONTABILIDAD_DOCUMENTO(IdTipDoc, Serie,IdRestaurante, IdSucursal, NombDoc)
VALUES(9, 1,NULL,'PSREST','Pagos Servicios Restaurante',1),(9,1,1,'PSSUC','Pago Servicio Sucursal',1),(1,1,NULL,'CINS','Compra Insumos',1),
		(10,1,NULL,'COTR','Otras Compras',1),D