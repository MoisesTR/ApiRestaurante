/**
*	@last_edition 03/08/2018
*	@editor		Genaro Tinoco
**/
USE ATOMIC_RESTAURANTE;

GO
CREATE TABLE dbo.TIPO_INSUMO (
	IdTipInsumo			TINYINT IDENTITY(1,1),
	Descripcion			VARCHAR(200),
	Habilitado			BIT					DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
	CONSTRAINT PK_ID_TIPO_INSUMO PRIMARY KEY (IdTipInsumo)
)

GO
CREATE TABLE dbo.PROCEDENCIA_PRODUCTO(
	IdProcedencia	INT IDENTITY(1,1),
    Nombre			NVARCHAR(50)		NOT NULL,
    Descripcion		NVARCHAR(150)		NULL,
    Habilitado		BIT DEFAULT 1		NOT NULL,
    CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt		SMALLDATETIME		NULL,
    CONSTRAINT pk_Procedencia primary KEY(IdProcedencia)
);
GO

CREATE TABLE MOTIVO_BAJA_PRODUCTO(
	IdMotivo			INT					IDENTITY(1,1),
    NombMotiBaja		NVARCHAR(50)		NOT NULL,
    DescMotiBaja		NVARCHAR(200)		NULL,
    Habilitado			BIT DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_MOTIVO_BAJA_PRODUCTO PRIMARY KEY(IdMotivo)
);
GO

CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA (
    IdClasifUDM					INT IDENTITY(1,1),
    NombClasificacion			NVARCHAR(50)		NOT NULL,
    DescClasificacion			NVARCHAR(150)		NULL,
    Habilitado					BIT								DEFAULT 1,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt					SMALLDATETIME		NULL,
    CONSTRAINT PK_ID_CLAS_UDM PRIMARY KEY (IdClasifUDM)
);
GO

CREATE TABLE dbo.UNIDAD_MEDIDA (
    IdUnidadMedida				INT IDENTITY(1,1),
    IdClasifUDM					INT,
	IdUDMBase					INT,
    NombUnidad					NVARCHAR(50)		NOT NULL,
    Simbolo						NVARCHAR(3)			NULL,
	FactorConversion			NUMERIC(10,5)		NOT NULL,
    Habilitado					BIT DEFAULT 1		NOT NULL,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt					SMALLDATETIME		NULL,
    CONSTRAINT PK_ID_UDM							PRIMARY KEY (IdUnidadMedida),
    CONSTRAINT FK_Clasificacion_Unidad_Medida		FOREIGN KEY (IdClasifUDM)
        REFERENCES dbo.CLASIFICACION_UNIDAD_MEDIDA (IdClasifUDM)
);
GO
CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA_FUNCIONAL(
	IdClasificacionUdmF		INT IDENTITY(1,1),
	NombClasifUdmF			NVARCHAR(50)		NOT NULL	UNIQUE,
	DescClasifUdmF			NVARCHAR(150)		NOT NULL,
	Habilitado				BIT					NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt				SMALLDATETIME		NULL,
	CONSTRAINT PK_CLASIFICACION_UDM_FUNCIONAL PRIMARY KEY(IdClasificacionUdmF)
)
GO
CREATE TABLE UNIDAD_MEDIDA_FUNCIONAL(
	IdUdmFuncional			INT	IDENTITY(1,1),
	IdClasificacionUdmF		INT				NOT NULL,
	IdUnidadMedida			INT				NOT NULL,
	NombUdmFunc				NVARCHAR(50)	NOT NULL,
	Descripcion				NVARCHAR(50)	NULL,
	ValorUdm				NUMERIC(10,5)	NOT NULL	CHECK( ValorUdm > 0),
	CreatedAt				DATE			NOT NULL	DEFAULT GETDATE(),
	UpdatedAt				DATE			NULL,
	CONSTRAINT Pk_UnidadMedidaFuncional		PRIMARY KEY(IdUdmFuncional),
	CONSTRAINT FK_UnidadDeMedidaFuncional	FOREIGN KEY(IdUnidadMedida) REFERENCES dbo.UNIDAD_MEDIDA(IdUnidadMedida),
	CONSTRAINT FK_ClasificacionUdmFuncional FOREIGN KEY(IdClasificacionUdmF) REFERENCES dbo.CLASIFICACION_UNIDAD_MEDIDA_FUNCIONAL(IdClasificacionUdmF)
)
GO
CREATE TABLE  CATEGORIA_PRODUCTO(
    IdCategoria				INT IDENTITY(1,1),
    NombCategoria			NVARCHAR(50)		NOT NULL,
    DescCategoria			NVARCHAR(150)		NULL,
    Habilitado				BIT DEFAULT 1		NOT NULL,
    CreatedAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt				SMALLDATETIME		NULL,
    CONSTRAINT Pk_Categoria_Producto PRIMARY KEY (IdCategoria),
    CONSTRAINT U_Nombre_Categoria UNIQUE(NombCategoria)
);
GO
CREATE TABLE CLASIFICACION_PRODUCTO (
    IdClasificacion				INT IDENTITY(1,1),
	IdCategoria					INT					NOT NULL,
    NombClasificacion			NVARCHAR(50)		NOT NULL,
    DescClasificacion			NVARCHAR(100),
    Habilitado					BIT					NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt					SMALLDATETIME		NULL,
    CONSTRAINT		PK_CLASIFPRODUCT				PRIMARY KEY (	IdClasificacion ),
    CONSTRAINT		U_NOMBRECLASIF					UNIQUE (		NombClasificacion ),
	CONSTRAINT		FK_CATEGORIA_DE_CLASIFICACION	FOREIGN KEY (	IdCategoria )
				REFERENCES			CATEGORIA_PRODUCTO ( IdCategoria )
);
GO
CREATE TABLE SUBCLASIFICACION_PRODUCTO (
    IdSubClasificacion			INT IDENTITY(1,1),
    IdClasificacion				INT				NOT NULL,
    NombSubClasificacion		NVARCHAR(50)	NOT NULL,
    DescSubclasificacion		NVARCHAR(150),
    Habilitado					BIT				NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
    UpdatedAt					SMALLDATETIME	NULL,
    CONSTRAINT		Pk_IdSubClasificacion_Producto			PRIMARY KEY ( IdSubClasificacion ),
    CONSTRAINT		FK_Clasificacion_de_SubClasificaion		FOREIGN KEY ( IdClasificacion )
						REFERENCES CLASIFICACION_PRODUCTO	( IdClasificacion ),
	CONSTRAINT		U_Nombre_SubClasificaion	UNIQUE		( NombSubClasificacion )
);
GO
CREATE TABLE dbo.ENVASE (
    IdEnvase			INT IDENTITY(1,1),
    NombEnvase			NVARCHAR(50)		NOT NULL,
    DescEnvase			NVARCHAR(150)		NULL,
    Habilitado			BIT					NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_Envase		PRIMARY KEY (IdEnvase),
    CONSTRAINT U_NombEnvase	UNIQUE(NombEnvase)
);
GO
CREATE TABLE dbo.TIPO_EMPAQUE_PRODUCTO ( 
	IdTipoEmpaque		INT IDENTITY(1,1),
	NombTipoEmpaque		NVARCHAR(50)	NOT NULL,
	DescTipoEmpaque		NVARCHAR(150)	NULL,
	CreatedAt			SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT PK_TipoEmpaqueProducto	PRIMARY KEY(IdTipoEmpaque)
);
GO
CREATE TABLE	dbo.EMPAQUE (
    IdEmpaque		INT IDENTITY(1,1),
    NombEmpaque		NVARCHAR(50)			NOT NULL,
    DescEmpaque		NVARCHAR(200),
    Habilitado		BIT									DEFAULT 1,
    CreatedAt		SMALLDATETIME			NOT NULL	DEFAULT GETDATE(),
    UpdatedAt		SMALLDATETIME			NULL,
    CONSTRAINT PK_Empaque		PRIMARY KEY (IdEmpaque),
    CONSTRAINT U_Nombre_Empaque UNIQUE(NombEmpaque)
);
GO
CREATE TABLE ESTADO_PRODUCTO(
	IdEstado			INT IDENTITY(1,1),
    NombEstado			NVARCHAR(50)		NOT NULL,
    DescEstado			NVARCHAR(50)		NULL,
    Habilitado			BIT 				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    CONSTRAINT	pk_EstadoProducto PRIMARY KEY(IdEstado)
);
GO

CREATE TABLE dbo.PRODUCTO (
    IdProducto			INT IDENTITY(1,1),
    IdSubClasificacion	INT					NOT NULL,
    IdEstado			INT					NOT NULL,
	IdEnvase			INT					NULL, --id del envase si es que tiene
    IdEmpaque			INT					NULL, --id del empaque si es que tiene
	IdUnidadMedida		INT					NOT NULL,
	IdProveedor			INT					NOT NULL,
	IdTipInsumo			TINYINT				NOT NULL,
	CodProd				VARCHAR(25)			NOT NULL	UNIQUE,
	CodOriginal			VARCHAR(25)			NULL,
	CodBarra			VARCHAR(25)			NOT NULL,
	CodBarraOriginal	VARCHAR(25)			NULL,
    ValorUnidadMedida	NUMERIC(10,5)		NOT NULL,
	CantidadEmpaque		INT					NULL, --si tiene empaque 
	DiasRotacion		INT					NOT NULL,
    NombProducto		NVARCHAR(50)		NOT NULL,
    Descripcion			NVARCHAR(200)		NOT NULL,
    Imagen				NVARCHAR(100)		NOT NULL	DEFAULT 'nodisponible.png', --	
	Habilitado			BIT DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT		PK_ID_PRODUCT				PRIMARY KEY (IdProducto),
    CONSTRAINT		FK_PRODUCT_SUBCLASIF		FOREIGN KEY ( IdSubClasificacion )
				REFERENCES		dbo.SUBCLASIFICACION_PRODUCTO ( IdSubClasificacion ),
	CONSTRAINT		FK_Estado_Producto			FOREIGN KEY ( IdEstado )
				REFERENCES		dbo.ESTADO_PRODUCTO(IdEstado),
	CONSTRAINT		U_ProductoUnico 
					UNIQUE(NombProducto),
	CONSTRAINT		FK_Envase_PRODUCT			FOREIGN KEY ( IdEnvase ) 
				REFERENCES		dbo.ENVASE (IdEnvase),
    CONSTRAINT	FK_UDM_Producto					FOREIGN KEY (IdUnidadMedida) 
				REFERENCES		dbo.UNIDAD_MEDIDA (IdUnidadMedida),
	CONSTRAINT	FK_Empaque_Producto				FOREIGN KEY(IdEmpaque)  
				REFERENCES		dbo.EMPAQUE(IdEmpaque),
	CONSTRAINT	FK_Proveedor_Producto			FOREIGN KEY(IdProveedor)
				REFERENCES		dbo.PROVEEDOR(IdProveedor),
	CONSTRAINT	FK_Tipo_de_Insumo_Producto		FOREIGN KEY(IdTipInsumo)
				REFERENCES		dbo.TIPO_INSUMO (IdTipInsumo)
);

GO
CREATE TABLE  PRODUCTO_ORIGEN(
	IdProducto			INT				NOT NULL,
    IdOrigen			INT				NOT NULL,
    Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
    CONSTRAINT FK_Producto_Origen		FOREIGN KEY(IdProducto) 
				REFERENCES PRODUCTO(IdProducto),
    CONSTRAINT FK_Origen_Producto		FOREIGN KEY(IdOrigen) 
				REFERENCES PRODUCTO(IdProducto),
    CONSTRAINT CK_Producto				CHECK (IdProducto <> IdOrigen),
    CONSTRAINT U_ProductoProcedencia	UNIQUE(IdProducto, IdOrigen)
);
GO

CREATE TABLE dbo.ESTADO_EMPAQUE(
	IdEstadoEmpaque			INT					IDENTITY(1,1),
    NombEstado				NVARCHAR(50)		NOT NULL,
    Habilitado				BIT					NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    CONSTRAINT PK_ESTADO_PRODUC			PRIMARY KEY(IdEstadoEmpaque),
	CONSTRAINT U_EstadoEmpaqueUnico		UNIQUE(NombEstado)
);
GO

CREATE TABLE ESTADO_EDICION(
	IdEstadoEdicion INT				IDENTITY(1,1),
	NombEstado		NVARCHAR(50)	NOT NULL,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(), 
	CONSTRAINT PK_ESTADO_EDICION PRIMARY KEY(IdEstadoEdicion)
)
GO

INSERT INTO ESTADO_EDICION(NombEstado)
VALUES('Abierta'),('Cerrada')

GO
CREATE TABLE ENTRADA_BODEGA_AREA_PRODUCCION (
    IdEntradaBodegaAP			INT IDENTITY,
    IdBodegaAreaP				INT				NOT NULL,
	IdProveedor					INT				NOT NULL,
	IdEstadoEdicion				INT				NOT NULL	DEFAULT 1,
	IdMoneda					TINYINT			NOT NULL,
	IdTipDesc					TINYINT			NULL,
	IdTrabajador				INT				NOT NULL,
	NFactura					NVARCHAR(50)	NOT NULL,
	RepresentanteProveedor		NVARCHAR(100)	NOT NULL,
	PorcRetencion				NUMERIC(19,7)	NULL,
	Retencion					NUMERIC(19,7)	NULL,
	PorcIva						NUMERIC(19,7)	NULL,
	IvaTotal					NUMERIC(19,7)	NULL,
	IvaTotal_OMoneda			NUMERIC(19,7)	NULL,
	PorcDescuento				NUMERIC(19,7)	NULL,
	DescuentoTotal				NUMERIC(19,7)	NULL		CHECK(DescuentoTotal >= 0),
	DescuentoTotal_OMoneda		NUMERIC(19,7)	NULL,
	SubTotalFactura				NUMERIC(19,7)	NULL		CHECK(SubTotalFactura >= 0),
	SubTotalFactura_OMoneda		NUMERIC(19,7)	NULL,
	TotalFactura				NUMERIC(19,7)	NULL		CHECK(TotalFactura >= 0),
	TotalFactura_OMoneda		NUMERIC(19,7)	NULL,
	FechaHora					SMALLDATETIME	NOT NULL,
    Habilitado					BIT				NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME	NOT NULL	DEFAULT 1,
    UpdatedAt					SMALLDATETIME	NULL,
    CONSTRAINT pk_IdEntradaBodega			PRIMARY KEY (IdEntradaBodegaAP),
    CONSTRAINT FK_BodegaEntradaB							FOREIGN KEY (IdBodegaAreaP) 
				REFERENCES			dbo.BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	CONSTRAINT FK_EstadoEdicion_Bodega_Area_Produccion		FOREIGN KEY (IdEstadoEdicion) 
				REFERENCES			dbo.ESTADO_EDICION (IdEstadoEdicion),
	CONSTRAINT FK_ProveedorEntradaProducto					FOREIGN KEY (IdProveedor)
				REFERENCES			dbo.PROVEEDOR (IdProveedor),
    CONSTRAINT FK_TrabIngreEntradaB							FOREIGN KEY (IdTrabajador) 
				REFERENCES			dbo.TRABAJADOR (IdTrabajador),
	CONSTRAINT FK_Moneda_EntradaB							FOREIGN KEY (IdMoneda)
				REFERENCES			dbo.FACTURACION_MONEDA	(IdMoneda),
	CONSTRAINT FK_Tipo_Descuento_Entrada					FOREIGN KEY(IdTipDesc)
				REFERENCES			dbo.TIPO_DE_DESCUENTO	( IdTipDesc )
);
GO
CREATE TABLE DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION (
    IdDetalleEntradaAP			INT IDENTITY(1,1),
    IdEntradaBodegaAP			INT				NOT NULL,
    IdProducto					INT				NOT NULL,
	IdProcedencia				INT				NOT NULL,
    Cantidad					NUMERIC(17,7)	NOT NULL,
	Costo						NUMERIC(19,7)	NOT NULL,
	CostoProm					NUMERIC(19,7)	NOT NULL,
	PorcIva						NUMERIC(5,2)	NOT NULL,
	Iva							NUMERIC(19,7)	NOT NULL,
	PorcDescuento				NUMERIC(19,7)	NOT NULL,
	DescuentoCalculado			NUMERIC(19,7)	NOT NULL,
    Habilitado					BIT				NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME	NOT NULL	DEFAULT 1,
    UpdatedAt					SMALLDATETIME	NULL,
    CONSTRAINT Pk_DetalleEntradaInv			PRIMARY KEY ( IdDetalleEntradaAP , IdEntradaBodegaAP),
    CONSTRAINT FK_DetalleEntrada			FOREIGN KEY ( IdEntradaBodegaAP) 
			REFERENCES dbo.ENTRADA_BODEGA_AREA_PRODUCCION(IdEntradaBodegaAP),
    CONSTRAINT FK_Producto_EntradaInvent	FOREIGN KEY ( IdProducto) 
			REFERENCES dbo.PRODUCTO(IdProducto)
);
GO
--NOMBRE ANTERIOR 
CREATE TABLE	dbo.DETALLE_BODEGA_AP	(
	IdDetalle			INT IDENTITY(1,1),
	IdBodegaAreaP		INT					NOT NULL,
	IdDetalleEntradaAP	INT					NOT NULL,-- PAra saber que producto de que detalle
	IdEntradaBodegaAP	INT					NOT NULL,--
    IdProductoProveedor	INT					NOT NULL,
	IdEstadoEmpaque		INT					NOT NULL,
    Cantidad			INT					NOT NULL	check(Cantidad >= 0),
    FechaHoraIngreso	SMALLDATETIME		NOT NULL,
    FechaHoraProduccion SMALLDATETIME		NULL,
    Habilitado			BIT					NOT NULL	DEFAULT 1,
    CONSTRAINT pk_IdDetalleBodega			PRIMARY KEY(IdDetalle,IdBodegaAreaP),	
    CONSTRAINT FK_BodegaDelleAP				FOREIGN KEY(IdBodegaAreaP) 
					REFERENCES BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	CONSTRAINT FK_DetalleEntradaBodegaAP	FOREIGN KEY(IdDetalleEntradaAP,IdEntradaBodegaAP) 
					REFERENCES DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(IdDetalleEntradaAP,IdEntradaBodegaAP),
    CONSTRAINT FK_IdProducto				FOREIGN KEY(IdProductoProveedor) 
					REFERENCES dbo.PRODUCTO(IdProducto),
	CONSTRAINT FK_EstadoEmpaqueProductoBodega FOREIGN KEY(IdEstadoEmpaque) REFERENCES ESTADO_EMPAQUE(IdEstadoEmpaque)
)

GO

INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES ('Alimento')
INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES('Limpieza')

USE master;