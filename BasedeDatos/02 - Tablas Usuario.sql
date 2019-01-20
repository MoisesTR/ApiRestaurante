USE  ATOMIC_RESTAURANTE;

GO
--Tabla de Roles de Usuario dentro de la Aplicacion
CREATE TABLE	dbo.ROL_USUARIO			(
	IdRol			TINYINT			IDENTITY(1,1), 
	NombRol			NVARCHAR(50)		NOT NULL,
	DescRol			NVARCHAR(150)		NULL,
	Habilitado		BIT					NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME		NULL,
	CONSTRAINT PK_ROL_USUARIO	PRIMARY KEY(IdRol),
	CONSTRAINT U_NOMBRE_ROL 	UNIQUE(NombRol)
)
GO

IF OBJECT_ID('dbo.RECURSO_SISTEMA') IS NOT NULL
	DROP TABLE dbo.RECURSO_SISTEMA

CREATE TABLE dbo.RECURSO_SISTEMA(
	IdRecursoSistema	INT IDENTITY(1,1), 
	IdMenuPadre			INT NULL,
	Nombre				VARCHAR(50) NOT NULL,
	Descripcion			VARCHAR(300) NOT NULL,
	Ruta				VARCHAR(500),
	Icono				VARCHAR(100),
	Clase				VARCHAR(100),
	Orden				INT NULL,
	Habilitado			BIT NOT NULL DEFAULT 1,
	CreatedAt			DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt			DATETIME NULL,
	CONSTRAINT PK_IdRecursoSistema PRIMARY KEY(IdRecursoSistema),
	CONSTRAINT FK_RecursoPadre_RecursoHijo	FOREIGN KEY(IdMenuPadre)
			REFERENCES dbo.RECURSO_SISTEMA(IdRecursoSistema)
);
GO
--// Tabla de Informacion del Usuario
--//	Dependencias 
--// *ROL_USUARIO, *TRABAJADOR
CREATE TABLE	dbo.USUARIO	(
	IdUsuario		INT			IDENTITY(1,1),
	IdRol			TINYINT			NOT NULL,
	IdTrabajador	INT				NULL,
	Username		NVARCHAR(50)	NOT NULL,
	Email			NVARCHAR(100)	NULL,
	Imagen			NVARCHAR(100)	NOT NULL,--DEFAULT 'nodisponible.png',
	Password		NVARCHAR(100)	NOT NULL,
	Habilitado		BIT				NOT NULL DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT pk_Usuario_Sistema		PRIMARY KEY(IdUsuario),
	CONSTRAINT FK_Rol_del_Usuario		FOREIGN KEY(IdRol) 
				REFERENCES dbo.ROL_USUARIO(IdRol),
	CONSTRAINT FK_USUARIO_TRABAJADOR	FOREIGN KEY(IdTrabajador) 
				REFERENCES TRABAJADOR(IdTrabajador)
);
GO

CREATE TABLE dbo.ROL_RECURSO_SISTEMA(
	IdRolRecursoSistema INT IDENTITY(1,1),
	IdRol				TINYINT  NOT NULL,
	IdRecursoSistema	INT NOT NULL,
	Habilitado			BIT NOT NULL DEFAULT 1,
	CreatedAt			DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt			DATETIME NULL,
	CONSTRAINT PK_IdRolRecursoSistema PRIMARY KEY(IdRolRecursoSistema),
	CONSTRAINT FK_ROL_USUARIO		FOREIGN KEY (IdRol) 
				REFERENCES ROL_USUARIO(IdRol),
	CONSTRAINT FK_RECURSO_SISTEMA	FOREIGN KEY (IdRecursoSistema) 
				REFERENCES RECURSO_SISTEMA(IdRecursoSistema)
)
GO


ALTER TABLE dbo.USUARIO
ADD CONSTRAINT df_Imagen_Usuario DEFAULT 'nodisponible.png' FOR Imagen
GO
--//
----//		Valores Predeterminados			
--//
SET IDENTITY_INSERT dbo.ROL_USUARIO ON
GO
	INSERT INTO dbo.ROL_USUARIO(IdRol, NombRol,DescRol,Habilitado)
	VALUES(1,'Administrador', 'Este Rol Se Utilizara unicamente para los administradores(no trabajadores) de la aplicacion.', 0)
GO
SET IDENTITY_INSERT dbo.ROL_USUARIO OFF

	GO
	IF OBJECT_ID('USP_GET_MENUES') IS NOT NULL
		DROP PROCEDURE USP_GET_MENUES
	GO
	CREATE PROCEDURE USP_GET_MENUES(
		@IdRol INT 
	)
	AS
	BEGIN
	SELECT ROL.IdRol
			, RE.Nombre
			, RE.Descripcion
			, RE.Habilitado
			, RE.Ruta
			, RE.Icono
			, Re.Clase
			, RE.Orden
		,Submenues = (
			SELECT	ROL.IdRol
			, RES.Nombre
			, RES.Descripcion
			, RES.Habilitado
			, RES.IdMenuPadre
			, RES.Ruta
			, RES.Icono
			, RES.Orden
			FROM	dbo.ROL_USUARIO ROLS
					INNER JOIN dbo.ROL_RECURSO_SISTEMA RSS
						ON ROLS.IdRol = RSS.IdRol
					INNER JOIN dbo.RECURSO_SISTEMA RES
						ON RES.IdRecursoSistema = RSS.IdRecursoSistema
			WHERE	 ROLS.IdRol = ROL.IdRol
					 AND RES.IdMenuPadre = RE.IdRecursoSistema
			ORDER BY RES.Orden ASC
			FOR JSON PATH
		)
	FROM	dbo.ROL_USUARIO ROL
			INNER JOIN dbo.ROL_RECURSO_SISTEMA RS
				ON ROL.IdRol = RS.IdRol
			INNER JOIN dbo.RECURSO_SISTEMA RE
				ON RE.IdRecursoSistema = RS.IdRecursoSistema
	WHERE	 ROL.IdRol = @IdRol
			AND RE.IdMenuPadre IS NULL
	ORDER BY RE.Orden ASC
	FOR JSON PATH , ROOT('Menues')
	END

	GO

	USE master;