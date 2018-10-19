USE ATOMIC_RESTAURANTE;
GO
--// Valores predeterminados tabla moneda
SET IDENTITY_INSERT  dbo.FACTURACION_MONEDA ON
GO
INSERT INTO dbo.FACTURACION_MONEDA(IdMoneda, Principal, Nombre, CodigoIso, Simbolo)
VALUES	(1,1,'Córdoba','NIO','C$'),				(2,0,'Dólar Estadounidense','USD','$'),(3,0,'Euro','EUR','€'),(4,0,'Yuan Chino','CNY','¥'),(5,0,'Nuevo Dólar Taiwanés','TWD','NT$'),
		(6,0,'Colón Costarricense', 'CRC','₡'),	(7,0,'Lempira hondureño','HNL','L'),(8,0,'Quetzal','GTQ','Q')
GO
SET IDENTITY_INSERT dbo.FACTURACION_MONEDA	OFF
GO
--// Valores predeterminados tabla pais
SET IDENTITY_INSERT dbo.PAIS ON
GO

--// Paises Contenidos por defecto en el Sistema
INSERT INTO PAIS(IdPais,IdMoneda, NombrePais, CodigoAlfa3, CodigoNumerico, PrefijoTelefonico)
VALUES(1, 1,'Nicaragua', 'NIC',558, '505'),(2,2,'Estados Unidos','USA',840,'001'), (3,5,'Taiwán (República de China)','TWN',158,'886'),(4,4,'China','CHN', 156, '086'),
	(5,6,'Costa Rica','CRI', 188,'506'),(6,7,'Honduras','HND',340,'504'),(7,8,'Guatemala','GTM',320,'502')
GO
SET IDENTITY_INSERT dbo.PAIS OFF
GO

--// Procedencias de Productos Determinadas
SET IDENTITY_INSERT dbo.PROCEDENCIA_PRODUCTO ON; 
GO
INSERT INTO dbo.PROCEDENCIA_PRODUCTO(IdProcedencia,Nombre,Descripcion)
VALUES	(1, 'Proveedor','Productos que ingresan directo del proveedor.')
		,(2, 'Mercado','Productos que se compran en el mercado.')
        ,(3, 'Bodega central','Productos que provienen de la bodega central.')
        ,(4, 'Area de Produccion','Productos que se elabora en la planta de produccion.')
        ,(5, 'Traslado Bodega Central','Productos que provienen de la Bodega central.')
		,(6, 'Proveedor Extranjero', 'Productos que ingresan de un proveedor de otro pais.');
GO
SET IDENTITY_INSERT dbo.PROCEDENCIA_PRODUCTO OFF;
GO
--// Tipos de Documentos de Identificacion  Predeterminados
SET IDENTITY_INSERT dbo.TIPO_DOCUMENTO_IDENTIFICACION ON;
GO
INSERT INTO dbo.TIPO_DOCUMENTO_IDENTIFICACION(IdTipoDocumento,NombreTD, DescripcionTD)
VALUES(1,'Cedula',NULL),(2,'Numero RUC', 'Registro Unico de Contribuyentes.')
GO
SET IDENTITY_INSERT dbo.TIPO_DOCUMENTO_IDENTIFICACION OFF;
GO
SET IDENTITY_INSERT dbo.CARGO ON;
GO
INSERT INTO CARGO(NombreCargo, CodCargo, DescripcionCargo) 
VALUES (1,'Propietario','PROP','Propietario del restaurante')
		,(2, 'Gerente General','GEGN',		NULL)
		,(3, 'Gerente Produccion','GEPR',	NULL)
        ,(4, 'Chofer','CHOF', NULL)
        ,(5, 'Bodeguero','BODE','Encargado del manejo de los inventarios.')
        ,(6, 'Encargado de Sucursal','ESUC','Encargado del funcionamiento de la Sucursal.');
GO
SET IDENTITY_INSERT dbo.CARGO OFF;
GO	
INSERT INTO MOTIVO_BAJA_PRODUCTO(Nombre,Descripcion) 
VALUES	('Extravio','El/Los productos se extraviaron')
		,('Vencimiento','El/Los productos se vencieron.')
        ,('Robo','El/Los productos fueron robados')
        ,('Accidente','El/Los productos se hecho a perder en un accidente.')
        ,('Venta','El/Los PRODUCTOs fueron vendidos.');
GO
SET IDENTITY_INSERT dbo.CLASIFICACION_UNIDAD_MEDIDA ON;
GO
INSERT INTO CLASIFICACION_UNIDAD_MEDIDA(NombreClasificacion,Descripcion) 
VALUES	(1,'Masa','Miden el peso del producto.')
		,(2,'Volumen','Miden el espacio que ocupa el producto.');
GO
SET IDENTITY_INSERT dbo.CLASIFICACION_UNIDAD_MEDIDA OFF;
GO
SET IDENTITY_INSERT dbo.CATEGORIA_PRODUCTO ON;
GO
INSERT INTO  CATEGORIA_PRODUCTO(IdCategoria,NombreCategoria,DescripcionCategoria) 
VALUES	(1,'Producto Seco','Todos aquellos productos que no necesitan refrigeracion.')
		,(2,'Carnes','Todas los tipos de carnes.'),(3,'Salsas','Todos los tipos de salsas')
		,(4,'Bebidas','Todos los distINTos tipos de bebidas y marcas.')
		,(5,'Verduras','Todos los distINTos tipos de verduras.');
GO
SET IDENTITY_INSERT dbo.CATEGORIA_PRODUCTO OFF;
GO
SET IDENTITY_INSERT dbo.CLASIFICACION_PRODUCTO ON;
GO
INSERT INTO CLASIFICACION_PRODUCTO(IdCategoria, NombreClasificacion, DescripcionClasificacion) 
VALUES	(2, 'Pollo','Las distINTas cortes de pollo.')
		,(1,'Pastas','DistINTos tipos de pasta')
		,(1, 'Granos Basicos',NULL)
GO
SET IDENTITY_INSERT dbo.CLASIFICACION_PRODUCTO OFF;
GO
INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubClasificacion,DescripcionSubclasificacion) 
VALUES (1,'Filete','Filete de pollo entero.')
		,(1,'Tira','Pollo Cortado en tiras.')
        ,(2,'Tallarin','Tallarin');

GO
SET IDENTITY_INSERT dbo.UNIDAD_MEDIDA ON;
GO
INSERT INTO UNIDAD_MEDIDA(IdUnidadMedida, IdClasifUnidadMedida, NombUnidad,Simbolo, FactorConversion, IdUnidadMedidaBase) 
VALUES	( 1, 1,'Libra',	'	Lb',	1,		NULL)
		,(2, 1,'Gramo',		'g',	1,		NULL)
		,(3, 1,'Kilogramo',	'Kg',	1000,	2)
		,(6, 1,'Miligramo',	'Mg',	0.001,  2)
		,(4, 2,'Litro',		'Lt',	1,		NULL)
		,(5, 2,'Mililitro',	'Ml',	0.001,	4)
GO
SET IDENTITY_INSERT dbo.UNIDAD_MEDIDA OFF;

GO
INSERT INTO ESTADO_PRODUCTO(Nombre,Descripcion)
VALUES ('Sin Procesar','Producto que no se ha procesado')
		,('Semiterminado','Producto que se esta procesando.')
        ,('Terminado','Producto terminado.');
GO

INSERT INTO ESTADO_EMPAQUE(NombreEstado) 
VALUES	('Cerrado/Completo')
		,('Abierto/Incompleto')
		,('Sin EMPAQUE/No viene empacado');

GO

INSERT INTO dbo.TIPO_MOVIMIENTO_UBICACION_INSUMO(IdTipMov, NombTipMov)
VALUES(1,'Creacion Ubicacion Insumos'), (2,'Edicion Ubicacion Insumos'), (3,'Inhabilitacion Ubicacion'), (4,'Habilitacion Ubicacion')

INSERT INTO dbo.TIPO_MOVIMIENTO_UBICACION_INSUMO(IdTipMov, NombTipMov)
VALUES(5,'Creacion Nivel Ubicacion'),(6, 'Edicion Nivel Ubicacion'), (7, 'Inhabilitacion Nivel Ubicacion'), (8, 'Habilitacion Nivel Ubicacion')

INSERT INTO dbo.TIPO_MOVIMIENTO_UBICACION_INSUMO(IdTipMov, NombTipMov)
VALUES(9,'Creacion Casilla Ubicacion'), (10, 'Edicion Casilla Ubicacion'), (11, 'Inhabilitacion Casilla Ubicacion'), (12, 'Habilitacion Casilla Ubicacion')
