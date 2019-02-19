USE ATOMIC_RESTAURANTE
GO

CREATE	TABLE	dbo.TIPO_SOLICITUD_UBICACION	(
	IdTipSolUbic			INT					NOT NULL,
	NombTipSol				NVARCHAR(50)		NOT NULL,
	DescTipSol				NVARCHAR(150)		NULL,
	Habilitado				BIT					NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME		NOT NULL		DEFAULT GETDATE(),
	UpdatedAt				SMALLDATETIME		NULL,
	CONSTRAINT		PK_Id_Tipo_Solicitud_Ubicacion	PRIMARY KEY (IdTipSolUbic)
);

INSERT INTO		dbo.TIPO_SOLICITUD_UBICACION (IdTipSolUbic, NombTipSol)
				VALUES(1, 'Creacion Ubicacion'), (2, 'Añadir Nivel a Ubicacion'), (3,'Añadir Casilla a Nivel de Ubicacion'), (4, 'Inhabilitar Ubicacion'), 
				(5, 'Inhabilitar Nivel'), (6, 'Inhabilitar Casilla'), ( 7,'Habilitar Ubicacion'), ( 8,'Habiliar Nivel Ubicacion'), (9,'Habilitar Casilla'),
				(10, 'Renombrar Ubicacion')
GO
CREATE	TABLE	dbo.SOLICITUD_UBICACION_INSUMO (
	NumSolicitud			INT			NOT NULL,
	IdSucursal				INT			NOT NULL,
	IdTrabajador			INT			NOT NULL,
	IdTipSolUbic			TINYINT		NOT NULL,
	IdEstadoSolic			TINYINT		NOT NULL,
	IdUbicacion				INT			NULL,
	Habilitado				BIT			NOT NULL DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NOT NULL,
)

GO
CREATE TABLE	dbo.TIPO_UBICACION_INSUMO	(
	IdTipUbic		INT		IDENTITY(1,1),
	NombTipUbic		NVARCHAR(50)	NOT NULL,
	DescTipUbic		NVARCHAR(150)	NULL,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT	PK_Tipo_Ubicacion_Insumo	PRIMARY KEY(IdTipUbic)
);
GO

CREATE TABLE	dbo.UBICACION_INSUMO	(
	IdUbicacion		INT			IDENTITY(1,1),
	IdSucursal		INT				NOT NULL,
	IdBodega		INT				NOT NULL,
	EsRefrigerada	BIT				NOT NULL	DEFAULT 0,
	CodBarUbic		VARCHAR(25)		NOT NULL	UNIQUE,
	NumUbic			TINYINT			NOT NULL,
	NombUbic		NVARCHAR(50)	NOT NULL,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT	PK_Ubicacion_Insumo		PRIMARY KEY(IdUbicacion)
)

GO
CREATE TABLE	dbo.NIVEL_UBICACION_INSUMO	(
	IdNivelUbic		INT		IDENTITY(1,1),
	IdUbicacion		INT				NOT NULL,
	NumNivelUbic	TINYINT			NOT NULL,
	Habilitado		BIT				NOT NULL	DEFAULT	1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT	PK_Nivel_Ubicacion_Insumo	PRIMARY KEY(IdNivelUbic)
);
GO
CREATE TABLE dbo.CASILLA_UBICACION_INSUMO (
	IdCasillaUbic	INT		IDENTITY(1,1),
	IdNivelUbic		INT				NOT NULL,
	CodBarCasUbic	VARCHAR(25)		NOT NULL,
	NumCasillaUbic	TINYINT			NOT NULL,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT	PK_Casilla_Ubicacion_Insumo		PRIMARY KEY(IdCasillaUbic),	
	CONSTRAINT	FK_Nivel_de_Casilla_Ubic_Insumo	FOREIGN KEY(IdNivelUbic)
				REFERENCES	dbo.NIVEL_UBICACION_INSUMO(IdNivelUbic),
	CONSTRAINT	U_Codigo_de_Barra_Casilla		UNIQUE(CodBarCasUbic)
);
GO

CREATE	TABLE	dbo.TIPO_MOVIMIENTO_UBICACION_INSUMO (
	IdTipMov			TINYINT			NOT NULL,
	NombTipMov			VARCHAR(50)		NOT NULL,
	DescTipMov			VARCHAR(50)		NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Tipo_Mov_Log_Ubicaciones_Insumo	PRIMARY KEY(IdTipMov)
);

GO	
CREATE	NONCLUSTERED	INDEX	IDX_Casilla_Codigo_de_Barra_Casilla
ON dbo.CASILLA_UBICACION_INSUMO(IdCasillaUbic, CodBarCasUbic)
GO

CREATE	TABLE	dbo.LOG_CASILLAS_UBICACION_INSUMO (
	IdLogCasUbic		INT		IDENTITY(1,1),
	IdUbicacion			INT				NULL,
	IdNivelUbic			INT				NULL,
	IdCasillaUbic		INT				NULL,
	IdTipMov			TINYINT			NOT NULL,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	CONSTRAINT	FK_Ubicacion_Insumo_Log		FOREIGN KEY (IdUbicacion)
			REFERENCES	dbo.UBICACION_INSUMO				( IdUbicacion ),
	CONSTRAINT	FK_Nivel_Insumo_Log			FOREIGN KEY ( IdNivelUbic)
			REFERENCES	dbo.NIVEL_UBICACION_INSUMO				( IdNivelUbic ),
	CONSTRAINT	FK_Casilla_Ubic_Insumo_Log	FOREIGN	KEY ( IdCasillaUbic)
			REFERENCES	dbo.CASILLA_UBICACION_INSUMO			( IdCasillaUbic ),
	CONSTRAINT	FK_Tipo_Mov_Log_Ubic_Insumo	FOREIGN KEY	( IdTipMov )
			REFERENCES	dbo.TIPO_MOVIMIENTO_UBICACION_INSUMO	( IdTipMov),
	CONSTRAINT	PK_Log_Casillas_Ubicacion_Insumo	PRIMARY KEY ( IdLogCasUbic)
)	


USE master;