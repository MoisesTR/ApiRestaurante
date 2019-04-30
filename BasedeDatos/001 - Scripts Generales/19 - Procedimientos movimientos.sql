
IF OBJECT_ID('USP_CREATE_CONTABILIDAD_TIPO_DOCUMENTO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CONTABILIDAD_TIPO_DOCUMENTO
GO
CREATE PROCEDURE  USP_CREATE_CONTABILIDAD_TIPO_DOCUMENTO(
	@NombTipDoc		NVARCHAR(50),
	@DescTipDoc		NVARCHAR(150),
	@IdTipDoc		INT OUT
)
AS BEGIN
	INSERT INTO dbo.CONTABILIDAD_TIPO_DOCUMENTO (NombTipDoc, DescTipDoc)
	VALUES(@NombTipDoc, @DescTipDoc)
	SET @IdTipDoc = @@IDENTITY
END
GO


IF OBJECT_ID('USP_UPDATE_CONTABILIDAD_TIPO_DOCUMENTO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CONTABILIDAD_TIPO_DOCUMENTO
GO
CREATE PROCEDURE USP_UPDATE_CONTABILIDAD_TIPO_DOCUMENTO (
	@IdTipDoc		INT,
	@NombTipDoc		NVARCHAR(50),
	@DescTipDoc		NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.CONTABILIDAD_TIPO_DOCUMENTO SET NombTipDoc = @NombTipDoc, DescTipDoc = @DescTipDoc
	WHERE IdTipDoc = @IdTipDoc
END
GO

USE ATOMIC_RESTAURANTE
GO
--REVISAR PROCEDIMIENTO PARAMETRO
IF OBJECT_ID('USP_CREATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA
GO
CREATE PROCEDURE USP_CREATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA (
	@NumSubCuenta			TINYINT		,
	@IdDocumento			INT			,
	@IdMoneda			TINYINT		,
	@FechaMovimiento		SMALLDATETIME,
	@Debe				NUMERIC(17,5),
	@DebeMonLocal		NUMERIC(17,5),
	@Haber				NUMERIC(17,5),
	@HaberMonLocal		NUMERIC(17,5),
    @IdMovimiento		INT		OUT
)
AS BEGIN
 --   INSERT INTO dbo.CONTABILIDAD_MOVIMIENTO_SUBCUENTA(IdSubCuenta,IdDocumento, IdMoneda, FechaMovimiento, Debe, DebeMonLocal, Haber, HaberMonLocal)
	--VALUES(@IdSubCuenta, @IdDocumento, @IdMoneda,@FechaMovimiento,@Debe, @DebeMonLocal, @Haber, @HaberMonLocal)
	INSERT INTO dbo.CONTABILIDAD_MOVIMIENTO_SUBCUENTA(NumSubCuenta,IdDocumento, IdMoneda, FechaMovimiento, Debe, DebeMonLocal, Haber, HaberMonLocal)
	VALUES(@NumSubCuenta, @IdDocumento, @IdMoneda,@FechaMovimiento,@Debe, @DebeMonLocal, @Haber, @HaberMonLocal)
	SET @IdDocumento = @@IDENTITY
END

GO
IF OBJECT_ID('USP_UPDATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA
GO
CREATE PROCEDURE USP_UPDATE_CONTABILIDAD_MOVIMIENTO_SUBCUENTA (
    @IdMovimiento		INT,
	@FechaMovimiento		SMALLDATETIME,
	@Debe				NUMERIC(17,5),
	@DebeMonLocal		NUMERIC(17,5),
	@Haber				NUMERIC(17,5),
	@HaberMonLocal		NUMERIC(17,5)
)
AS BEGIN
	
	UPDATE dbo.CONTABILIDAD_MOVIMIENTO_SUBCUENTA SET FechaMovimiento = @FechaMovimiento,  Debe = @Debe, DebeMonLocal= @DebeMonLocal, Haber = @Haber,
	HaberMonLocal = @HaberMonLocal WHERE IdMovimiento = @IdMovimiento         
END