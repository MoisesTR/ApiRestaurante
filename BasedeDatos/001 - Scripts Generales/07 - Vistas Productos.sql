USE ATOMIC_RESTAURANTE;

GO
IF OBJECT_ID('V_SUBCLASIFICACIONES','V') IS NOT NULL
	DROP VIEW V_SUBCLASIFICACIONES
GO
CREATE VIEW V_SUBCLASIFICACIONES
AS
SELECT 
		s.IdSubClasificacion
		, s.NombSubClasificacion
		, s.DescSubClasificacion
		, s.IdClasificacion
		, c.NombClasificacion
		, s.Habilitado 
FROM	SUBCLASIFICACION_PRODUCTO s
		INNER JOIN CLASIFICACION_PRODUCTO c 
			ON s.IdClasificacion = c.IdClasificacion;
GO

IF OBJECT_ID('dbo.V_ProductosDetallados','V') IS NOT NULL
	DROP VIEW dbo.V_ProductosDetallados
GO
CREATE VIEW dbo.V_ProductosDetallados
AS
SELECT	p.IdProducto
		, p.IdProveedor
		, p.NombProducto
		, p.DescProducto
		, p.CodProd
		, p.CodOriginal
		, cl.IdCategoria
		, cp.NombCategoria
		, p.IdSubClasificacion
		, sp.NombSubClasificacion
		, cl.IdClasificacion
		, cl.NombClasificacion
		, p.IdEnvase
		, e.NombEnvase
		, p.IdEmpaque
		, em.NombEmpaque
		, p.CantidadEmpaque
		, p.Imagen
		, p.IdUnidadMedida
		, um.NombUnidad
		, p.ValorUnidadMedida
		, p.IdEstado
		, ep.NombEstado
		, im.NombTipInsumo
		, im.DescTipInsumo
		, p.Habilitado
		, P.DiasRotacion
		, P.CreatedAt
		, P.UpdatedAt
FROM	Producto p 
		INNER JOIN ESTADO_PRODUCTO ep 
			ON	p.IdEstado = ep.IdEstado
		INNER JOIN dbo.TIPO_INSUMO im
			ON	p.IdTipInsumo = im.IdTipInsumo
		LEFT JOIN SUBCLASIFICACION_PRODUCTO sp 
			ON	p.IdSubClasificacion = sp.IdSubClasificacion
		LEFT JOIN CLASIFICACION_PRODUCTO cl 
			ON	sp.IdClasificacion = cl.IdClasificacion
		LEFT JOIN CATEGORIA_PRODUCTO cp 
			ON	cl.IdCategoria = cp.IdCategoria
		LEFT JOIN ENVASE e 
			ON	p.IdEnvase = e.IdEnvase
		LEFT JOIN EMPAQUE em 
			ON	p.IdEmpaque = em.IdEmpaque
		LEFT JOIN UNIDAD_MEDIDA um 
			ON	p.IdUnidadMedida = um.IdUnidadMedida
    
	
GO
IF OBJECT_ID('V_SUBCLASIFICACIONES','V') IS NOT NULL
	DROP VIEW V_SUBCLASIFICACIONES
GO
CREATE VIEW V_SUBCLASIFICACIONES
AS
SELECT s.IdSubClasificacion,s.NombSubClasificacion,s.DescSubClasificacion,s.IdClasificacion,c.NombClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion;
GO


IF OBJECT_ID('dbo.VIEW_BASIC_GET_PRODUCT','V') IS NOT NULL	
	DROP VIEW dbo.VIEW_BASIC_GET_PRODUCT;
GO
CREATE VIEW dbo.VIEW_BASIC_GET_PRODUCT 
AS
SELECT IdProducto
		, PRO.IdProveedor
		, C.IdCategoria
		, CP.NombCategoria
		, P.IdSubClasificacion
		, SC.NombSubClasificacion
		, C.IdClasificacion
		, C.NombClasificacion
		, p.IdEstado
		, p.NombProducto
		, p.DescProducto
		, p.Imagen
		, P.DiasRotacion
		, P.IdTipInsumo
		, P.CodProd
		, P.CodOriginal
		, P.CodBarra
		, P.Habilitado
		, P.CreatedAt
		, P.UpdatedAt 
		FROM dbo.PRODUCTO P
		LEFT JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
			ON P.IdSubClasificacion = SC.IdSubClasificacion
		LEFT JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON SC.IdClasificacion = C.IdClasificacion
		LEFT JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON C.IdCategoria = CP.IdCategoria
		INNER JOIN	dbo.TIPO_INSUMO	AS TI
			ON P.IdTipInsumo	= TI.IdTipInsumo
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor

GO

--SELECT * FROM VIEW_BASIC_GET_PRODUCT