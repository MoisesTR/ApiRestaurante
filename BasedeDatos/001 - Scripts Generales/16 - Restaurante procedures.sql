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

INSERT INTO 
	RESTAURANTE( IdMoneda
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
				, [Login]
				, Workspace)
	VALUES	( @IdMoneda
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
			, @Workspace)

END