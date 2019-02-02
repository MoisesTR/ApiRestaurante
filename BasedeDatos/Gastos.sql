USE ATOMIC_RESTAURANTE;

GO
CREATE TABLE	CONTABILIDAD_CLASE_CUENTA ( 
	IdClasCuenta		TINYINT,
	NombClasC			NVARCHAR(100)	NOT NULL,
	DescClasC			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Tipo_Cuenta		PRIMARY KEY(IdClasCuenta)
);

GO
CREATE TABLE CONTABILIDAD_GRUPO_CUENTA ( 
	IdGrupo				TINYINT			NOT NULL,
	IdClasCuenta		TINYINT			NOT NULL,
	NombGrupo			NVARCHAR(100)	NOT NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT FK_Contabilidad_Clase_Grupo_Cuenta	FOREIGN KEY(IdClasCuenta)
				REFERENCES dbo.CONTABILIDAD_CLASE_CUENTA(IdClasCuenta),
	CONSTRAINT PK_Contabilidad_Grupo_Cuenta		PRIMARY KEY(IdGrupo, IdClasCuenta)
)
GO

--La nomemclatura usada para las cuentas sera la siguiente
--El primer caracter representara la clase
--Grupo: Dos Primeros caracteres
--Cuenta: Estara conformado por los primeros 4 digitos
CREATE TABLE	CONTABILIDAD_CUENTA (
	IdCuenta			TINYINT		IDENTITY(1,1),
	IdClasCuenta		TINYINT		NOT NULL,
	IdGrupo				TINYINT		NOT NULL,
	--IdRestaurante		INT			NOT NULL,
	IdMoneda			TINYINT		NOT NULL,
	NumCuenta			NVARCHAR(4)		NOT NULL,
	NombCuenta			NVARCHAR(50)	NOT NULL,
	DescCuenta			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Cuenta		PRIMARY KEY(NumCuenta),
	CONSTRAINT	FK_Contabilidad_Cuenta_Grupo		FOREIGN KEY(IdClasCuenta, IdGrupo)
				REFERENCES	dbo.CONTABILIDAD_GRUPO_CUENTA(IdClasCuenta, IdGrupo),
	CONSTRAINT	FK_Contabilidad_Moneda_Cuenta	FOREIGN KEY(IdMoneda)
				REFERENCES	dbo.FACTURACION_MONEDA(IdMoneda),
	--CONSTRAINT	PK_Contabilidad_Cuenta_Restaurante	FOREIGN KEY(IdRestaurante)
	--			REFERENCES dbo.RESTAURANTE(IdRestaurante)
);
GO

CREATE TABLE CONTABILIDAD_SUBCUENTA (
	IdSubCuenta			INT	IDENTITY(1,1),
	NumCuenta			NVARCHAR(4),
	NumSubCuenta		NVARCHAR(6),
	NombSubCuenta		NVARCHAR(100),
	DescSubCuenta		NVARCHAR(150),
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT		FK_Cuenta_de_SubCuenta FOREIGN KEY(NumCuenta)
				REFERENCES dbo.CONTABILIDAD_CUENTA(NumCuenta),
	CONSTRAINT		PK_SubCuenta	PRIMARY KEY(NumSubCuenta)
);

GO
CREATE	 TABLE CONTABILIDAD_TIPO_MOVIMIENTO_CUENTA (
	IdTipMov			TINYINT		IDENTITY(1,1),
	NombTipMov			NVARCHAR(100)	NOT NULL	UNIQUE,
	DescTipMov			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Tipo_Movimiento_Cuenta	PRIMARY KEY(IdTipMov)
);
GO

CREATE TABLE	CONTABILIDAD_MOVIMIENTO_CUENTA	(
	IdMovimiento		INT			IDENTITY(1,1),
	IdTipMov			TINYINT		NOT NULL,
	IdCuenta			TINYINT		NOT NULL,
	IdDocumento			INT			NOT NULL,
	IdMoneda			TINYINT			NOT NULL,
	FechaMovimiento		SMALLDATETIME	NOT NULL,
	Debe				NUMERIC(17,5)	NOT NULL,
	DebeMonLocal		NUMERIC(17,5)	NOT NULL,
	Haber				NUMERIC(17,5)	NOT NULL,
	HaberMonLocal		NUMERIC(17,5)	NOT NULL,
	Saldo				NUMERIC(17,5)	NULL,
	SalgoMonLoca		NUMERIC(17,5)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Movimiento_Cuenta	PRIMARY KEY(IdMovimiento),
	CONSTRAINT	FK_Contabilidad_Movimiento_Cuenta_Tipo	FOREIGN KEY(IdTipMov)
				REFERENCES	dbo.CONTABILIDAD_TIPO_MOVIMIENTO_CUENTA(IdTipMov),
	CONSTRAINT	FK_Contabilidad_Cuenta_Movimiento		FOREIGN KEY(IdCuenta)
				REFERENCES	dbo.CONTABILIDAD_CUENTA(IdCuenta)
);
GO
CREATE TABLE	CONTABILIDAD_TIPO_DE_GASTO (
	IdTipGasto			TINYINT		IDENTITY(1,1),
	NombTipGas			NVARCHAR(100)	NOT NULL,
	DescTipGas			NVARCHAR(150)	NULL,
	Habilitado			BIT				NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_Tipo_de_Gasto		PRIMARY KEY(IdTipGasto)
);

SET IDENTITY_INSERT CONTABILIDAD_TIPO_DE_GASTO ON;

INSERT INTO CONTABILIDAD_TIPO_DE_GASTO(IdTipGasto, NombTipGas, DescTipGas)
VALUES(1,'Gastos Fijos','Son aquellos gastos que siempre van a estar mes a mes y que a largo plazo no cambiarán.'),(2,'Gastos Variables','Como lo indica su nombre, varían ya sea en semanas o meses.'),(3,'Gastos Inesperados','Se usa para definir dentro del presupuesto un gasto eventual.')

SET IDENTITY_INSERT CONTABILIDAD_TIPO_DE_GASTO OFF;
GO
CREATE TABLE	CONTABILIDAD_GASTO (
	IdGasto				INT		IDENTITY(1,1),
	IdRestaurante		TINYINT			NOT NULL,
	IdTipGasto			TINYINT			NOT NULL,
	IdUsuario			INT				NOT NULL,
	NReferencia			NVARCHAR(20)	NULL,
	Serie				NVARCHAR(10)	NULL,
	NumDoc				NVARCHAR(10)	NULL,
	Concepto			NVARCHAR(250)	NOT	NULL,
	SubTotal			NUMERIC(17,7)	NOT NULL,
	IvaTotal			NUMERIC(17,7)	NOT NULL,
	TotalNeto			NUMERIC(17,7)	NOT NULL,
	FechaGasto			SMALLDATETIME	NOT NULL,
	CreatedAt			SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME	NULL,
	CONSTRAINT			PK_Contabilidad_Gasto	PRIMARY KEY(IdGasto),
	CONSTRAINT			FK_Tipo_de_Gasto		FOREIGN KEY(IdTipGasto)
				REFERENCES	dbo.CONTABILIDAD_TIPO_DE_GASTO (IdTipGasto),
	CONSTRAINT			FK_Usuario_Gasto		FOREIGN KEY(IdUsuario)
				REFERENCES	dbo.USUARIO	(IdUsuario)
);


CREATE TABLE CONTABILIDAD_TIPO_CIERRES (
	IdTipC			TINYINT		IDENTITY(1,1),
	NombTipC		NVARCHAR(50)	NOT NULL	UNIQUE,
	Habilitado		BIT				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
	UpdatedAt		SMALLDATETIME	NULL,
	CONSTRAINT		PK_Contabilidad_Tipo_Cierre		PRIMARY KEY(IdTipC)
);


GO
CREATE TABLE CONTABILIDAD_TIPO_DOCUMENTO (
	IdTipDoc	TINYINT		IDENTITY(1,1),
	--IdTipCuenta	TINYINT			NULL,
	NombTipDoc	NVARCHAR(50)	NOT NULL,
	DescTipDoc	NVARCHAR(150)	NULL,
	Habilitado	BIT				NOT NULL DEFAULT 1,
	CreatedAt	SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt	SMALLDATETIME	NULL,
	CONSTRAINT	PK_Contabilidad_TipDoc	PRIMARY KEY(IdTipDoc),
	--CONSTRAINT	FK_Contabilidad_Tipo_Cuenta_Tipo_Documento FOREIGN KEY(IdTipCuenta)
	--			REFERENCES dbo.CONTABILIDAD_TIPO_CUENTA(IdTipCuenta),
	CONSTRAINT	U_Contabilidad_Cuenta_Nombre	UNIQUE(NombTipDoc)
);	