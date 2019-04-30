USE ATOMIC_RESTAURANTE
GO
USE ATOMIC_RESTAURANTE;

GO
IF OBJECT_ID('USP_CREATE_RESTAURANTE', 'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_RESTAURANTE;
GO
CREATE PROCEDURE USP_CREATE_RESTAURANTE ( 
--@IdRestaurante	INT,
@IdMoneda		TINYINT,
@IdPais			TINYINT,
@IdMonedaFacturacion	TINYINT,
@IsAutoBackup			BIT,
@IsCuotaFija			BIT,
@NombRestaurante		NVARCHAR(100),
@DescRestaurante		NVARCHAR(150),
@CuotaFija				NUMERIC(17,7),
@PorcIva				NUMERIC(5,2),
@RazonSocial			NVARCHAR(100),
@SitioWeb				NVARCHAR(100),
@Correo					NVARCHAR(100),
@TelPrincipal			NVARCHAR(20),
@TelPrincipal2			NVARCHAR(20),
@FechaFundacion			SMALLDATETIME,
@Login					NVARCHAR(150),
@Workspace				NVARCHAR(150)
)
AS BEGIN

	INSERT INTO RESTAURANTE(
	IdMoneda
	, IdPais
	, IdMonedaFacturacion
	, IsAutoBackup
	, IsCuotaFija
	, NombRestaurante
	, DescRestaurante
	, CuotaFija
	, PorcIva
	, RazonSocial
	, SitioWeb
	, Correo
	, TelPrincipal
	, TelPrincipal2
	, FechaFundacion
	, Login
	, Workspace
	)
VALUES(
	@IdMoneda
	, @IdPais
	, @IdMonedaFacturacion
	, @IsAutoBackup
	, @IsCuotaFija
	, @NombRestaurante
	, @DescRestaurante
	, @CuotaFija
	, @PorcIva
	, @RazonSocial
	, @SitioWeb
	, @Correo
	, @TelPrincipal
	, @TelPrincipal2
	, @FechaFundacion
	, @Login
	, @Workspace
	)

END
GO
IF OBJECT_ID('USP_CREATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CARGO
GO
CREATE PROCEDURE USP_CREATE_CARGO(
	@NombCargo	NVARCHAR(50),
    @DescCargo	NVARCHAR(150),
	@CodCargo	Nvarchar(4)
)
AS BEGIN
	IF EXISTS (SELECT NombCargo FROM dbo.CARGO_TRABAJADOR WHERE NombCargo = @NombCargo )  
		RAISERROR('Ya existe un cargo con este Nombre',14,1)  
	ELSE
	BEGIN
		INSERT INTO dbo.CARGO_TRABAJADOR(NombCargo,	DescCargo, CodCargo)
		VALUES(@NombCargo,	@DescCargo,	@CodCargo)
		SELECT @@IDENTITY AS IdCargo
	END
END
GO
IF OBJECT_ID('USP_UPDATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CARGO
GO
CREATE PROCEDURE USP_UPDATE_CARGO(
	@IdCargo	INT,
	@NombCargo	NVARCHAR(50),
    @DescCargo	NVARCHAR(150),
	@CodCargo	NVARCHAR(4)
)
AS BEGIN
	UPDATE	CARGO_TRABAJADOR 
	SET		NombCargo = @NombCargo
			, DescCargo = @DescCargo
			, CodCargo = @CodCargo
			, UpdatedAt = GETDATE()
	WHERE	IdCargo = @IdCargo
END
GO
IF OBJECT_ID('USP_DISP_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_CARGO
GO
CREATE PROCEDURE USP_DISP_CARGO(
	@IdCargo	INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE dbo.CARGO_TRABAJADOR SET Habilitado = @Habilitado, UpdatedAt = GETDATE() 
	WHERE IdCargo=@IdCargo
END
GO
IF OBJECT_ID('USP_GET_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT T.IdTrabajador
	, T.IdSucursal
	, S.NombSucursal
	, T.IdCargo
	, C.NombCargo
	, T.Nombres
	, T.Apellidos
	, T.IdTipDoc
	, T.Documento
	, T.Imagen
	, T.FechaNacimiento
	, T.Direccion
	, T.Telefono1
	, T.Telefono2
	, T.FechaIngreso
	, T.Habilitado
	, T.CreatedAt
	, T.UpdatedAt
	FROM dbo.TRABAJADOR T 
	INNER JOIN dbo.SUCURSAL_RESTAURANTE S ON T.IdSucursal= S.IdSucursal
	INNER JOIN dbo.CARGO_TRABAJADOR C ON T.IdCargo = C.IdCargo
	WHERE T.IdTrabajador = @IdTrabajador
END
GO
IF OBJECT_ID('USP_DISP_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_TRABAJADOR
GO
CREATE PROCEDURE USP_DISP_TRABAJADOR(
	@IdTrabajador	INT,
	@Habilitado		BIT
) AS BEGIN
	UPDATE dbo.TRABAJADOR SET Habilitado = @Habilitado,UpdatedAt=GETDATE() 
	WHERE IdTrabajador = @IdTrabajador
END
GO
IF OBJECT_ID('USP_GET_DETALLE_BODEGA_AP','P') IS NOT NULL
	DROP PROCEDURE USP_GET_DETALLE_BODEGA_AP
GO
CREATE PROCEDURE USP_GET_DETALLE_BODEGA_AP
	@IdBodegaAreaP INT
AS BEGIN
	SELECT	IdDetalle,	IdBodegaAreaP,	IdDetalleEntradaAP,	IdEntradaBodegaAP,	P.IdProveedor,	
			DAP.IdProductoProveedor,	P.IdProducto, P.NombProducto,	CP.IdCategoria,	C.NombCategoria,
			SP.IdClasificacion,	CP.NombClasificacion,
			Cantidad,	FechaHoraIngreso,	FechaHoraProduccion,	DAP.Habilitado 
	FROM dbo.DETALLE_BODEGA_AP DAP
	INNER JOIN PRODUCTO  P 
		ON DAP.IdProductoProveedor = P.IdProducto
	INNER JOIN PROVEEDOR PROV
		ON P.IdProveedor = PROV.IdProveedor
	INNER JOIN SUBCLASIFICACION_PRODUCTO SP 
		ON P.IdSubClasificacion = SP.IdSubClasificacion
	INNER JOIN CLASIFICACION_PRODUCTO CP 
		ON SP.IdClasificacion = CP.IdClasificacion
	INNER JOIN CATEGORIA_PRODUCTO C
		ON CP.IdCategoria = C.IdCategoria
END
GO
IF OBJECT_ID('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION','P') IS NOT NULL
	DROP PROCEDURE USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION
GO
CREATE PROCEDURE USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION(
	@IdBodegaAreaP INT,
    @IdTrabajador INT,
	@IdProveedor INT,
	@NFactura NVARCHAR(20),
	@RepresentanteProveedor NVARCHAR(50),
	--SubTotalFactura MONEY NULL CHECK(SubTotalFactura > 0),
	@PorcRetencion NUMERIC(10,5) NULL,
	@PorcIva NUMERIC(10,5) NULL,
	--IvaTotal MONEY NULL,
	@PorcDescuento NUMERIC(10,5) NULL,
	--DescuentoTotal MONEY NULL CHECK(DescuentoTotal >= 0),
	--TotalFactura MONEY NULL,
	@FechaHora DATETIME
)
AS BEGIN
	INSERT INTO ENTRADA_BODEGA_AREA_PRODUCCION(IdBodegaAreaP,IdTrabajador,IdProveedor,NFactura,RepresentanteProveedor,PorcIva,PorcDescuento,FechaHora)
	values(@IdBodegaAreaP,@IdTrabajador,@IdProveedor,@NFactura,@RepresentanteProveedor,@PorcIva,@PorcDescuento,@FechaHora)
END
GO
IF OBJECT_ID('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION','P') IS NOT NULL
	DROP PROCEDURE USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION
GO
--CREATE PROCEDURE USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(
--	@IdEntradaBodegaAP	INT,
--    @IdProcedencia		INT,
--    @Cantidad			INT,
--	@PrecioUnitarioEntrada MONEY,
--	@DescuentoCalculado MONEY
--)
--AS BEGIN
--	DECLARE @PrecioUnitarioActual MONEY
	
--	INSERT INTO dbo.DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(IdEntradaBodegaAP,IdProcedencia,Cantidad, DescuentoCalculado)
--	VALUES(@IdEntradaBodegaAP,	@IdProcedencia, @Cantidad,	@PrecioUnitarioEntrada,	@DescuentoCalculado)
--END
GO
IF OBJECT_ID('USP_GENERAR_FACTURA','P') IS NOT NULL
	DROP PROCEDURE USP_GENERAR_FACTURA
GO
CREATE PROCEDURE USP_GENERAR_FACTURA
	@IdEntradaBodegaAP INT
AS BEGIN
	UPDATE ENTRADA_BODEGA_AREA_PRODUCCION SET IdEstadoEdicion = 2,UpdatedAt=GETDATE() WHERE IdEntradaBodegaAP = @IdEntradaBodegaAP
END
GO
IF OBJECT_ID('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION') IS NOT NULL
	DROP PROCEDURE dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION (
	@NombTipDoc		NVARCHAR(50),
	@DescTipDoc	NVARCHAR(150)
)
AS BEGIN
	IF EXISTS(SELECT IdTipDoc FROM dbo.TIPO_DOCUMENTO_IDENTIFICACION WHERE NombTipDoc = @NombTipDoc)
		BEGIN
			RAISERROR('Ya existe un tipo de documento llamado "%s".',16,1,@NombTipDoc)
		END
	ELSE
		BEGIN
			INSERT INTO dbo.TIPO_DOCUMENTO_IDENTIFICACION(NombTipDoc, DescTipDoc)
			VALUES(@NombTipDoc, @DescTipDoc)

			SELECT @@IDENTITY AS IdTipDoc
		END
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION(
	@IdTipDoc		INT,
	@NombTipDoc		NVARCHAR(50),
	@DescTipDoc		NVARCHAR(50)
)
AS BEGIN
	UPDATE dbo.TIPO_DOCUMENTO_IDENTIFICACION SET NombTipDoc=@NombTipDoc, DescTipDoc = @DescTipDoc  , UpdatedAt = GETDATE()
	WHERE IdTipDoc = @IdTipDoc
END
GO
IF OBJECT_ID('dbo.USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION;
GO
CREATE PROCEDURE [dbo].[USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION](
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT	IdTipDoc, NombTipDoc, DescTipDoc, Habilitado, CreatedAt
		FROM	dbo.TIPO_DOCUMENTO_IDENTIFICACION
	ELSE
		SELECT	IdTipDoc, NombTipDoc, DescTipDoc, Habilitado,CreatedAt
		FROM	dbo.TIPO_DOCUMENTO_IDENTIFICACION T 
		WHERE T.Habilitado = @Habilitado
END
GO
IF OBJECT_ID('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION(
	@IdTipDoc	INT,
	@Habilitado			BIT
)
AS BEGIN
	UPDATE dbo.TIPO_DOCUMENTO_IDENTIFICACION SET Habilitado = @Habilitado , UpdatedAt = GETDATE()
	WHERE	IdTipDoc = @IdTipDoc
END

GO
IF OBJECT_ID('USP_CREATE_UNIDAD_MEDIDA_FUNCIONAL', N'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_UNIDAD_MEDIDA_FUNCIONAL
GO
CREATE PROCEDURE USP_CREATE_UNIDAD_MEDIDA_FUNCIONAL(
	@IdUdmFuncional		INT				OUTPUT,
	@IdUnidadMedida		INT,
	@Nombre				NVARCHAR(50),
	@Descripcion		NVARCHAR(50)	NULL,
	@ValorUdm			NUMERIC(10,5)
) AS BEGIN
	INSERT INTO dbo.UNIDAD_MEDIDA_FUNCIONAL(IdUnidadMedida, NombUdmFunc, DescUdmFunc, ValorUdm)
	VALUES(@IdUnidadMedida, @Nombre, @Descripcion, @ValorUdm)
	
	SELECT @IdUdmFuncional = @@IDENTITY
END
GO

IF OBJECT_ID('USP_GET_PRODUCTOS_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN
	SELECT	VPD.*
			, PVE.NombProveedor
	FROM	dbo.V_ProductosDetallados VPD
		INNER JOIN PROVEEDOR PVE
			ON	VPD.IdProveedor = PVE.IdProveedor
	WHERE VPD.IdProveedor = @IdProveedor;
END
GO
