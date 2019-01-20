use ATOMIC_RESTAURANTE;
go
IF OBJECT_ID('USP_CREATE_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CATEGORIA
GO
CREATE PROCEDURE USP_CREATE_CATEGORIA(
	@IdTipInsumo	TINYINT,
	@NombCategoria	NVARCHAR(50),
    @DescCategoria	NVARCHAR(150) 
) 
AS 
BEGIN
	IF EXISTS(SELECT * FROM CATEGORIA_PRODUCTO where NombCategoria = @NombCategoria) 
		RAISERROR('Nombre de Categoria duplicado.',16,1)
	ELSE
		BEGIN
			INSERT INTO CATEGORIA_PRODUCTO(IdTipInsumo, NombCategoria,DescCategoria)
			VALUES(@IdTipInsumo, @NombCategoria, @DescCategoria);
			SELECT @@IDENTITY AS IdCategoria
		END
END
GO
IF OBJECT_ID('dbo.USP_DISP_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_CATEGORIA
GO
CREATE PROCEDURE dbo.USP_DISP_CATEGORIA (
	@IdCategoria	INT,
	@Habilitado		BIT
)
AS BEGIN
	UPDATE dbo.CATEGORIA_PRODUCTO
	SET Habilitado = @Habilitado, UpdatedAt = GETDATE()
	WHERE IdCategoria = @IdCategoria
END
GO

IF OBJECT_ID('USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA
GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA(
	@IdCategoria INT
	, @Habilitado BIT 
) AS BEGIN
	SELECT	*
	FROM	dbo.CATEGORIA_PRODUCTO CAT
			INNER JOIN	CLASIFICACION_PRODUCTO CLASI
				ON CAT.IdCategoria = CLASI.IdCategoria
	WHERE	@IdCategoria = CAT.IdCategoria
			AND @Habilitado = CAT.Habilitado
END 

GO
IF OBJECT_ID('USP_CREATE_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CLASIFICACION
GO
CREATE PROCEDURE USP_CREATE_CLASIFICACION(
	@IdCategoria				INT,
	@NombClasificacion			NVARCHAR(50),
    @DescClasificacion			NVARCHAR(150)
) AS BEGIN
	IF EXISTS(SELECT * from dbo.CLASIFICACION_PRODUCTO where NombClasificacion = @NombClasificacion) 
		BEGIN
 		RAISERROR('Ya existe una Clasificacion con este nombre.',16,1)
 		END
	ELSE
	BEGIN
		INSERT INTO dbo.CLASIFICACION_PRODUCTO(IdCategoria,NombClasificacion,DescClasificacion)
		VALUES(@IdCategoria, @NombClasificacion, @DescClasificacion);		
		SELECT @@IDENTITY AS IdClasificacion
     END
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACIONES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES
GO
IF OBJECT_ID('USP_UPDATE_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_CLASIFICACION(
	@IdCategoria			INT,
	@IdClasificacion		INT,
	@NombClasificacion	NVARCHAR(50),
    @DescClasificacion NVARCHAR(150)
) 
AS BEGIN
	IF COALESCE(@IdCategoria, @NombClasificacion, @DescClasificacion) IS NOT NULL
		BEGIN
			UPDATE dbo.CLASIFICACION_PRODUCTO
			SET IdCategoria = ISNULL(@IdCategoria,IdCategoria), NombClasificacion = ISNULL(@NombClasificacion,NombClasificacion),DescClasificacion  = @DescClasificacion,
				UpdatedAt=GETDATE() 
				WHERE IdClasificacion = @IdClasificacion;
		END
END
GO
IF OBJECT_ID('USP_DISP_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_CLASIFICACION
GO
--Nombre anterior USP_DispClasificaion
CREATE PROCEDURE USP_DISP_CLASIFICACION(
	@IdClasificacion INT,
	@Habilitado BIT
) AS BEGIN 
	UPDATE dbo.CLASIFICACION_PRODUCTO SET Habilitado = @Habilitado,UpdatedAt=GETDATE() WHERE IdClasificacion = @IdClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACION
GO

IF OBJECT_ID('USP_CREATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_CREATE_SUBCLASIFICACION(
	@IdClasificacion				INT,
    @NombSubClasificacion			NVARCHAR(50),
    @DescSubClasificacion			NVARCHAR(150)
) AS BEGIN
	IF NOT EXISTS(SELECT * FROM dbo.CLASIFICACION_PRODUCTO where IdClasificacion = @IdClasificacion)
		RAISERROR('La Clasificacion Seleccionada no se encontro, por lo tanto no se inserto la Subclasificacion.',16,1);
    ELSE
		BEGIN
			INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombSubClasificacion,DescSubclasificacion)
			VALUES(@IdClasificacion,@NombSubClasificacion,@DescSubClasificacion);
			SELECT @@IDENTITY AS IdSubClasificacion
		END
END
GO
IF OBJECT_ID('USP_UPDATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_SUBCLASIFICACION(
	@IdSubClasificacion					INT,
    @IdClasificacion					INT NULL,
	@NombSubClasificacion				NVARCHAR(50)  NULL,
    @DescSubClasificacion				NVARCHAR(150) NULL
) AS BEGIN
	IF COALESCE(@IdSubClasificacion, @NombSubClasificacion, @DescSubClasificacion) IS NOT NULL
		BEGIN
			UPDATE SUBCLASIFICACION_PRODUCTO
			SET IdClasificacion = ISNULL(@IdClasificacion,IdClasificacion)
			,NombSubClasificacion = ISNULL(@NombSubClasificacion, NombSubClasificacion),DescSubclasificacion  = ISNULL(@DescSubClasificacion,DescSubclasificacion),UpdatedAt=GETDATE() 
			WHERE IdSubClasificacion = @IdSubClasificacion;
		END
END 
GO
IF OBJECT_ID('USP_DISP_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_SUBCLASIFICACION
GO
--Nombre anterior USP_DispSubClasificaion
CREATE PROCEDURE USP_DISP_SUBCLASIFICACION(
	@IdSubClasificacion INT,
	@Habilitado BIT
) AS BEGIN 
	UPDATE SUBCLASIFICACION_PRODUCTO SET Habilitado = @Habilitado, UpdatedAt=GETDATE() WHERE IdSubClasificacion = @IdSubClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACION
GO
--Nombre anterior GetSubClasificacion
CREATE PROCEDURE USP_GET_SUBCLASIFICACION(
	@IdSubClasificacion INT
) AS BEGIN 
	SELECT s.IdSubClasificacion,s.NombSubClasificacion,s.DescSubClasificacion,s.IdClasificacion,c.NombClasificacion,s.Habilitado,s.CreatedAt,s.UpdatedAt 
	FROM SUBCLASIFICACION_PRODUCTO s INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion 
	WHERE IdSubClasificacion=@IdSubClasificacion;
END
GO
IF OBJECT_ID('USP_CREATE_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PROVEEDOR
GO
GO
CREATE PROCEDURE USP_CREATE_PROVEEDOR(
	@IdPais				INT,
	@IsProvServicio		BIT,
	@NombProveedor		NVARCHAR(50), -- NOT NULL,
    @Direccion			NVARCHAR(200),-- NOT NULL,
    @Email				NVARCHAR(100),-- NULL
	@Imagen				NVARCHAR(50)	NULL,
    @DescProveedor		NVARCHAR(200),-- NULL,
    @NombRepresentante	NVARCHAR(100), -- NOT NULL,
	@IdTipDoc			INT				NULL,
	@Documento			NVARCHAR(20), --Por defecto sera el numero ruc
	@Abreviatura		NVARCHAR(20),
	--@Retencion2			BIT NULL,
	@IsMercado			BIT NULL
) AS BEGIN
	BEGIN TRANSACTION myTran
	BEGIN TRY

		IF EXISTS (SELECT NombProveedor FROM PROVEEDOR WHERE NombProveedor = @NombProveedor AND Habilitado = 1)
		BEGIN
			RAISERROR('Ya existe un proveedor registrado con este nombre.',16,1);
			RETURN
		END

		IF EXISTS (SELECT Documento FROM PROVEEDOR WHERE Documento = @Documento AND Habilitado = 1)
		BEGIN
			RAISERROR('El Numero Ruc del proveedor ya existe.',16,1);
			RETURN
		END

		IF (@Documento IS NULL AND @IsMercado = 0)
		BEGIN
			RAISERROR('Debes ingresar al menos un documento de referencia.',16,1);
			RETURN
		END

		INSERT INTO PROVEEDOR( IdPais,	IsProvServicio, NombProveedor,	Direccion,	Email,	DescProveedor,	NombRepresentante, 
								IdTipDoc,	Documento,	Abreviatura,		IsMercado)
		VALUES(	@IdPais,	@IsProvServicio,	@NombProveedor,	@Direccion,	@Email,	@DescProveedor,	@NombRepresentante,
								@IdTipDoc,	@Documento,	@Abreviatura,	@IsMercado);
		SELECT @@IDENTITY AS IdProveedor
		COMMIT TRANSACTION myTran;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION myTran;
		THROW;
	END CATCH
END 
GO
IF OBJECT_ID('USP_UPDATE_PROVEEDOR','P')IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PROVEEDOR
GO

CREATE PROCEDURE USP_UPDATE_PROVEEDOR(
	@IdProveedor		INT,
	@IdPais				INT,
	@IsMercado			BIT,
    @NombProveedor		NVARCHAR(50), 
    @Direccion			NVARCHAR(200),-- NOT NULL,
    @Email				NVARCHAR(100),-- NULL
    @DescProveedor		NVARCHAR(200),-- NULL,
    @NombRepresentante	NVARCHAR(100) NULL, -- NOT NULL,
	@IdTipDoc			INT,
	@Documento			NVARCHAR(20),
	@Abreviatura		NVARCHAR(20)
	--@Retencion2			BIT NULL
) AS BEGIN
	UPDATE dbo.	PROVEEDOR 
	SET		IdPais = @IdPais, IsMercado = @IsMercado,NombProveedor = @NombProveedor,	Direccion=@Direccion,	Email=@Email,	DescProveedor=@DescProveedor,
			NombRepresentante	=ISNULL(@NombRepresentante, NombRepresentante), IdTipDoc= @IdTipDoc, Documento=ISNULL(@Documento,Documento),
			Abreviatura= @Abreviatura,	UpdatedAt=GETDATE() 
	WHERE IdProveedor = @IdProveedor;
END 
GO
GO
IF OBJECT_ID('USP_DISP_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PROVEEDOR
GO
CREATE PROCEDURE USP_DISP_PROVEEDOR(
	@IdProveedor	INT,
	@Habilitado		BIT
) AS BEGIN 
	UPDATE dbo.PROVEEDOR SET Habilitado = @Habilitado, UpdatedAt=GETDATE() 
	WHERE IdProveedor = @IdProveedor;
END
GO
IF OBJECT_ID('UFN_CHECK_ESTADO_EMPAQUE','FN') IS NOT NULL
	DROP FUNCTION UFN_CHECK_ESTADO_EMPAQUE
GO
CREATE FUNCTION UFN_CHECK_ESTADO_EMPAQUE(
	@IdProducto		INT,
	@Cantidad		INT
)
RETURNS INT
AS
BEGIN
	DECLARE @CANTIDAD_ESPERADA INT;
	DECLARE @RETORNO INT;
	SELECT @CANTIDAD_ESPERADA = CantidadEmpaque FROM PRODUCTO WHERE IdProducto= @IdProducto;
	IF @CANTIDAD_ESPERADA = NULL
		SET @RETORNO	= 3;
	ELSE IF @CANTIDAD_ESPERADA = @Cantidad
		SET @RETORNO	= 1;
	ELSE
		SET @RETORNO	= 2;
	RETURN @RETORNO;
END

GO
IF OBJECT_ID('dbo.VIEW_BASIC_GET_PRODUCT','V') IS NOT NULL	
	DROP VIEW dbo.VIEW_BASIC_GET_PRODUCT;
GO
CREATE VIEW dbo.VIEW_BASIC_GET_PRODUCT 
AS
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
		INNER JOIN	dbo.TIPO_INSUMO	AS TI
			ON CP.IdTipInsumo	= TI.IdTipInsumo
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor

GO

USE master;