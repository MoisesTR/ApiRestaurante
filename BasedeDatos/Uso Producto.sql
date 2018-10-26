USE ATOMIC_RESTAURANTE
GO

CREATE TABLE USO_PRODUCTO(
	IdUso		INT IDENTITY(1,1),
    Nombre		NVARCHAR(50)		NOT NULL,
    Descripcion NVARCHAR(150)		NULL,
    Habilitado	BIT DEFAULT 1		NOT NULL,
    CreatedAt	SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdatedAt	SMALLDATETIME		NULL,
    constraint pk_USO_PRODUCTO primary key(IdUso),
    CONSTRAINT U_USO_PRODUCTO UNIQUE(Nombre)
);

INSERT INTO USO_PRODUCTO(Nombre,Descripcion)
VALUES	('Nuevo/Sin Usar','Producto que no se ha usado.')
		,('En Uso','Producto que se esta usando.')
        ,('Usado/Agotado','Producto que se uso hasta agotarse.');
GO

USE master;