/**
*	@description Procedimientos para el Manejo de Usuarios
*	@last_update	03/08/2018
*	@modifier		Genaro Tinoco
**/
USE ATOMIC_RESTAURANTE;
GO
IF OBJECT_ID('dbo.VIEW_USUARIO_INFO', 'V') IS NOT NULL
	DROP VIEW VIEW_USUARIO_INFO
GO
CREATE VIEW VIEW_USUARIO_INFO
AS
	SELECT U.IdUsuario, U.IdTrabajador, T.Nombres,U.IdRol, R.NombreRol, R.DescripcionRol , C.NombreCargo, Username, U.Imagen, Email, Password,U.Habilitado,U.CreateAt,U.UpdatedAt
	FROM USUARIO U
	LEFT  JOIN dbo.TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	LEFT JOIN dbo.CARGO C ON T.IdCargo= C.IdCargo
	INNER JOIN dbo.ROL_USUARIO R ON U.IdRol = R.IdRol
GO
IF OBJECT_ID('dbo.USP_GET_ROL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ROL
GO
CREATE PROCEDURE USP_GET_ROL(
	@IdRol INT
)
AS BEGIN
	SELECT IdRol,NombreRol,DescripcionRol,Habilitado, CreatedAt FROM ROL_USUARIO WHERE IdRol = @IdRol
END
GO
IF OBJECT_ID('dbo.USP_CREATE_ROL_USUARIO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_ROL_USUARIO
GO
CREATE PROCEDURE USP_CREATE_ROL_USUARIO(
	@NombreRol			NVARCHAR(50),
	@DescripcionRol		NVARCHAR(150)
)
AS BEGIN
	IF EXISTS( SELECT NombreRol FROM dbo.ROL_USUARIO WHERE NombreRol = @NombreRol)
		BEGIN
			DECLARE @MESSAGE NVARCHAR(100)
			SET @MESSAGE = CONCAT('Ya existe un Rol llamado "',@NombreRol,'".')
			RAISERROR(@MESSAGE,16,1)
		END
	ELSE
		BEGIN
			INSERT INTO ROL_USUARIO(NombreRol,DescripcionRol)
			VALUES(@NombreRol,@DescripcionRol)
			SELECT @@IDENTITY AS IdRol
		END
END
GO
GO
IF OBJECT_ID('dbo.USP_UPDATE_ROL','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_ROL
GO
CREATE PROCEDURE dbo.USP_UPDATE_ROL(
	@IdRol			INT,
	@NombreRol		NVARCHAR(50),
	@DescripcionRol NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.ROL_USUARIO SET NombreRol = @NombreRol, DescripcionRol=@DescripcionRol 
		WHERE IdRol = @IdRol
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_USERNAME_OR_EMAIL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_USERNAME_OR_EMAIL
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_USERNAME_OR_EMAIL(
	@Username NVARCHAR(50),
	@Email NVARCHAR(100)
)
AS BEGIN 
	SELECT IdUsuario, IdTrabajador, Nombres,IdRol, NombreRol, DescripcionRol , NombreCargo, Username, Imagen, Email, Password,Habilitado,CreateAt,UpdatedAt
	FROM VIEW_USUARIO_INFO WHERE Username=@Username or Email = @Email
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_USERNAME','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_USERNAME
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_USERNAME(
	@Username NVARCHAR(50)
)
AS BEGIN 
	SELECT IdUsuario, IdTrabajador, Nombres,IdRol, NombreRol, DescripcionRol , NombreCargo, Username, Imagen, Email, Password,Habilitado,CreateAt,UpdatedAt
	FROM VIEW_USUARIO_INFO WHERE Username=@Username
END
GO
GO
	IF OBJECT_ID('dbo.USP_CREATE_USUARIO','P') IS NOT NULL
		DROP PROCEDURE USP_CREATE_USUARIO
	GO
	CREATE PROCEDURE USP_CREATE_USUARIO(
		@IdTrabajador	INT,
		@IdRol			INT,
		@Username		NVARCHAR(50),
		@Email			NVARCHAR(100)	NULL,
		@Imagen			NVARCHAR(100)	NULL,
		@Password		NVARCHAR(100)
	)
	AS BEGIN 
		INSERT INTO USUARIO(IdRol,IdTrabajador,Username,Email,Imagen,Password)
		VALUES(@IdRol,@IdTrabajador,@Username,@Email,@Imagen,@Password)
		SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,R.NombreRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdatedAt
		FROM USUARIO U
		INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
		INNER JOIN CARGO C ON T.IdCargo= C.IdCargo
		INNER JOIN ROL_USUARIO R ON U.IdRol = R.IdRol
	END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIOS
GO
CREATE PROCEDURE USP_GET_USUARIOS(
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdUsuario, IdTrabajador, Nombres,IdRol, NombreRol, DescripcionRol , NombreCargo, Username, Imagen, Email,Habilitado,CreateAt 
		FROM dbo.VIEW_USUARIO_INFO
	ELSE
		SELECT * FROM VIEW_USUARIO_INFO	WHERE Habilitado = @Habilitado
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_ID
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_ID(
	@IdUsuario INT
)
AS BEGIN 
	SELECT IdUsuario, IdTrabajador, Nombres,IdRol, NombreRol, DescripcionRol , NombreCargo, Username, Imagen, Email, Password,Habilitado,CreateAt,UpdatedAt
	FROM VIEW_USUARIO_INFO WHERE IdUsuario=@IdUsuario
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT IdUsuario, IdTrabajador, Nombres,IdRol, NombreRol, DescripcionRol , NombreCargo, Username, Imagen, Email, Password,Habilitado,CreateAt,UpdatedAt
	FROM VIEW_USUARIO_INFO WHERE IdTrabajador = @IdTrabajador
END
GO
IF OBJECT_ID('dbo.USP_DISP_USUARIO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_USUARIO
GO
CREATE PROCEDURE USP_DISP_USUARIO(
	@IdUsuario INT,
	@Habilitado BIT
)
AS BEGIN
	UPDATE USUARIO SET Habilitado = @Habilitado WHERE IdUsuario= @IdUsuario
END
GO