--ENLACE DE PAGINA WEB DONDE ESTA MAS DETALLADO
--https://puc.com.co/
USE ATOMIC_RESTAURANTE;
GO


EXEC USP_DELETE_ALL_F_CONSTRAINT_TABLE 'dbo.CONTABILIDAD_MOVIMIENTO_SUBCUENTA'
EXEC USP_DELETE_ALL_F_CONSTRAINT_TABLE 'dbo.CONTABILIDAD_GRUPO_CUENTA'
EXEC USP_DELETE_ALL_F_CONSTRAINT_TABLE 'dbo.CONTABILIDAD_CUENTA'
EXEC USP_DELETE_ALL_F_CONSTRAINT_TABLE 'dbo.CONTABILIDAD_SUBCUENTA'
EXEC USP_DELETE_ALL_F_CONSTRAINT_TABLE 'dbo.CONTABILIDAD_MOVIMIENTO_SUBCUENTA'
--GO

IF OBJECT_ID('dbo.CONTABILIDAD_CLASE_CUENTA') IS NOT NULL
	DROP TABLE dbo.CONTABILIDAD_CLASE_CUENTA
GO
CREATE TABLE	dbo.CONTABILIDAD_CLASE_CUENTA ( 
	IdClasCuenta		TINYINT,
	Naturaleza			BIT				NOT NULL,
	NombClasC			NVARCHAR(100)	NOT NULL,
	DescClasC			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Tipo_Cuenta		PRIMARY KEY(IdClasCuenta)
);

GO
IF OBJECT_ID('dbo.CONTABILIDAD_GRUPO_CUENTA') IS NOT NULL
	DROP TABLE dbo.CONTABILIDAD_GRUPO_CUENTA
GO
CREATE TABLE dbo.CONTABILIDAD_GRUPO_CUENTA ( 
	IdGrupo				TINYINT			NOT NULL,
	IdClasCuenta		TINYINT			NOT NULL,
	NombGrupo			NVARCHAR(100)	NOT NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT FK_Contabilidad_Clase_Grupo_Cuenta	FOREIGN KEY(IdClasCuenta)
				REFERENCES dbo.CONTABILIDAD_CLASE_CUENTA(IdClasCuenta),
	CONSTRAINT PK_CONTABILIDAD_GRUPO_CUENTA		PRIMARY KEY(IdGrupo, IdClasCuenta)
)
GO


--La nomemclatura usada para las cuentas sera la siguiente
--El primer caracter representara la clase
--Grupo: Dos Primeros caracteres
--Cuenta: Estara conformado por los primeros 4 digitos
--Subcuenta: Estara conformado por los primeros 6 digitos
IF OBJECT_ID('dbo.CONTABILIDAD_CUENTA') IS NOT NULL
	DROP TABLE dbo.CONTABILIDAD_CUENTA
GO
CREATE TABLE	dbo.CONTABILIDAD_CUENTA (
	IdCuenta			TINYINT		IDENTITY(1,1),
	IdClasCuenta		TINYINT		NOT NULL,
	IdGrupo				TINYINT		NOT NULL,
	IdMoneda			TINYINT		NOT NULL,
	NumCuenta			NVARCHAR(4)		NOT NULL,
	NombCuenta			NVARCHAR(50)	NOT NULL,
	DescCuenta			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Cuenta		PRIMARY KEY(NumCuenta),
	CONSTRAINT	FK_Contabilidad_Cuenta_Grupo		FOREIGN KEY(IdGrupo, IdClasCuenta)
				REFERENCES	dbo.CONTABILIDAD_GRUPO_CUENTA(IdGrupo, IdClasCuenta),
	CONSTRAINT	FK_Contabilidad_Moneda_Cuenta	FOREIGN KEY(IdMoneda)
				REFERENCES	dbo.FACTURACION_MONEDA(IdMoneda),
	--CONSTRAINT	PK_Contabilidad_Cuenta_Restaurante	FOREIGN KEY(IdRestaurante)
	--			REFERENCES dbo.RESTAURANTE(IdRestaurante)
);
GO


IF OBJECT_ID('dbo.CONTABILIDAD_SUBCUENTA') IS NOT NULL
	DROP TABLE dbo.CONTABILIDAD_SUBCUENTA
GO
CREATE TABLE dbo.CONTABILIDAD_SUBCUENTA (
	IdSubCuenta			INT	IDENTITY(1,1),
	NumCuenta			NVARCHAR(4),
	NumSubCuenta		NVARCHAR(6),
	NombSubCuenta		NVARCHAR(100),
	DescSubCuenta		NVARCHAR(150),
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT		FK_Cuenta_de_SubCuenta FOREIGN KEY(NumCuenta)
				REFERENCES dbo.CONTABILIDAD_CUENTA(NumCuenta),
	CONSTRAINT		PK_SubCuenta	PRIMARY KEY(NumSubCuenta)
);

GO

-- CLASES
INSERT INTO dbo.CONTABILIDAD_CLASE_CUENTA(IdClasCuenta,NombClasC, Naturaleza)
VALUES(1,'ACTIVOS',0),(2,'PASIVOS',1),(3,'PATRIMONIO',1)

INSERT INTO dbo.CONTABILIDAD_CLASE_CUENTA(IdClasCuenta,NombClasC,Naturaleza)
VALUES(4,'INGRESOS',1),(5,'GASTOS DE OPERACION',0),(6,'COSTOS DE VENTAS',0)

--INSERT INTO dbo.CONTABILIDAD_CLASE_CUENTA(IdClasCuenta,NombClasC,Naturaleza)
--VALUES(8,'CUENTAS DE ORDEN DEUDORAS',1),(9,'CUENTAS DE ORDEN ACREEDORAS',0)

-- CLASE ACTIVOS
INSERT INTO dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta,IdGrupo, NombGrupo)
VALUES	(1,1 ,'Activo circulante')
		, (1,2,'Otros activos')

-- CLASE PASIVOS
INSERT INTO dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta,IdGrupo, NombGrupo)
VALUES (2,1,'Pasivo circulante') -- TODOS LOS IMPUESTOS SON CIRCULANTES
		, (2,2,'Otros pasivo')


-- IMPLEMENTAR CUANDO ESTE EL POS
-- CLASE INGRESOS
INSERT INTO dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta,IdGrupo, NombGrupo)
VALUES (4,1,'Ingresos Operacionales')
		, (4,2,'Ingress no operacionales')
		, (4,3, 'Otros ingresos')

--CLASE GASTOS
INSERT INTO dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta,IdGrupo, NombGrupo)
VALUES (5,1,'Gastos de administracion')
		, (5,2,'Gastos de ventas')
		, (5,3,'Financieros')
		, (5,4,'Otros gastos')

--CLASE COSTOS DE VENTAS
INSERT INTO dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta,IdGrupo, NombGrupo)
VALUES (6,1,'Compras')
	   , (6,2,'Costo de venta y prestación de servicios')
	   , (6,3,'Otros costos')

--------------------------------------CUENTAS---------------------------------------------------
--CLASE ACTIVOS, GRUPO ACTIVO CIRCULANTE
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA)
VALUES (1,1,1,1101,'Inventarios')
		, (1,1,1,1102,'Papeleria y utiles de oficina')

--Preguntar por los pasivos, cuales utilizar a la hora de que un producto se descuente
--CLASE PASIVOS, GRUPO PASIVO CIRCULANTE
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (2,2,1,2201,'Proveedores', '')
		, (2,2,1,2202,'Acreedores', '')
		, (2,2,1,2203,'Impuestos por pagar', '')
		, (2,2,1,2204,'Documentos por pagar', '')

--CLASE INGRESOS, GRUPO OPERACIONALES, 
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (4,1,1,4101,'Restaurante', '')
		, (4,1,1,4102,'Bares', '')

--CLASE GASTOS, GRUPO GASTOS DE ADMINISTRACION
--SELECT * fROM Dbo.CONTABILIDAD_GRUPO_CUENTA
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (5,1,1,5101,'Gastos de personal', '')
		, (5,1,1,5102,'Articulos de aseo y limpieza', '')
		, (5,1,1,5103,'Papeleria y utiles de escritorio', '')
		, (5,1,1,5104,'Honorarios', '')
		, (5,1,1,5105,'Impuestos', '')
		, (5,1,1,5106,'Contribuciones y afiliaciones', '')
		, (5,1,1,5107,'Seguros', '')
		, (5,1,1,5108,'Servicios basicos', '')
		, (5,1,1,5109,'Servicios profesionales', '')
		, (5,1,1,5110,'Gastos legales', '')
		, (5,1,1,5111,'Mantenimiento y reparaciones', '')
		, (5,1,1,5112,'Adecuación y instalacion', '')
		, (5,1,1,5113,'Gastos de viaje', '')
		, (5,1,1,5114,'Diversos', '')

		
--CLASE GASTOS , GRUPO GASTOS DE VENTAS
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (5,2,1,5201,'Gastos de personal', '')
		, (5,2,1,5202,'Articulos de aseo y limpieza', '')
		, (5,2,1,5203,'Honorarios', '')
		, (5,2,1,5204,'Impuestos', '')
		, (5,2,1,5205,'Contribuciones y afiliaciones', '')
		, (5,2,1,5206,'Seguros', '')
		, (5,2,1,5207,'Servicios', '')
		, (5,2,1,5208,'Gastos legales', '')
		, (5,2,1,5209,'Mantenimiento y reparaciones', '')
		, (5,2,1,5210,'Alquiler del local', '')
		, (5,2,1,5211,'Mantenimiento y reparación de bodegas', '')
		, (5,2,1,5212,'Adecuación y instalacion', '')
		, (5,2,1,5213,'Gastos de viaje', '')
		, (5,2,1,5214,'Transporte de mercancia', '')
		, (5,2,1,5215,'Sustraccion y Hurto', '')
		, (5,2,1,5216,'Diversos', '')

--CLASE COSTOS DE VENTAS, GRUPO COMPRAS
--INSUMOS ALIMENTICIO
--Preguntar en donde encajaria mejor ya sea en mercancias o materia prima(cuando se ingrese un insumo alimenticio)
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (6,1,1,6101,'Mercancias', '')
		, (6,1,1,6102,'Materia prima', '')
		, (6,1,1,6103,'Materiales indirectos', '')
		, (6,1,1,6104,'Devoluciones en compras (CR)', '')

--CLASE COSTOS DE VENTAS, GRUPO COSTOS DE VENTAS Y DE PRESTACION DE SERVICIOS
INSERT INTO CONTABILIDAD_CUENTA(IDCLASCUENTA,IDGRUPO,IDMONEDA,NUMCUENTA,NOMBCUENTA,DESCCUENTA)
VALUES (6,2,1,6201,'Restaurantes', '')


------------------------------------------SUBCUENTAS------------------------------------

-------------------------------GASTOS OPERACIONALES DE ADMINISTRACION-----------------------------------

-- ADMINISTRAVITO Y VENTA
--GASTOS DE PERSONAL
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5101,510101,'Sueldos')
       , (5101,510102,'Horas extras y recargos')
	   , (5101,510103,'Comisiones')
	   , (5101,510105,'Viaticos')
	   , (5101,510106,'Vacaciones')
	   , (5101,510107,'Treceavo mes')
	   , (5101,510108,'Indemnizaciones') --ANTIGUEDAD


--HONORARIOS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5104,510401,'Junta directiva')
       , (5104,510402,'Revisoria fiscal')
	   , (5104,510403,'Auditoria externa')
	   , (5104,510404,'Asesoría jurídica')
	   , (5104,510405,'Asesoría financiera')
	   , (5104,510406,'Asesoría tecnica')
	   , (5104,510407,'Otros')

	
--IMPUESTOS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES (5105,510501,'Cuota Patronal INSS')
		, (5105,510502,'INATEC')
		, (5105,510503,'Impuesto sobre la renta')
		, (5105,510504,'Otros')
   

--SEGUROS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5107,510701,'Terremoto') --VERIFICAR SI ES FINANCIERO
	   , (5107,510702,'Equipo de transporte') 
	   , (5107,510703,'Obligatorio accidente de transito') 
	   , (5107,510704,'Otros')

--SERVICIOS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5108,510801,'Aseo y vigilancia')
       , (5108,510802,'Temporales')
	   , (5108,510803,'Asistencia técnica')
	   , (5108,510804,'Procesamiento electrónico de datos')
	   , (5108,510805,'Acueducto y alcantarillado')
	   , (5108,510806,'Energia eléctrica')
	   , (5108,510807,'Agua')
	   , (5108,510808,'Telefono')
	   , (5108,510809,'Fax')
	   , (5108,510810,'Transporte, fletes y acarreo')
	   , (5108,510811,'Gas')
	   , (5108,510812,'Otros')

--MANTENIMIENTO Y REPARACIONES
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5111,511101,'Terrenos')
       , (5111,511102,'Construcciones y edificaciones')
	   , (5111,511103,'Maquinaria y equipo')
	   , (5111,511104,'Equipo de oficina')
	   , (5111,511105,'Equipo de computación y comunicación')
	   , (5111,511106,'Otros')

--ADECUACION E INSTALACION, ESTO VA EN AMBOS, TANTO EN DE VENTAS COMO DE ADMINISTRACION
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5112,511201,'Instalaciones eléctricas')
       , (5112,511202,'Arreglos ornamentales')
	   , (5112,511203,'Reparaciones locativas')
	   , (5112,511204,'Otros')

--VIAJES
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5113,513001,'Alojamiento y manutencion')
       , (5113,511302,'Pasajes aereos')
	   , (5113,511304,'Pasajes terrestres')
	   , (5113,511305,'Otros')


----DIVERSOS
--SELECT * FROM dbo.CONTABILIDAD_SUBCUENTA
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5114,511401,'Comisiones')
       , (5114,511402,'Libros, suscripciones, periodicos y revistas')
	   , (5114,511403,'Útiles, papelería y fotocopias')
	   , (5114,511404,'Combustibles y lubricantes')
	   , (5114,511405,'Indemnización por daños a terceros')
	   , (5114,511406,'Otros')
	  

----------------------------------------GASTOS  VENTAS----------------------------------------------------------------
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5201,520101,'Sueldos')
       , (5201,520102,'Horas extras y recargos')
	   , (5201,520103,'Comisiones')
	   , (5201,520105,'Viaticos')
	   , (5201,520106,'Vacaciones')
	   , (5201,520107,'Treceavo mes')
	   , (5201,520108,'Indemnizaciones') --ANTIGUEDAD


--SERVICIOS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5208,520801,'Aseo y vigilancia')
	   , (5208,520802,'Energia eléctrica')
	   , (5208,520803,'Agua')
	   , (5208,520804,'Telefono')
	   , (5208,520805,'Transporte, fletes y acarreo')
	   , (5208,520806,'Gas')
	   , (5208,520807,'Otros')

--MANTENIMIENTO Y REPARACIONES
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5211,521101,'Terrenos')
       , (5211,521102,'Construcciones y edificaciones')
	   , (5211,521103,'Maquinaria y equipo')
	   , (5211,521104,'Equipo de oficina')
	   , (5211,521105,'Equipo de computación y comunicación')
	   , (5211,521106,'Otros')

--ADECUACION E INSTALACION, ESTO VA EN AMBOS, TANTO EN DE VENTAS COMO DE ADMINISTRACION
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5212,521201,'Instalaciones eléctricas')
       , (5212,521202,'Arreglos ornamentales')
	   , (5212,521203,'Reparaciones locativas')
	   , (5212,521204,'Otros')

--DIVERSOS
INSERT INTO CONTABILIDAD_SUBCUENTA(NumCuenta,NumSubCuenta,NombSubCuenta)
VALUES(5214,521401,'Musica ambiental')
		, (5214,521402,'Gastos de representacion y relaciones públicas') 
		, (5214,521403,'Elementos de aseo y cafetería')
		, (5214,521404,'Combustibles y lubricantes')
		, (5214,521405,'Parqueaderos')
		, (5214,521416,'Polvora y similares')


--GASTOS DE VENTAS DE SERVICIOS DE AGUA LUZ, TELEFONO, PUEDEN IR TANTO EN GASTOS ADMINISTRATIVOS COMO EN LOS DE VENTAS


--GASTOS OPERACIONES DE ADMINISTRACION
--SELECT  CUE.NombCuenta
--		, SUB.NumCuenta
--		, SUB.NumSubCuenta
--		, SUB.NombSubCuenta
--FROM	dbo.CONTABILIDAD_CUENTA CUE
--		INNER JOIN dbo.CONTABILIDAD_SUBCUENTA SUB
--			ON SUB.NumCuenta = CUE.NumCuenta
--WHERE	CUE.IdGrupo = 1
--		AND CUE.IdClasCuenta = 5


-- INSUMOS DE LIMPIEZA Y UTENSILIOS

-- SERIAN GASTOS DE VENTA, LA SUBCUENTA SERIAN INSUMOS DE LIMPIEZA Y UTENSILIOS
--

--INSUMOS ALIMENTICIOS 
-- COSTOS DE VENTA
--ADMINISTRACION SOLO PARA LA PARTE DE OFICINA 
--AGREGAR EL GRUPO DE CUENTA 


--INVENTARIO VA DENTRO DE ACTIVO CIRCULANTE
-- TODO LO QUE VAS A USAR EN UNOS 6 MESES
--