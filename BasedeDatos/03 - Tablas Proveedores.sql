USE ATOMIC_RESTAURANTE

GO
CREATE TABLE dbo.PROVEEDOR(
    IdProveedor			INT IDENTITY(1,1),
	IdPais				TINYINT				NOT NULL	DEFAULT 1, --Foraneo
	IdTipDoc			INT					NOT NULL,  -- Foraneo
    IsProvServicio		BIT					NOT NULL,
	IsMercado			BIT					NOT NULL	DEFAULT 0,
	HasSucursales		BIT					NULL,
	NombProveedor		NVARCHAR(50)		NOT NULL,
    Direccion			NVARCHAR(200)		NOT NULL,
    Email				NVARCHAR(100)		NULL,
	Imagen				NVARCHAR(50)		NOT NULL	DEFAULT 'proveedor.png',
    DescProveedor		NVARCHAR(200)		NULL,
    NombRepresentante	NVARCHAR(100)		NULL,
	Documento			NVARCHAR(50)		NULL,
	Abreviatura			NVARCHAR(20)		NULL,
    Retencion2			Bit					NULL	DEFAULT 0,
	Habilitado			Bit					NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_IdProveedor				PRIMARY KEY (IdProveedor),
	CONSTRAINT FK_PAIS_PROVEEDOR			FOREIGN KEY(IdPais) 
				REFERENCES PAIS(IdPais),
	CONSTRAINT FK_TIPO_DOCUMENTO_PROVEEDOR	FOREIGN KEY(IdTipDoc) 
				REFERENCES			TIPO_DOCUMENTO_IDENTIFICACION(IdTipDoc)
);
GO

IF OBJECT_ID('dbo.TELEFONOS_PROVEEDOR') IS NOT NULL 
	DROP TABLE dbo.TELEFONOS_PROVEEDOR

GO
CREATE TABLE dbo.TELEFONOS_PROVEEDOR (
	IdTelefono			INT IDENTITY(1,1), 
	IdProveedor			INT				NOT NULL, 
	Telefono			NVARCHAR(15)	NOT NULL, 
	NombPAsignada		NVARCHAR(20)	NOT NULL,
	Extension			NVARCHAR(10)	NOT NULL, 
	Cargo				NVARCHAR(15)	NULL, 
	IsTitular			BIT				NOT NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1, 
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(), 
	UpdatedAt			SMALLDATETIME	NULL
	CONSTRAINT PK_IdTelefono_Telefonos_Proveedor	PRIMARY KEY(IdTelefono),
	CONSTRAINT FK_Proveedor_Telefono_Proveedor		FOREIGN KEY(IdProveedor) 
				REFERENCES PROVEEDOR(IdProveedor)
)

GO

CREATE NONCLUSTERED INDEX IDX_TELEFO_PROVEEDOR_NUMERO
	ON dbo.TELEFONOS_PROVEEDOR (Telefono)
	INCLUDE (NombPAsignada)

GO
--Por default es 2 por que hasta el momento es 2 el id del tipo numero RUC
--ALTER TABLE PROVEEDOR
--	ADD CONSTRAINT DF_IdTipoNumeroRUC_Proveedor DEFAULT 2 FOR IdTipoDocumento
--GO
ALTER TABLE PROVEEDOR
	ADD CONSTRAINT U_NumeroRuc UNIQUE(Documento)
GO

CREATE TABLE dbo.TIPO_DE_DESCUENTO (
	IdTipDesc		TINYINT			NOT NULL,
	NombTipDesc		VARCHAR(50)		NOT NULL,
	DescTipDesc		VARCHAR(150)	NULL,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	CONSTRAINT		PK_Tipo_de_Descuento	PRIMARY KEY (IdTipDesc)
)

INSERT INTO TIPO_DE_DESCUENTO(IdTipDesc, NombTipDesc)
VALUES(1, 'Descuento porcentual por Item'),(2, 'Descuento monetario por Item'), (3, 'Descuento porcentual sobre la transaccion.'),  (4, 'Descuento monetario sobre la transaccion.')


USE master