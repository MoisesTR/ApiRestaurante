IF OBJECT_ID('dbo.USP_GET_FACTURAS_COMPRA',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_FACTURAS_COMPRA
GO
CREATE PROCEDURE dbo.USP_GET_FACTURAS_COMPRA (
	@IdFechaFiltro		INT --1 Fecha Recepcion, 2-Fecha Ingreso--
	, @FechaInicio		SMALLDATETIME
	, @FechaFin			SMALLDATETIME
	, @CodFactura		NVARCHAR(100)
	, @IdProveedor		INT NULL
	, @IdEstadoFactura	INT NULL
)
AS BEGIN
	
	IF (@CodFactura <> 'null')
	BEGIN
		SELECT
			IdPaginacion = ROW_NUMBER() OVER(ORDER BY(SELECT NULL)) 
			, IdFactura
			, NumRefFactura
			, FC.IdProveedor
			, FC.IdTipoMoneda
			, FC.IdFormaPago
			, PRO.NombProveedor
			, TRA.IdTrabajador
			, TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso]
			, FC.IdEstadoFactura
			, NombVendedor
			, FechaFactura = CONVERT(VARCHAR(10),FC.FechaFactura,126)
			, FechaRecepcion = CONVERT(VARCHAR(10),FC.FechaRecepcion,126)
			, FC.SubTotal
			, FC.TotalIva
			, FC.CambioActual
			, FC.TotalDescuento
			, FC.TotalCordobas
			, FC.TotalOrigenFactura
			, FC.Habilitado
			, FechaIngreso = FC.CreatedAt 
			, HoraIngreso = CONVERT(VARCHAR(10),FC.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), FC.CreatedAt , 9), 2) 
		FROM	dbo.FACTURA_COMPRA FC
			INNER JOIN dbo.ESTADO_FACTURA EF
				ON FC.IdEstadoFactura = EF.IdEstadoFactura
			INNER JOIN dbo.PROVEEDOR PRO
				ON FC.IdProveedor = PRO.IdProveedor
			INNER JOIN dbo.TRABAJADOR TRA
				ON FC.IdTrabajador = TRA.IdTrabajador
		WHERE	FC.IdProveedor = 1
				AND FC.NumRefFactura = @CodFactura
				AND FC.IdEstadoFactura = ISNULL(@IdEstadoFactura,FC.IdEstadoFactura)
	END
	ELSE 
	BEGIN 
		SELECT 
				IdPaginacion = ROW_NUMBER() OVER(ORDER BY(SELECT NULL)) 
				, IdFactura
				, NumRefFactura
				, FC.IdProveedor
				, FC.IdTipoMoneda
				, FC.IdFormaPago
				, PRO.NombProveedor	
				, TRA.IdTrabajador
				, TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso]
				, FC.IdEstadoFactura
				, NombVendedor
				, FechaFactura = CONVERT(VARCHAR(10),FC.FechaFactura,126)
				, FechaRecepcion = CONVERT(VARCHAR(10),FC.FechaRecepcion,126)
				, FC.SubTotal
				, FC.TotalIva
				, FC.CambioActual
				, FC.TotalDescuento
				, FC.TotalCordobas
				, FC.TotalOrigenFactura
				, FC.Habilitado
				, FechaIngreso = FC.CreatedAt 
				, HoraIngreso = CONVERT(VARCHAR(10),FC.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), FC.CreatedAt , 9), 2) 
		FROM	dbo.FACTURA_COMPRA FC
				INNER JOIN dbo.ESTADO_FACTURA EF
					ON FC.IdEstadoFactura = EF.IdEstadoFactura
				INNER JOIN dbo.PROVEEDOR PRO
					ON FC.IdProveedor = PRO.IdProveedor
				INNER JOIN dbo.TRABAJADOR TRA
					ON FC.IdTrabajador = TRA.IdTrabajador
		WHERE	(@IdFechaFiltro IS NULL 
				AND FC.IdProveedor = @IdProveedor)
				AND FC.IdEstadoFactura = ISNULL(@IdEstadoFactura,FC.IdEstadoFactura)
				OR 
				(@IdFechaFiltro IS NOT NULL 
				AND FC.IdProveedor = @IdProveedor)
				AND FC.IdEstadoFactura = ISNULL(@IdEstadoFactura,FC.IdEstadoFactura)
				AND (( @IdFechaFiltro = 1 AND FC.FechaRecepcion BETWEEN ISNULL(@FechaInicio,FC.FechaRecepcion) AND ISNULL(@FechaFin,FC.FechaRecepcion))
					OR @IdFechaFiltro = 2 AND CONVERT(VARCHAR(8),FC.CreatedAt,112) BETWEEN ISNULL(@FechaInicio,FC.FechaRecepcion) AND ISNULL(@FechaFin,FC.FechaRecepcion))
		ORDER BY CASE WHEN @IdFechaFiltro IS NULL THEN FC.FechaRecepcion 
						WHEN @IdFechaFiltro = 1 THEN FC.FechaRecepcion 
						WHEN @IdFechaFiltro = 2 THEN FC.FechaFactura
						END ASC
	END
END


GO


IF OBJECT_ID('dbo.USP_GET_FACTURA_BY_ID') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_FACTURA_BY_ID
GO
CREATE PROCEDURE [dbo].[USP_GET_FACTURA_BY_ID](@IdFactura INT )
AS
BEGIN
SELECT FACT.IdFactura
		, FACT.Serie
		, FACT.NumRefFactura
		, FACT.IdProveedor
		, FACT.IdTrabajador
		, IdEstadoFactura
		, TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso]
		, HoraIngreso = CONVERT(VARCHAR(10),FACT.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), FACT.CreatedAt, 9), 2) 
		, PRO.NombProveedor
		, FACT.NombVendedor
		, FACT.FechaFactura
		, FechaRecepcion = CONVERT(VARCHAR(10),FACT.FechaRecepcion,126)
		, FechaIngresoFormato = CONVERT(VARCHAR(8),FACT.FechaFactura,103)
		, FACT.SubTotal
		, FACT.TotalIva
		, FACT.CambioActual
		, FACT.TotalDescuento
		, FACT.TotalCordobas
		, FACT.Habilitado
		, FACT.CreatedAt
		, FACT.UpdatedAt	
		, Fact.TotalOrigenFactura
    , Detalle = (
        SELECT	DETA.IdDetalle
				, DETA.IdFactura
				, PRO.IdProducto
				, PRO.NombProducto
				, UM.NombUnidad
				, DETA.PrecioUnitario
				, DETA.Cantidad
				, DETA.GravadoIva
				, DETA.SubTotal
				, DETA.SubTotal_Cal
				, DETA.Iva
				, DETA.Iva_Cal
				, DETA.Descuento
				, DETA.TotalDetalle
				, DETA.Total_Cal
				, DETA.Bonificacion
				, DETA.Habilitado
				, DETA.CreatedAt
				, DETA.UpdatedAt
		FROM	dbo.DETALLE_FACTURA_COMPRA DETA
				INNER JOIN dbo.PRODUCTO PRO
					ON DETA.IdProducto = PRO.IdProducto
				LEFT JOIN dbo.UNIDAD_MEDIDA UM
					ON PRO.IdUnidadMedida = UM.IdUnidadMedida
		WHERE	 DETA.IdFactura = FACT.IdFactura
        FOR JSON PATH
    )
FROM	dbo.FACTURA_COMPRA FACT
	INNER JOIN dbo.TRABAJADOR TRA
		ON FACT.IdTrabajador = TRA.IdTrabajador
	INNER JOIN dbo.PROVEEDOR PRO
		ON FACT.IdProveedor = PRO.IdProveedor
WHERE	FACT.IdFactura = @IdFactura
FOR JSON PATH , ROOT('Factura')
END

GO


IF OBJECT_ID('USP_GET_CAMBIOS_FACTURA_BY_ID') IS NOT NULL
	DROP PROCEDURE USP_GET_CAMBIOS_FACTURA_BY_ID
GO
CREATE PROCEDURE USP_GET_CAMBIOS_FACTURA_BY_ID(
@IdFactura INT 
)
AS
BEGIN	
 
SELECT BF.IdFactura		
		, BF.IdUsuario
		, CreatedAt = CONVERT(VARCHAR(10),BF.CreatedAt,101)
		, BF.Descripcion
		, NombreUsuario = USU.Username
		, Hora = LTRIM(RIGHT(CONVERT(VARCHAR(20), FACT.CreatedAt, 100), 7))
FROM	dbo.BITACORA_CAMBIOS_FACTURA BF
		INNER JOIN dbo.FACTURA_COMPRA FACT
			ON BF.IdFactura = FACT.IdFactura
		INNER JOIN dbo.USUARIO USU
			ON BF.IdUsuario = USU.IdUsuario
WHERE	BF.IdFactura = @IdFactura
ORDER BY BF.CreatedAt DESC

END

GO

GO
IF OBJECT_ID('USP_GET_FACTURAS_ACTUALES_REGISTRADAS') IS NOT NULL
	DROP PROCEDURE USP_GET_FACTURAS_ACTUALES_REGISTRADAS
GO
CREATE PROCEDURE USP_GET_FACTURAS_ACTUALES_REGISTRADAS
AS
BEGIN

	SELECT  FACT.IdFactura
			, FACT.Serie
			, FACT.NumRefFactura
			, FACT.IdProveedor
			, FACT.IdTrabajador
			, IdEstadoFactura	
			, HoraIngreso = LTRIM(RIGHT(CONVERT(VARCHAR(20), FACT.CreatedAt, 100), 7))
			, FACT.NombVendedor
			, FACT.FechaFactura
			, FechaRecepcion = CONVERT(VARCHAR(10),FACT.FechaRecepcion,126)
			, FechaIngresoFormato = CONVERT(VARCHAR(8),FACT.FechaFactura,103)
			, FACT.SubTotal
			, FACT.TotalIva
			, FACT.CambioActual
			, FACT.TotalDescuento
			, FACT.TotalCordobas
			, FACT.Habilitado
			, FACT.CreatedAt
			, FACT.UpdatedAt	
			, Fact.TotalOrigenFactura
	FROM	dbo.FACTURA_COMPRA FACT
	WHERE	CONVERT(VARCHAR(8),CreatedAt,112) = CONVERT(VARCHAR(8),GETDATE(),112)
END
