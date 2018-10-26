USE ATOMIC_RESTAURANTE

GO

IF OBJECT_ID('dbo.USP_CREATE_TELEFONO_PROVEEDOR') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_TELEFONO_PROVEEDOR
GO
CREATE PROCEDURE dbo.USP_CREATE_TELEFONO_PROVEEDOR (
	@IdProveedor	INT, 
	@Nombre			NVARCHAR(50), 
	@Cargo			NVARCHAR(50), 
	@Telefono		NVARCHAR(15),
	@Titular		BIT
)
AS	
BEGIN

	IF EXISTS (SELECT TOP 1 1 FROM dbo.TELEFONOS_PROVEEDOR WHERE	IdProveedor = @IdProveedor AND Telefono = @Telefono)
	BEGIN
		RAISERROR('Este telefono ya se encuentra registrado!', 16, 1)
		RETURN
	END
	ELSE
	BEGIN 
		INSERT INTO dbo.TELEFONOS_PROVEEDOR(IdProveedor, Nombre, Cargo, Telefono,Titular) 
		VALUES(@IdProveedor, @Nombre, @Cargo, @Telefono, @Titular)
		SELECT @@IDENTITY AS IdTelefono
	END
END

GO

IF OBJECT_ID('dbo.USP_DISP_TELEFONO_PROVEEDOR') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_TELEFONO_PROVEEDOR
GO

CREATE PROCEDURE dbo.USP_DISP_TELEFONO_PROVEEDOR(
	@IdTelefono INT 
	, @Habilitado BIT
)
AS
BEGIN
	
	UPDATE	T
	SET		T.Habilitado = 0
			, T.UpdatedAt = GETDATE() 
	FROM	dbo.TELEFONOS_PROVEEDOR T
	WHERE	T.IdTelefono = @IdTelefono 

END
