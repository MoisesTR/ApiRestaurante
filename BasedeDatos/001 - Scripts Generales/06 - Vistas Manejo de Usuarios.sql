USE ATOMIC_RESTAURANTE
GO
IF OBJECT_ID('dbo.VIEW_USUARIO_INFO', 'V') IS NOT NULL
	DROP VIEW VIEW_USUARIO_INFO
GO
CREATE VIEW VIEW_USUARIO_INFO
AS
	SELECT U.IdUsuario, U.IdTrabajador, T.Nombres,U.IdRol, R.NombRol, R.DescRol , C.NombCargo, Username, U.Imagen, Email, Password,U.Habilitado,U.CreatedAt,U.UpdatedAt
	FROM dbo.USUARIO U
	LEFT	JOIN dbo.TRABAJADOR T				ON U.IdTrabajador	= T.IdTrabajador
	LEFT	JOIN dbo.CARGO_TRABAJADOR C			ON T.IdCargo		= C.IdCargo
	INNER	JOIN dbo.ROL_USUARIO R				ON U.IdRol			= R.IdRol
GO