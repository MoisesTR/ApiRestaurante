USE ATOMIC_RESTAURANTE;
GO


GO
--Un documento puede afectar multiples cuentas
CREATE TABLE CONTABILIDAD_DOCUMENTO ( 
	IdDocumento		TINYINT		IDENTITY(1,1),
	IdTipDoc		TINYINT			NOT NULL,
	IdRestaurante	INT				NOT NULL,
	IdSucursal		INT				NULL,
	Serie			NVARCHAR(10)	NOT NULL,
	NumDoc			INT				NOT NULL,
	NombDoc			NVARCHAR(50)	NOT NULL,
	Valor			NUMERIC(17,7)	NOT NULL,
	Habilitado		BIT				NOT NULL DEFAULT 1,
	CreatedAt	SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
	UpdatedAt	SMALLDATETIME	NULL,
	CONSTRAINT PK_Contabilidad_Documento	PRIMARY KEY(IdDocumento),
	CONSTRAINT FK_Contabilidad_Documento_Tipo	FOREIGN KEY(IdTipDoc)	
				REFERENCES dbo.CONTABILIDAD_TIPO_DOCUMENTO(IdTipDoc),
	CONSTRAINT FK_Restaurante_Documento			FOREIGN KEY(IdRestaurante)
				REFERENCES dbo.RESTAURANTE(IdRestaurante),
	CONSTRAINT FK_Sucursal_Documento			FOREIGN KEY(IdSucursal)
				REFERENCES dbo.RESTAURANTE_SUCURSAL(IdSucursal)
);