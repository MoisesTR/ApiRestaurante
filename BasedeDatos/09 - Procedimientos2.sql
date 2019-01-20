USE ATOMIC_RESTAURANTE;
GO

IF OBJECT_ID('USP_CREATE_BANCO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_BANCO;
GO
CREATE PROCEDURE USP_CREATE_BANCO (
	@IdPais		TINYINT,
	@Banco		NVARCHAR(50),
	@Siglas		NVARCHAR(10),
	@Direccion	NVARCHAR(10),
	@Telefono1	NVARCHAR(20),
	@Telefono2	NVARCHAR(20),
	@Correo		NVARCHAR(100),
	@Web		NVARCHAR(10)
)
AS BEGIN
	INSERT INTO FACTURACION_BANCOS(IdPais, Banco, Siglas, Direccion, Telefono1, Telefono2, Correo, Web)
	VALUES(@IdPais, @Banco, @Siglas, @Direccion, @Telefono1, @Telefono2, @Correo, @Web)
END

GO
IF OBJECT_ID('USP_CREATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PRODUCTO
GO
CREATE PROCEDURE USP_CREATE_PRODUCTO(
	@IdProveedor		INT,
    @IdSubClasificacion INT,
    @IdEstado			INT,
    @NombProducto		NVARCHAR(50),
    @DescProducto		NVARCHAR(200),
    @Imagen				NVARCHAR(100),
	@IdEnvase			INT,
	@IdEmpaque			INT,
	@IsGranel			BIT,
	@IdUnidadMedida		INT,
	@ValorUnidadMedida		NUMERIC(10,5),
	@CantidadEmpaque		INT, 
	@DiasRotacion			INT,
	@IdTipInsumo			INT,
	@CodProd			NVARCHAR(200),
	@CodOriginal		NVARCHAR(200),
	@CodBarra			NVARCHAR(200)

) AS BEGIN
	IF EXISTS (SELECT NombProducto FROM dbo.PRODUCTO WHERE IdProveedor = @IdProveedor 
				AND @NombProducto = NombProducto AND IdEnvase = @IdEnvase 
				AND IdUnidadMedida = @IdUnidadMedida AND ValorUnidadMedida = @ValorUnidadMedida)
	BEGIN
		RAISERROR('Ya existe un Producto con las mismas caracteristicas que "%s"',16,1,@NombProducto)
		RETURN	
	END
		
	IF EXISTS (SELECT CodProd FROM dbo.PRODUCTO WHERE CodProd = @CodProd)
	BEGIN
		RAISERROR('Ya existe un Producto con el mismo codigo ingresado',16,1)
		RETURN	
	END
		--BEGIN TRANSACTION
		--BEGIN TRY
			INSERT INTO dbo.PRODUCTO(
			IdProveedor
			, IdSubClasificacion
			, IdEstado,NombProducto
			, DescProducto,Imagen
			, IdEnvase,IdEmpaque
			, IdUnidadMedida
			, ValorUnidadMedida
			, CantidadEmpaque
			, DiasRotacion
			, IdTipInsumo
			, CodProd
			, CodOriginal
			, CodBarra
			)
			VALUES(
			@IdProveedor
			, @IdSubClasificacion
			, @IdEstado
			, @NombProducto
			, @DescProducto
			, @Imagen
			, @IdEnvase
			, @IdEmpaque
			, @IdUnidadMedida
			, @ValorUnidadMedida
			, @CantidadEmpaque
			, @DiasRotacion
			, @IdTipInsumo
			, @CodProd
			, @CodOriginal
			, @CodBarra
			)
			SELECT @@IDENTITY AS IdProducto
		--	COMMIT TRANSACTION
		--END TRY
		--BEGIN CATCH
		--	ROLLBACK TRANSACTION
		--	THROW;
		--END CATCH

END 
GO
IF OBJECT_ID('USP_UPDATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PRODUCTO
GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO(
	@IdProducto			INT,
    @IdCategoria		INT,
    @IdSubClasificacion INT,
    @IdEstado			INT,
    @NombProducto		NVARCHAR(50),
    @Descripcion		NVARCHAR(200),
    @Imagen				NVARCHAR(100) NULL,
	@IdEnvase			INT	NULL,
	@IdEmpaque			INT	NULL,
	@IdUnidadMedida		INT,
	@ValorUnidadMedida	INT,
	@CantidadEmpaque	INT,
	@DiasRotacion		INT,
	@IdTipInsumo		INT,
	@CodProd			NVARCHAR(200),
	@CodOrig			NVARCHAR(200),
	@CodBarra		NVARCHAR(200)

) AS BEGIN 
	UPDATE dbo.PRODUCTO 
	SET IdSubClasificacion= ISNULL(@IdSubClasificacion,IdSubClasificacion)
		,	IdEstado = @IdEstado
		,	NombProducto = @NombProducto
		,	cantidadEmpaque = @CantidadEmpaque
		,   DescProducto	= @Descripcion
		,	Imagen		= @Imagen
		,	IdEnvase	= @IdEnvase
		,	IdEmpaque	= @IdEmpaque
		,	IdUnidadMedida = @IdUnidadMedida
		,	ValorUnidadMedida = @ValorUnidadMedida
		,   DiasRotacion	= ISNULL(@DiasRotacion, DiasRotacion)
		,	IdTipInsumo		= @IdTipInsumo
		,	CodProd			= @CodProd
		,	CodOriginal		= @CodOrig
		,   CodBarra		= @CodBarra
		,	UpdatedAt	= GETDATE()
	WHERE IdProducto = @IdProducto;
END
GO
IF OBJECT_ID('USP_GET_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO
GO
CREATE PROCEDURE USP_GET_PRODUCTO(
	@IdProducto INT
)
AS BEGIN
	SELECT P.IdProducto
			, P.IdProveedor
			, C.IdCategoria
			, C.IdClasificacion
			, P.IdSubClasificacion
			, P.IdEstado
			, P.IdEnvase
			, P.IdEmpaque
			, P.IdUnidadMedida
			, P.ValorUnidadMedida
			, P.CantidadEmpaque
			, P.DiasRotacion
			, P.IdTipInsumo
			, P.CodProd
			, P.CodOriginal
			, P.CodBarra
			, P.NombProducto
			, P.DescProducto
			, P.Imagen
			, P.Habilitado
			, P.CreatedAt
			, P.UpdatedAt 
	FROM dbo.PRODUCTO P
	INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
		ON P.IdSubClasificacion = SC.IdSubClasificacion
	INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
		ON SC.IdClasificacion = C.IdClasificacion
	INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
		ON C.IdCategoria = CP.IdCategoria
	INNER JOIN dbo.PROVEEDOR PRO
		ON P.IdProveedor = PRO.IdProveedor
	 WHERE IdProducto = @IdProducto
END
GO
IF OBJECT_ID('USP_GET_PRODUCTOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS
GO
CREATE PROCEDURE USP_GET_PRODUCTOS
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado is NULL
	BEGIN
		SELECT IdProducto
		, PRO.IdProveedor
		, C.IdCategoria
		, CP.NombCategoria
		, P.IdSubClasificacion
		, SC.NombSubClasificacion
		, C.IdClasificacion
		, C.NombClasificacion
		, p.IdEstado
		, p.NombProducto
		, p.DescProducto
		, p.Imagen
		, P.DiasRotacion
		, P.IdTipInsumo
		, P.CodProd
		, P.CodOriginal
		, P.CodBarra
		, P.Habilitado
		, P.CreatedAt
		, P.UpdatedAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
			ON P.IdSubClasificacion = SC.IdSubClasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON SC.IdClasificacion = C.IdClasificacion
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON C.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor

	END
	ELSE
	BEGIN
		SELECT IdProducto
		, PRO.IdProveedor
		, C.IdCategoria
		, CP.NombCategoria
		, P.IdSubClasificacion
		, SC.NombSubClasificacion
		, C.IdClasificacion
		, C.NombClasificacion
		, P.IdEstado
		, P.NombProducto
		, P.DescProducto
		, P.Imagen
		, P.DiasRotacion
		, P.Habilitado
		, P.CreatedAt
		, P.UpdatedAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
			ON P.IdSubClasificacion = SC.IdSubClasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON SC.IdClasificacion = C.IdClasificacion
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON C.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor
		WHERE P.Habilitado = @Habilitado
	END
END
GO
IF OBJECT_ID('USP_DISP_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PRODUCTO
GO
CREATE PROCEDURE USP_DISP_PRODUCTO(
	@IdProducto INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE dbo.PRODUCTO SET Habilitado = @Habilitado,UpdatedAt=GETDATE() 
	WHERE IdProducto=@IdProducto
END
go
--IF OBJECT_ID('dbo.USP_GET_PRODUCTOS_PROVEEDORES','P') IS NOT NULL
--	DROP PROCEDURE dbo.USP_GET_PRODUCTOS_PROVEEDORES
--GO
--CREATE PROCEDURE dbo.USP_GET_PRODUCTOS_PROVEEDORES
--	@Habilitado BIT NULL
--AS BEGIN
--	IF @Habilitado is NULL
--		SELECT	VPD.*
--				, PVE.NombProveedor
--				, Cantidad = 1
--				, Descuento = 0
--				, GravadoIva = 0 
--		FROM	dbo.V_ProductosDetallados VPD
--				INNER JOIN dbo.PROVEEDOR PVE
--					ON VPD.IdProveedor = PVE.IdProveedor
--	ELSE
--		SELECT VPD.*
--				, Cantidad = 1
--				, Descuento = 0
--				, GravadoIva = 0 
--		FROM	dbo.V_ProductosDetallados VPD
--				INNER JOIN dbo.PROVEEDOR PVE
--					ON VPD.IdProveedor = PVE.IdProveedor
--		WHERE	VPD.Habilitado = @Habilitado;
--END 
GO

--IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDORES','P') IS NOT NULL
--	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDORES
--GO
--CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDORES(
--	@IdProducto INT
--) AS BEGIN
--	SELECT PRO.* FROM dbo.PROVEEDOR PRO
--	INNER JOIN dbo.PRODUCTO_PROVEEDOR PP
--	ON PRO.IdProveedor = PP.IdProveedor
--	WHERE PP.IdProducto = @IdProducto;
--END
--GO
IF OBJECT_ID('USP_GET_PRODUCTOS_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR
GO
--CREATE PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR(
--	@IdProveedor INT
--) AS BEGIN
--	SELECT	VPD.*
--			, PVE.NombProveedor
--	FROM	dbo.V_ProductosDetallados VPD
--		INNER JOIN PROVEEDOR PVE
--			ON	VPD.IdProveedor = PVE.IdProveedor
--	WHERE VPD.IdProveedor = @IdProveedor;
--END
--GO
IF OBJECT_ID('dbo.USP_CREATE_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_CREATE_EMPAQUE(
	@NombEmpaque	NVARCHAR(50),
	@DescEmpaque	NVARCHAR(150)
)
AS BEGIN
	INSERT INTO dbo.EMPAQUE(NombEmpaque,DescEmpaque)
	VALUES(@NombEmpaque,@DescEmpaque)
	SELECT @@IDENTITY AS IdEmpaque
END
GO
IF OBJECT_ID('USP_DISP_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_DISP_EMPAQUE(
	@IdEmpaque	INT,
	@Habilitado BIT
)
AS BEGIN 
	UPDATE dbo.EMPAQUE SET Habilitado=@Habilitado, UpdatedAt = GETDATE() 
	WHERE IdEmpaque = @IdEmpaque
END
GO
IF OBJECT_ID(N'USP_UPDATE_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_UPDATE_EMPAQUE(
	@IdEmpaque		INT,	
	@NombEmpaque		NVARCHAR(50),
	@DescEmpaque		NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.EMPAQUE SET NombEmpaque = @NombEmpaque, DescEmpaque = @DescEmpaque, UpdatedAt = GETDATE()
	WHERE IdEmpaque = @IdEmpaque;
END
GO
IF OBJECT_ID('USP_CREATE_ENVASE','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_ENVASE
GO
CREATE PROCEDURE USP_CREATE_ENVASE(
	@NombEnvase	NVARCHAR(50),
	@DescEnvase	NVARCHAR(150)
)
AS BEGIN
	INSERT INTO dbo.Envase(NombEnvase,	DescEnvase)
	VALUES(@NombEnvase	,@DescEnvase)
	SELECT @@IDENTITY AS IdEnvase
END
GO
IF OBJECT_ID('USP_DISP_ENVASE','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_ENVASE
GO
CREATE PROCEDURE dbo.USP_DISP_ENVASE(
	@IdEnvase	INT,
	@Habilitado BIT
)
AS BEGIN 
	UPDATE dbo.ENVASE SET Habilitado=@Habilitado, UpdatedAt = GETDATE() 
	WHERE IdEnvase = @IdEnvase
END
GO
IF OBJECT_ID(N'dbo.USP_UPDATE_ENVASE', 'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_ENVASE
GO
CREATE PROCEDURE dbo.USP_UPDATE_ENVASE ( 
	@IdEnvase		INT,
	@NombEnvase		NVARCHAR(50),
	@DescEnvase		NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.ENVASE SET NombEnvase = @NombEnvase, DescEnvase = @DescEnvase, UpdatedAt = GETDATE()
		WHERE IdEnvase = @IdEnvase
END
GO
IF OBJECT_ID('USP_CREATE_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_UNIDAD_MEDIDA
GO
CREATE PROCEDURE USP_CREATE_UNIDAD_MEDIDA(
	@IdClasifUnidadMedida		INT,
    @NombUnidad					NVARCHAR(50),
    @Simbolo					NVARCHAR(3),
	@IdUnidadMedidaBase			INT
)
AS BEGIN
	INSERT INTO UNIDAD_MEDIDA(IdClasifUDM,NombUnidad,Simbolo,IdUDMBase)
	VALUES(@IdClasifUnidadMedida,@NombUnidad,@Simbolo, @IdUnidadMedidaBase)
	SELECT @@IDENTITY AS IdUnidadMedida
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE	dbo.USP_UPDATE_UNIDAD_MEDIDA
GO
CREATE PROCEDURE	dbo.USP_UPDATE_UNIDAD_MEDIDA (
	@IdUnidadMedida				INT,
	@IdClasifUnidadMedida		INT				NULL,
    @NombUnidad					NVARCHAR(50)	NULL,
    @Simbolo					NVARCHAR(3)		NULL,
	@IdUnidadMedidaBase			INT				NULL
)
AS BEGIN
	IF COALESCE(@IdClasifUnidadMedida,@NombUnidad, @Simbolo, @IdUnidadMedidaBase) IS NOT NULL
	BEGIN
		UPDATE dbo.UNIDAD_MEDIDA
		SET IdClasifUDM = ISNULL(@IdClasifUnidadMedida,IdClasifUDM), NombUnidad = ISNULL(@NombUnidad,NombUnidad),
			Simbolo = ISNULL(@Simbolo,Simbolo), IdUDMBase = ISNULL(@IdUnidadMedidaBase, IdUDMBase)
			WHERE IdUnidadMedida = @IdUnidadMedida
	END
END
GO 
IF OBJECT_ID('dbo.USP_DISP_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_UNIDAD_MEDIDA
GO
CREATE PROCEDURE dbo.USP_DISP_UNIDAD_MEDIDA(
	@IdUnidadMedida			INT,
	@Habilitado				BIT
) AS BEGIN
	UPDATE dbo.UNIDAD_MEDIDA set Habilitado = @Habilitado,UpdatedAt=GETDATE() Where IdUnidadMedida = @IdUnidadMedida;
END
GO
IF OBJECT_ID('USP_CREATE_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUCURSAL
GO
CREATE PROCEDURE USP_CREATE_SUCURSAL(
	@IdRestaurante	INT,
    @NombSucursal NVARCHAR(100) ,
    @Direccion		NVARCHAR(250),
	@Telefono1		NVARCHAR(20),
	@Telefono2		NVARCHAR(20) NULL
)
AS BEGIN 
	DECLARE @NUM_SUC INT
	SELECT @NUM_SUC = COUNT(IdRestaurante) FROM dbo.SUCURSAL_RESTAURANTE WHERE IdRestaurante = @IdRestaurante
	INSERT INTO dbo.SUCURSAL_RESTAURANTE(IdRestaurante,NumSucursal, NombSucursal,Direccion, Telefono1, Telefono2)
	VALUES(@IdRestaurante,@NUM_SUC,@NombSucursal,@Direccion, @Telefono1, @Telefono2)
	SELECT @@IDENTITY AS IdSucursal
END
GO
IF OBJECT_ID('USP_GET_SUCURSALES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUCURSALES
GO
CREATE PROCEDURE USP_GET_SUCURSALES
	@Habilitado BIT NULL
AS 
BEGIN
	IF @Habilitado IS NULL
		SELECT IdSucursal,NombSucursal,Direccion, Telefono1, Telefono2,Habilitado from dbo.SUCURSAL_RESTAURANTE
	ELSE
		SELECT IdSucursal,NombSucursal,Direccion, Telefono1, Telefono2, Habilitado from dbo.SUCURSAL_RESTAURANTE WHERE Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_CREATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_TRABAJADOR
GO
CREATE PROCEDURE USP_CREATE_TRABAJADOR(
	@IdSucursal		INT NULL,
    @IdCargo		INT,
    @Nombres		NVARCHAR(50),
    @Apellidos		NVARCHAR(50),
	@Imagen			NVARCHAR(50),
	@IdPais			INT,
	@IdTipDoc		INT NULL,
    @Documento		NVARCHAR(50),
    @FechaNacimiento DATE,
    @Direccion		NVARCHAR(300),
	@Telefono1		NVARCHAR(20),
	@Telefono2		NVARCHAR(20),
    @FechaIngreso DATE 
)
AS BEGIN 

	IF EXISTS (SELECT 1 FROM TRABAJADOR WHERE Documento = @Documento AND @IdTipDoc = 1)
	BEGIN
		RAISERROR('Esta cedula ya se encuentra registrada!!',16,1);
		RETURN
	END

	IF (@Telefono1 = @Telefono2)
	BEGIN
		RAISERROR('Los telefonos no pueden ser iguales!!',16,1)
		RETURN
	END

	INSERT INTO TRABAJADOR(IdSucursal,IdCargo,Nombres,Apellidos,IdTipDoc,IdPais, Documento, Imagen, FechaNacimiento,Direccion, Telefono1,Telefono2,FechaIngreso)
	VALUES(@IdSucursal,@IdCargo,@Nombres,@Apellidos,ISNULL(@IdTipDoc,1),@IdPais, @Documento, @Imagen, @FechaNacimiento,@Direccion,@Telefono1, @Telefono2,@FechaIngreso)
	SELECT @@IDENTITY AS IdTrabajador
END
GO
IF OBJECT_ID('USP_UPDATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_TRABAJADOR
GO
CREATE PROCEDURE USP_UPDATE_TRABAJADOR(	
	@IdTrabajador	INT,
	@IdSucursal		INT NULL,
    @IdCargo		INT,
    @Nombres		NVARCHAR(50),
    @Apellidos		NVARCHAR(50),
	@IdTipDoc	INT,
    @Documento			NVARCHAR(50),
	@Imagen				NVARCHAR(50), 
    @FechaNacimiento	DATE,
    @Direccion			NVARCHAR(300),
	@Telefono1			NVARCHAR(20),
	@Telefono2			NVARCHAR(20),
    @FechaIngreso		DATE 
)
AS BEGIN 
	UPDATE TRABAJADOR 
	SET IdSucursal=@IdSucursal,IdCargo=@IdCargo,nombres=@Nombres,Apellidos=@Apellidos, 
		Imagen = @Imagen,Documento=@Documento,FechaNacimiento=@FechaNacimiento,
		Telefono1 = @Telefono1, Telefono2 = @Telefono2,	UpdatedAt=GETDATE()
		WHERE IdTrabajador = @IdTrabajador

	IF EXISTS(SELECT 1 FROM USUARIO WHERE IdTrabajador = @IdTrabajador)
		UPDATE USUARIO SET Imagen = @Imagen FROM USUARIO WHERE IdTrabajador = @IdTrabajador
END
GO
IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDOR(
	@IdProveedor INT
)
AS BEGIN
	SELECT 
		PRO.IdProducto
		, PVE.IdProveedor
		, PRO.IdEnvase
		, PRO.IdEmpaque
		, PRO.IdUnidadMedida
		, PRO.ValorUnidadMedida
		, PRO.CantidadEmpaque
		, PRO.Habilitado 
	FROM dbo.PRODUCTO PRO
	INNER JOIN dbo.PROVEEDOR PVE
		ON PRO.IdProveedor = PVE.IdProveedor
	WHERE PRO.IdProveedor = @IdProveedor
END
GO
IF OBJECT_ID('UFN_CHECK_ESTADO_EMPAQUE','FN') IS NOT NULL
	DROP FUNCTION UFN_CHECK_ESTADO_EMPAQUE
GO
CREATE FUNCTION UFN_CHECK_ESTADO_EMPAQUE(
	@IdProducto INT,
	@Cantidad INT
)
RETURNS INT
AS
BEGIN
	DECLARE @CANTIDAD_ESPERADA INT;
	DECLARE @RETORNO INT;
	SELECT @CANTIDAD_ESPERADA = CantidadEmpaque 
	FROM dbo.PRODUCTO 
		WHERE IdProducto = @IdProducto;
	IF @CANTIDAD_ESPERADA = NULL
		SET @RETORNO= 3;
	ELSE IF @CANTIDAD_ESPERADA = @Cantidad
		SET @RETORNO = 1;
	ELSE
		SET @RETORNO= 2;
	RETURN @RETORNO;
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_SUCURSAL',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_SUCURSAL
GO
CREATE PROCEDURE [dbo].USP_UPDATE_SUCURSAL(
	@IdSucursal			INT,
    @NombSucursal		NVARCHAR(100) ,
    @Direccion			NVARCHAR(250) ,
	@Telefono1			NVARCHAR(20) ,
	@Telefono2			NVARCHAR(20) NULL
) AS BEGIN
	UPDATE dbo.SUCURSAL_RESTAURANTE SET NombSucursal=@NombSucursal,Direccion=@Direccion,
    Telefono1 = @Telefono1,Telefono2 = ISNULL(@Telefono2, Telefono2), UpdatedAt=GETDATE() 
	WHERE IdSucursal = @IdSucursal;
END 
GO
IF OBJECT_ID('dbo.USP_DISP_SUCURSAL',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_SUCURSAL
GO
CREATE PROCEDURE dbo.USP_DISP_SUCURSAL(
	@IdSucursal			INT,
	@Habilitado			BIT
) AS BEGIN
	UPDATE dbo.SUCURSAL_RESTAURANTE SET Habilitado = @Habilitado, UpdatedAt = GETDATE() WHERE IdSucursal = @IdSucursal
END

GO	

USE master