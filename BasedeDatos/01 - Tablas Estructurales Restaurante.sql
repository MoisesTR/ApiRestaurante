IF DB_ID('ATOMIC_RESTAURANTE') IS NULL
	CREATE DATABASE ATOMIC_RESTAURANTE;
ELSE
	BEGIN 
		USE master;
		DROP	DATABASE ATOMIC_RESTAURANTE;
		CREATE	DATABASE ATOMIC_RESTAURANTE;
	END	
GO
USE ATOMIC_RESTAURANTE;
GO
--// Tabla Para almacenar las Monedas de posible uso dentro del Sistema
CREATE TABLE dbo.FACTURACION_MONEDA (
	IdMoneda		TINYINT			NOT NULL IDENTITY(1,1),
	--IdPais			TINYINT			NOT NULL,
	IsPrincipal		BIT				NULL,
	NombMoneda		NVARCHAR(50)	NOT NULL,
	CodigoIso		NVARCHAR(3)		NOT NULL,
	Simbolo			NVARCHAR(3)		NOT NULL,
	Habilitado		BIT				NOT NULL DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT		PK_Facturacion_Moneda		PRIMARY KEY ( IdMoneda ),
	CONSTRAINT		U_Nombre_de_Moneda			UNIQUE	(NombMoneda),
	CONSTRAINT		U_Codigo_Iso_Moneda			UNIQUE	(CodigoIso)
)

GO
--//Tabla Catalogo de paises, para su posterior uso en compras, monedas, etc
CREATE TABLE dbo.PAIS(
	IdPais				TINYINT		IDENTITY(1,1),
	IdMoneda			TINYINT				NOT NULL,
	NombPais			NVARCHAR(50)		NOT NULL	UNIQUE,
	CodAlfa3			NVARCHAR(3)			NOT NULL	UNIQUE,
	CodNumerico			NVARCHAR(3)			NOT NULL	UNIQUE,
	PrefijoTelefonico	NVARCHAR(4)			NOT NULL	UNIQUE,
	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME		NULL,	
	CONSTRAINT	Pk_Pais	PRIMARY KEY(IdPais),
	CONSTRAINT	FK_Moneda_Curso_Legal		FOREIGN KEY (IdMoneda)
			REFERENCES dbo.FACTURACION_MONEDA (IdMoneda)
)
GO

CREATE NONCLUSTERED INDEX IDX_PAIS_NOMBRE_CODIGO
ON	dbo.PAIS( IdPais, CodAlfa3)
INCLUDE(NombPais, CodNumerico, PrefijoTelefonico)

GO
--// Tabla para almacenar el tipo de cambio oficial y paralelo de la moneda
CREATE TABLE dbo.FACTURACION_TIPO_CAMBIO_MONEDA (
	IdTipCambio				INT			IDENTITY(1,1),
	IdMonedaPrincipal		TINYINT				NOT NULL,
	IdMonedaCambio			TINYINT				NOT NULL,
	ValorMonedaPrincipal	NUMERIC(19,7)		NOT NULL,
	ValorCambioOficial		NUMERIC(19,7)		NOT NULL,
	ValorCambioParalelo		NUMERIC(19,7)		NOT NULL,
	Fecha					SMALLDATETIME	NOT NULL,
	Habilitado				BIT				NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt				SMALLDATETIME	NULL,
	CONSTRAINT	PK_Tipo_Cambio_Moneda	PRIMARY KEY(IdTipCambio),
	CONSTRAINT FK_IdMoneda_Principal	FOREIGN KEY(IdMonedaPrincipal)	
				REFERENCES dbo.FACTURACION_MONEDA(IdMoneda),
	CONSTRAINT FK_IdMoneda_Cambio		FOREIGN KEY(IdMonedaCambio)		
				REFERENCES dbo.FACTURACION_MONEDA(IdMoneda)
)
GO
--// Tabla para almacenar los Bancos disponibles en el sistema
--// en esta solo se almacenara informacion de la casa matriz
CREATE TABLE dbo.FACTURACION_BANCOS ( 
	IdBanco			INT				NOT NULL IDENTITY(1,1),
	IdPais			TINYINT			NOT NULL,
	Banco			NVARCHAR(50)	NOT NULL,
	Siglas			NVARCHAR(10)	NOT NULL,
	Direccion		NVARCHAR(250)	NOT NULL,
	Telefono1		NVARCHAR(20)	NOT NULL,
	Telefono2		NVARCHAR(20)	NULL,
	Correo			NVARCHAR(100)	NULL,
	Web				NVARCHAR(100)	NULL,
	CONSTRAINT PK_Facturacion_Bancos	PRIMARY KEY(IdBanco),
	CONSTRAINT FK_Pais_del_Banco		FOREIGN KEY(IdPais)		REFERENCES dbo.PAIS(IdPais),
	CONSTRAINT U_Nombre_Banco		UNIQUE(Banco),
	CONSTRAINT U_Siglas_Banco		UNIQUE(Siglas)
)
GO
--// Tabla para almacenar las cuentas disponibles en los bancos
CREATE TABLE dbo.FACTURACION_CUENTA_BANCO ( 
	IdCuentaB		INT				NOT NULL	IDENTITY(1,1),
	IdBanco			INT				NOT NULL,
	IdMoneda		INT				NOT	NULL,
	NumCuenta		NVARCHAR(50)	NOT NULL,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT PK_Cuenta_Banco				PRIMARY KEY(IdCuentaB),
	CONSTRAINT FK_Banco_que_pertenece_la_Cuenta			FOREIGN KEY(IdBanco)	
					REFERENCES dbo.FACTURACION_BANCOS(IdBanco),
	CONSTRAINT U_Numero_De_Cuenta_Banco					UNIQUE(NumCuenta)
)
GO
--// Tabla para almacenar los tipos de Documento de Identificacion
--// de personas y/o empresas
CREATE TABLE TIPO_DOCUMENTO_IDENTIFICACION(
	IdTipDoc			INT IDENTITY(1,1),
	NombTipDoc			NVARCHAR(50)		NOT NULL	UNIQUE,
	DescTipDoc			NVARCHAR(150)		NULL,
	Habilitado			BIT					NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME		NULL,
	CONSTRAINT PK_TIPO_DOCUMENTO_IDENTIFICACION		PRIMARY KEY(IdTipDoc)
)

GO
CREATE TABLE dbo.RESTAURANTE (
	IdRestaurante			INT			IDENTITY(1,1),
	IdMoneda				TINYINT			NOT NULL,
	IdPais					TINYINT			NOT NULL,
	IdMonedaFacturacion		TINYINT			NOT NULL,
	IsAutoBackup			BIT				NOT NULL DEFAULT 1,
	IsCuotaFija				BIT				NOT NULL,
	NombRestaurante			NVARCHAR(100)	NOT NULL,
	DescRestaurante			NVARCHAR(150)	NULL,
	CuotaFija				NUMERIC(17,7)	NULL,
	PorcIva					NUMERIC(5,2)	NULL,
	RazonSocial				NVARCHAR(100)	NOT NULL,
	SitioWeb				NVARCHAR(100)	NULL,
	Correo					NVARCHAR(150)	NULL,
	TelPrincipal			NVARCHAR(20)	NOT NULL,
	TelPrincipal2			NVARCHAR(20)	NULL,
	FechaFundacion			SMALLDATETIME	NOT NULL,
	[Login]					NVARCHAR(150)	NULL		DEFAULT ORIGINAL_LOGIN(),
	Workspace				NVARCHAR(150)	NULL		DEFAULT HOST_NAME(),		
	Habilitado				BIT				NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt				SMALLDATETIME	NULL,
	CONSTRAINT		PK_Restaurante			PRIMARY KEY (IdRestaurante),
	CONSTRAINT		U_Nombre_de_Restaurante		UNIQUE(NombRestaurante),		
	CONSTRAINT		FK_Pais_Restaurante			FOREIGN KEY(IdPais)		
				REFERENCES dbo.PAIS(IdPais),
	CONSTRAINT		FK_Moneda_Asientos_Contables_Restaurante	FOREIGN KEY(IdMoneda)	
				REFERENCES dbo.FACTURACION_MONEDA(IdMoneda),
	CONSTRAINT		FK_Moneda_Facturacion						FOREIGN KEY(IdMonedaFacturacion)	
				REFERENCES dbo.FACTURACION_MONEDA(IdMoneda)
);

GO	
CREATE TABLE dbo.SUCURSAL_RESTAURANTE (
	IdSucursal		INT			IDENTITY(1,1),
	IdRestaurante	INT					NOT NULL,
    Principal		BIT					NOT NULL	DEFAULT 0,
	NumSucursal		TINYINT				NOT NULL,
    NombSucursal	NVARCHAR(100)		NOT NULL,
    Direccion		NVARCHAR(250)		NOT NULL,
	Telefono1		NVARCHAR(20)		NOT NULL,
	Telefono2		NVARCHAR(20)		NULL,
    Habilitado		BIT					NOT NULL	DEFAULT 1,
	[Login]			NVARCHAR(150)		NULL		DEFAULT ORIGINAL_LOGIN(),
	Workspace		NVARCHAR(150)		NULL		DEFAULT HOST_NAME(),
    CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt		SMALLDATETIME		NULL,
    CONSTRAINT	PK_Sucursal_Restaurante	PRIMARY KEY (IdSucursal),
	CONSTRAINT	FK_Restaurante_Sucursal	FOREIGN KEY (IdRestaurante)		REFERENCES dbo.RESTAURANTE(IdRestaurante)
);

GO
--// Restriccion de nombre unico para las sucursales
ALTER TABLE dbo.SUCURSAL_RESTAURANTE
	ADD CONSTRAINT U_Nombre_Sucursal UNIQUE(NombSucursal)
GO

CREATE TABLE TELEFONO_SUCURSAL(
	IdTelefonoSucursal	INT IDENTITY(1,1), 
	IdSucursal			INT					NOT NULL,
	NumeroTelefono		NVARCHAR(20)		NOT NULL,
	Habilitado			Bit DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
	CONSTRAINT PK_TELEFONO_SUCURSAL PRIMARY KEY(IdTelefonoSucursal),
	CONSTRAINT FK_TELEFONO_SUCURSAL FOREIGN KEY(IdSucursal) 
				REFERENCES SUCURSAL_RESTAURANTE(IdSucursal)
)
GO

CREATE TABLE	dbo.TIPO_BODEGA_SUCURSAL (
	IdTipBode			INT		IDENTITY(1,1),
	NombTipBod			NVARCHAR(50)	NOT NULL,
	DescTipBod			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Tipo_de_Bodega_Sucursal		PRIMARY KEY (IdTipBode),
	CONSTRAINT	U_Nombre_Tipo_Bodega_Sucursal	UNIQUE (NombTipBod)
);

GO
CREATE TABLE	dbo.BODEGA_SUCURSAL (
    IdBodegaS			INT IDENTITY(1,1),
	IdSucursal			INT					NOT NULL,
	IdTipBode			INT					NOT NULL,
	NumBodega			INT					NOT NULL,
    NombBodega			NVARCHAR(100)		NOT NULL,
    DescLocal			NVARCHAR(200)		NULL,
	[Login]				NVARCHAR(150)		NULL,
	[WorkSpace]			NVARCHAR(150)		NULL,
    Habilitado			BIT 				NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_Bodega_Sucursal		PRIMARY KEY (IdBodegaS),
	CONSTRAINT FK_Sucursal_Bodega						FOREIGN KEY(IdSucursal)	
				REFERENCES	dbo.SUCURSAL_RESTAURANTE(IdSucursal),
	CONSTRAINT FK_Tipo_Bodega_de_Sucursal				FOREIGN KEY(IdTipBode)
				REFERENCES	dbo.TIPO_BODEGA_SUCURSAL(IdTipBode)
);
GO

CREATE TABLE	dbo.AREA_PRODUCCION(
	IdAreaProduccion	INT IDENTITY(1,1),
	IdSucursal			INT					NOT NULL,
	NumAP				TINYINT				NOT NULL,
	CodBarAP			NVARCHAR(15)		NOT NULL,
    NombAP				NVARCHAR(50)		NOT NULL,
    Habilitado			BIT					NOT NULL DEFAULT 1,
	CreateAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_Area_Produccion	PRIMARY KEY(IdAreaProduccion), 
	CONSTRAINT FK_SUCURSAL_AREA_PRODUCCION	FOREIGN KEY(IdSucursal) REFERENCES dbo.SUCURSAL_RESTAURANTE(IdSucursal),
	CONSTRAINT U_SUCURSAL_AREA_PRODUCCION	UNIQUE(IdSucursal)
)
GO	

CREATE TABLE	dbo.CARGO_TRABAJADOR(
    IdCargo				INT IDENTITY(1,1),
    NombCargo			NVARCHAR(50)		NOT NULL,
    DescCargo			NVARCHAR(100)		NULL,
	CodCargo			NVARCHAR(4)			NULL,
    Habilitado			BIT DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,    
    CONSTRAINT PK_IdCargo PRIMARY KEY (IdCargo)
);

GO
CREATE TABLE	dbo.TRABAJADOR (
    IdTrabajador		INT IDENTITY(1,1),
    IdSucursal			INT					NULL,
    IdCargo				INT					NOT NULL,
	IdPais				TINYINT				NOT NULL,
	CodTrabajador		NVARCHAR(10)		NULL,
    Nombres				NVARCHAR(50)		NOT NULL,
    Apellidos			NVARCHAR(50)		NOT NULL,
	IdTipDoc			INT					NOT NULL	DEFAULT 1,
    Documento			NVARCHAR(50)		NOT NULL,
	Imagen				NVARCHAR(50)		NOT NULL,
    FechaNacimiento		DATE				NOT NULL,
    Direccion			NVARCHAR(300)		NOT NULL,
	Telefono1			NVARCHAR(20)		NOT NULL,
	Telefono2			NVARCHAR(20)		NULL,
    FechaIngreso		DATE				NOT NULL,
    Habilitado			BIT DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_Trabajador	PRIMARY KEY (IdTrabajador),
    CONSTRAINT FK_Cargo_Trabajador					FOREIGN KEY (IdCargo)
        REFERENCES		dbo.CARGO_TRABAJADOR (IdCargo),
    CONSTRAINT FK_Sucursal_Trabajador				FOREIGN KEY (IdSucursal)
        REFERENCES		dbo.SUCURSAL_RESTAURANTE (IdSucursal),
	CONSTRAINT FK_Tipo_Doc_Identificacion_Empleado	FOREIGN KEY(IdTipDoc)
		REFERENCES		dbo.TIPO_DOCUMENTO_IDENTIFICACION	(IdTipDoc),
	CONSTRAINT U_Numero_Cedula						UNIQUE(Documento),
	CONSTRAINT CK_Telefonos_Trabajador_DistINTos	CHECK(Telefono1 <> Telefono2)
)
GO

CREATE TABLE dbo.BODEGA_AREA_PRODUCCION(
	IdBodegaAreaP			INT IDENTITY(1,1),
	IdAreaProduccion		INT					NOT NULL,
	CodBarBAP				NVARCHAR(20)		NULL,
    NombBAP					NVARCHAR(50)		NOT NULL,
    DescBAP					NVARCHAR(300)		NULL,
    Habilitado				BIT DEFAULT 1		NOT NULL,
	CreateAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt				SMALLDATETIME		NULL,
    CONSTRAINT pk_IdBodegaAP			PRIMARY KEY(IdBodegaAreaP),
	CONSTRAINT FK_BODEGA_AREA_PRODUCCION	FOREIGN KEY(IdAreaProduccion) 
				REFERENCES AREA_PRODUCCION(IdAreaProduccion),
	CONSTRAINT U_BODEA_Para_AreaProd		UNIQUE(IdAreaProduccion)
)

GO

USE master