INSERT INTO PROCEDENCIA_PRODUCTO(Nombre,Descripcion)
VALUES	('Proveedor','Productos que ingresan directo del proveedor.')
		,('Mercado','Productos que se compran en el mercado.')
        ,('Bodega central','Productos que provienen de la bodega central.')
        ,('Area de Produccion','Productos que se elabora en la planta de produccion.')
        ,('Traslado Bodega Central','Productos que provienen de la Bodega central.');



INSERT INTO TIPO_DOCUMENTO_IDENTIFICACION(IdTipoDocumento,NombreTD, DescripcionTD)
VALUES(1,'Cedula',NULL),(2,'Numero RUC', NULL)
GO
SET IDENTITY_INSERT dbo.TIPO_DOCUMENTO_IDENTIFICACION OFF;

INSERT INTO USO_PRODUCTO(Nombre,Descripcion)
VALUES	('Nuevo/Sin Usar','Producto que no se ha usado.')
		,('En Uso','Producto que se esta usando.')
        ,('Usado/Atado','Producto que se uso hasta atarse.');


INSERT INTO MOTIVO_BAJA_PRODUCTO(Nombre,Descripcion) 
VALUES	('Extravio','El/Los productos se extraviaron')
		,('Vencimiento','El/Los productos se vencieron.')
        ,('Robo','El/Los productos fueron robados')
        ,('Accidente','El/Los productos se hecho a perder en un accidente.')
        ,('Venta','El/Los PRODUCTOs fueron vendidos.');


INSERT INTO CARGO(NombreCargo,DescripcionCargo) 
VALUES ('Propietario','Propietario del restaurante')
		,('Gerente','')
        ,('Chofer','')
        ,('Bodeguero','Encargado del manejo de los inventarios.')
        ,('Encargado de Sucursal','Encargado del funcionamiento de la Sucursal.');
	

INSERT INTO PAIS(NombrePais, Abreviatura, PrefijoTelefonico)
VALUES('Nicaragua', 'NIC','505'), ('China','CH','012')


INSERT INTO CLASIFICACION_UNIDAD_MEDIDA(NombreClasificacion,Descripcion) 
VALUES	('Masa','Miden el peso del producto.')
		,('Volumen','Miden el espacio que ocupa el producto.');


INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo, NImportancia) 
VALUES	(1,'Libra','Lb', 1)
		,(1,'Kilogramo','Kg',1)
		,(2,'Litro','Lt', 2)
		,(2,'Mililitro','Ml', 2)
		,(1,'Miligramo','Mg', 3)
		,(2,'Onza','Oz', 4);


INSERT INTO  CATEGORIA_PRODUCTO(NombreCategoria,DescripcionCategoria) 
VALUES	('Producto Seco','Todos aquellos productos que no necesitan refrigeracion.')
		,('Carnes','Todas los tipos de carnes.'),('Salsas','Todos los tipos de salsas')
		,('Bebidas','Todos los distintos tipos de bebidas y marcas.')
		,('Verduras','Todos los distintos tipos de verduras.');

INSERT INTO CLASIFICACION_PRODUCTO(IdCategoria, NombreClasificacion, DescripcionClasificacion) 
VALUES	(2, 'Pollo','Las distintas cortes de pollo.')
		,(1,'Pastas','Distintos tipos de pasta')
		,(1, 'Granos Basicos',NULL)
		,(4, 'Bebidas Artificiales',NULL)


INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubClasificacion,DescripcionSubclasificacion) 
VALUES (1,'Filete','Filete de pollo entero.')
		,(1,'Tira','Pollo Cortado en tiras.')
        ,(2,'Tallarin','Tallarin')
		,(4, 'Gaseosas',NULL)


INSERT INTO ENVASE(NombreEnvase,Descripcion) 
VALUES	('Botella Plastica','una botella de plastico')
		,('Bolsa Plastica','Bolsa de plastico')
		,('Caja Plastica','Una caja de plastico')
		,('Lata de aluminio','')
		,('Frasco','')
		,('Tarrro','')
		,('Botella de vidrio','Una botella de vidrio.'); 


INSERT INTO EMPAQUE(NombreEmpaque,Descripcion) 
VALUES	('Caja Carton','')
		,('Caja plastica','')
		,('Bolsa Plastica','')
		,('Bolsa Papel Craft','')
		,('Cajilla Plastica','')
		,('Cajilla Carton','')
		,('Saco','');


INSERT INTO ESTADO_PRODUCTO(Nombre,Descripcion)
VALUES ('Sin Procesar','Producto que no se ha procesado')
		,('Semiterminado','Producto que se esta procesando.')
        ,('Terminado','Producto terminado.');


INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES ('Alimento')
INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES('Limpieza')
INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES('Utensilios')



INSERT INTO ESTADO_EMPAQUE(NombreEstado) 
VALUES	('Cerrado/Completo')
		,('Abierto/Incompleto')
		,('Sin EMPAQUE/No viene empacado');


INSERT INTO SUCURSAL(NombreSucursal,Direccion,Telefono1) VALUES('Restaurante Familia Chang - Rubenia','Semforos de Rubenia 1 1/2c al La, frente al Hotel Estrella
#Managua','22492774'),('Restaurante Familia Chang - Ciudad Jardin','Ciudad jardin','22492742');

INSERT INTO ESTADO_EDICION(NombreEstado)
VALUES('Abierta'),('Cerrada')


INSERT INTO PROVEEDOR(IdPais,NombreProveedor,Direccion,Email,Imagen,Descripcion,NombreRepresentante,IdTipoDocumento,Documento,Retencion2,Mercado,CreatedAt)
VALUES (1,'Cargil','De donde fue el cine salinas 2 cuadras abajo 1/2 al la','moisestrigueros@hotmail.com','ninguna','ninguna','Moises',1,'1231231',0,0,GETDATE())
GO
DECLARE @IdProveedor INT;
SET @IdProveedor = (SELECT TOP 1 IdProveedor  FROM PROVEEDOR)

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,IdTipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD12','Filete de pollo','Filetes de pollo','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,IdTipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD13','Tallarin','Bolsa de tallarines','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,IdTipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD14','Camaron','Bolsa de camarones','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,IdTipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD15','Arroz','Bolsa de arroz','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,IdTipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD16','Hons','Bolsa de hons','null')

