USE ATOMIC_RESTAURANTE;
GO
IF OBJECT_ID('dbo.BITACORA_CAMBIOS_FACTURA') IS NOT NULL DROP TABLE dbo.BITACORA_CAMBIOS_FACTURA
GO
IF OBJECT_ID('dbo.DETALLE_FACTURA_COMPRA') is not null drop table dbo.DETALLE_FACTURA_COMPRA
go

IF OBJECT_ID('dbo.FACTURA_COMPRA') is not null drop table dbo.FACTURA_COMPRA
go

IF OBJECT_ID('dbo.ESTADO_FACTURA') is not null drop table dbo.ESTADO_FACTURA
go
IF OBJECT_ID('dbo.SERIE_DOCUMENTO') is not null drop table dbo.SERIE_DOCUMENTO
go
CREATE TABLE	dbo.SERIE_DOCUMENTO	(
	Serie		VARCHAR(5) NOT NULL,
	DescDoc		VARCHAR(150) NOT NULL,
	CONSTRAINT 	PK_SERIE_DOCUMENTO PRIMARY KEY(Serie)
)
GO
INSERT INTO dbo.SERIE_DOCUMENTO
	VALUES('F/C','Factura de Compra')
GO
CREATE TABLE dbo.ESTADO_FACTURA(
	IdEstadoFactura INT IDENTITY(1,1),
	NombEstado	NVARCHAR(50) NOT NULL,
	DescripcionEstado NVARCHAR(150) NULL,
	CONSTRAINT PK_ESTADO_FACTURA PRIMARY KEY(IdEstadoFactura)
)
GO
INSERT INTO ESTADO_FACTURA(NombEstado, DescripcionEstado)
VALUES('Borrador',null),('Abierta(En Edicion)','Que la factura se esta ingresando, y no se ha calculado'),
('Cerrada', null), ('Cancelada', null)
GO
CREATE TABLE FACTURA_COMPRA(
	IdFactura		INT IDENTITY(1,1),
	Serie			VARCHAR(5) DEFAULT 'F/C' NOT NULL,
	NumRefFactura	NVARCHAR(50) NOT NULL UNIQUE,
	IdProveedor		INT NOT NULL, --
	IdTrabajador	INT NOT NULL,
	IdTipoMoneda	INT NOT NULL DEFAULT 1,
	IdFormaPago		INT NOT NULL DEFAULT 1,
	IdEstadoFactura INT NOT NULL DEFAULT 2, --Abierta por default
	NombVendedor	VARCHAR(100) NULL,
	FechaFactura	SMALLDATETIME NOT NULL,
	FechaRecepcion	DATETIME NOT NULL,
	SubTotal		NUMERIC(14,2) DEFAULT 0 CHECK(SubTotal >= 0) NOT NULL,
	TotalIva		NUMERIC(14,2) DEFAULT 0 CHECK(TotalIva >= 0) NOT NULL,
	CambioActual	NUMERIC(14,2) CHECK(CambioActual > 0) NOT NULL,
	TotalDescuento	NUMERIC(14,2) DEFAULT 0 CHECK(TotalDescuento >= 0) NOT NULL,
	TotalCordobas	NUMERIC(14,2) DEFAULT 0 CHECK(TotalCordobas >= 0) NOT NULL,
	TotalOrigenFactura NUMERIC(14,2) DEFAULT 0 CHECK(TotalOrigenFactura >= 0) NOT NULL,
	ImgRespaldo	NVARCHAR(200) NULL DEFAULT 'noimage.png',
	Habilitado	BIT DEFAULT 1 NOT NULL,
	CreatedAt	SMALLDATETIME DEFAULT GETDATE() NOT NULL,
	UpdatedAt	SMALLDATETIME NULL,
	CONSTRAINT Pk_FacturaCompra PRIMARY KEY(IdFactura),
	CONSTRAINT fk_ProveedorFactura FOREIGN KEY(IdProveedor) 
		REFERENCES dbo.PROVEEDOR(IdProveedor),
	CONSTRAINT FK_TrabajadorIngresaFacturaCompra FOREIGN KEY(IdTrabajador) 
		REFERENCES dbo.TRABAJADOR(IdTrabajador),
	CONSTRAINT FK_EstadoFacturaCompra FOREIGN KEY( IdEstadoFactura) 
		REFERENCES dbo.ESTADO_FACTURA(IdEstadoFactura),
	CONSTRAINT FK_SerieFacturaCompra FOREIGN KEY(Serie)
		REFERENCES dbo.SERIE_DOCUMENTO(Serie)
)
GO
CREATE TABLE DETALLE_FACTURA_COMPRA(
	IdDetalle			INT IDENTITY(1,1) NOT NULL,
	IdFactura			INT NOT NULL,
	IdProducto			INT NOT NULL,
	PrecioUnitario		NUMERIC(14,2) NOT NULL CHECK(PrecioUnitario >= 0),
	Cantidad			INT NOT NULL CHECK(Cantidad > 0),
	GravadoIva			BIT NOT NULL,
	SubTotal			NUMERIC(14,2),
	SubTotal_Cal		AS CAST(ROUND((Cantidad * PrecioUnitario),2) AS NUMERIC(14,2)),
	Iva					NUMERIC(14,2),
	Iva_Cal				AS CAST(ROUND(((Cantidad * PrecioUnitario) * GravadoIva * 0.15),2) AS NUMERIC(14,2)),
	Descuento			Numeric(14,2) NOT NULL CHECK(Descuento >= 0),
	TotalDetalle		NUMERIC(14,2) NOT NULL,
	Total_Cal			AS CAST(ROUND((((Cantidad * PrecioUnitario) + (Cantidad * PrecioUnitario * GravadoIva * 0.15)) - Descuento),2) AS NUMERIC(14,2)),
	Bonificacion		BIT DEFAULT 0 NOT NULL,
	Habilitado			BIT DEFAULT 1 NOT NULL,
	CreatedAt			DATE NOT NULL DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME NULL,
	CONSTRAINT PK_DetalleFacturaCompra PRIMARY KEY(IdDetalle, IdFactura),
	CONSTRAINT FK_FacturaCompraDetalle FOREIGN KEY(IdFactura) REFERENCES FACTURA_COMPRA(IdFactura),
	CONSTRAINT FK_ProductoFacturaCompra FOREIGN KEY(IdProducto) REFERENCES PRODUCTO(IdProducto)
)
GO
IF OBJECT_ID('dbo.USP_CREATE_FACTURA_COMPRA', N'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_FACTURA_COMPRA
GO
CREATE PROCEDURE USP_CREATE_FACTURA_COMPRA(
	@NumRefFactura  NVARCHAR(50),
	@IdProveedor	INT,
	@IdTrabajador	INT,
	@IdTipoMoneda	INT,
	@IdFormaPago	INT,
	@NombVendedor	NVARCHAR(100),
	@FechaFactura	SMALLDATETIME,
	@FechaRecepcion	SMALLDATETIME,
	@SubTotal		NUMERIC(14,2),
	@TotalIva		NUMERIC(14,2),	
	@CambioActual	NUMERIC(14,2),
	@TotalDescuento	NUMERIC(14,2),
	@TotalCordobas	NUMERIC(14,2),
	@TotalOrigenFactura NUMERIC(14,2),
	@IdFactura		INT OUTPUT
)
AS BEGIN

	IF EXISTS(SELECT NumRefFactura FROM dbo.FACTURA_COMPRA WHERE NumRefFactura = @NumRefFactura) 
	BEGIN 
		RAISERROR('El codigo de la factura ya se encuentra registrado!',16,1)
		RETURN	
	END

	INSERT INTO dbo.FACTURA_COMPRA(IdProveedor,NumRefFactura, IdTrabajador,IdTipoMoneda, IdFormaPago, NombVendedor,
		FechaFactura,FechaRecepcion, SubTotal, TotalIva,CambioActual, TotalDescuento, TotalCordobas,TotalOrigenFactura)
	VALUES(@IdProveedor,@NumRefFactura, @IdTrabajador,@IdTipoMoneda, @IdFormaPago, @NombVendedor, @FechaFactura,@FechaRecepcion, @Subtotal,
			@TotalIva, @CambioActual, @TotalDescuento, @TotalCordobas, @TotalOrigenFactura)
	SET @IdFactura = @@IDENTITY
END
GO
IF OBJECT_ID('dbo.USP_CREATE_DETALLE_FACTURA_COMPRA', N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_DETALLE_FACTURA_COMPRA
GO
CREATE PROCEDURE USP_CREATE_DETALLE_FACTURA_COMPRA(
	@IdDetalle		INT OUTPUT,
	@IdFactura		INT ,
	@IdProducto		INT ,
	@PrecioUnitario NUMERIC(14,2),
	@Cantidad		INT,
	@GravadoIva		BIT ,
	@SubTotal		NUMERIC(14,2),
	@Iva			NUMERIC(14,2),
	@Descuento		NUMERIC(14,2),
	@TotalDetalle	NUMERIC(14,2),
	@Bonificacion	BIT NULL
)
AS BEGIN
	INSERT INTO DETALLE_FACTURA_COMPRA(IdFactura, IdProducto, PrecioUnitario, Cantidad,
				GravadoIva, SubTotal, Iva, Descuento, TotalDetalle, Bonificacion)
	VALUES(@IdFactura, @IdProducto, @PrecioUnitario, @Cantidad, @GravadoIva,@SubTotal,
			@Iva, @Descuento,@TotalDetalle, @Bonificacion )
	
	SELECT @IdDetalle = @@IDENTITY
END

GO
USE master

