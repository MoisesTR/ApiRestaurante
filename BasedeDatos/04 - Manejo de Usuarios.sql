
ALTER TABLE dbo.USUARIO
ADD CONSTRAINT df_Imagen_Usuario DEFAULT 'nodisponible.png' FOR Imagen
GO
--//
----//		Valores Predeterminados			
--//
SET IDENTITY_INSERT dbo.ROL_USUARIO ON
GO
	INSERT INTO dbo.ROL_USUARIO(IdRol, NombreRol,DescripcionRol,Habilitado)
	VALUES(1,'Administrador', 'Este Rol Se Utilizara unicamente para los administradores(no trabajadores) de la aplicacion.', 0)
GO
SET IDENTITY_INSERT dbo.ROL_USUARIO OFF
