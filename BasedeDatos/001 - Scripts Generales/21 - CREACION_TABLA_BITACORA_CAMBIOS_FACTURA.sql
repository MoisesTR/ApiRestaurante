USE ATOMIC_RESTAURANTE

GO

IF OBJECT_ID('dbo.BITACORA_CAMBIOS_FACTURA') IS NOT NULL
	DROP TABLE dbo.BITACORA_CAMBIOS_FACTURA

GO
CREATE TABLE dbo.BITACORA_CAMBIOS_FACTURA(
	IdConsecutivo	INT IDENTITY(1,1), 
	IdFactura		INT				NOT NULL, 
	IdUsuario		INT				NOT NULL, 
	DescCambio		VARCHAR(300)	NOT NULL, 
	CreatedAt		SMALLDATETIME		NOT NULL
	CONSTRAINT PK_ConsecutivoBitacora	PRIMARY KEY (IdConsecutivo), 
	CONSTRAINT FK_IdFacturaBitacora		FOREIGN KEY (IdFactura) 
				REFERENCES	FACTURA_COMPRA(IdFactura), 
	CONSTRAINT FK_IdUsuarioBitacora		FOREIGN KEY (IdUsuario) 
				REFERENCES	USUARIO(IdUsuario)
)
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
		, BF.DescCambio
		, NombreUsuario = USU.Username
		, Hora = CONVERT(VARCHAR(10),BF.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), BF.CreatedAt, 9), 2) 
FROM	dbo.BITACORA_CAMBIOS_FACTURA BF
		INNER JOIN dbo.FACTURA_COMPRA FACT
			ON BF.IdFactura = FACT.IdFactura
		INNER JOIN dbo.USUARIO USU
			ON BF.IdUsuario = USU.IdUsuario
WHERE	BF.IdFactura = @IdFactura
ORDER BY BF.CreatedAt DESC

END

GO
USE master;