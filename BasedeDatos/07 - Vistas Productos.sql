USE ATOMIC_RESTAURANTE;
GO
--IF OBJECT_ID('dbo.V_ProductosDetallados','V') IS NOT NULL
--	DROP VIEW dbo.V_ProductosDetallados
--GO
--CREATE VIEW dbo.V_ProductosDetallados
--AS
--SELECT	p.IdProducto
--		, p.IdProveedor
--		, p.NombProducto
--		, p.DescProducto
--		, cl.IdCategoria
--		, cp.NombCategoria
--		, p.IdSubClasificacion
--		, sp.NombSubClasificacion
--		, cl.IdClasificacion
--		, cl.NombClasificacion
--		, p.IdEnvase
--		, e.NombEnvase
--		, p.IdEmpaque
--		, em.NombEmpaque
--		, p.CantidadEmpaque
--		, p.Imagen
--		, p.IdUnidadMedida
--		, um.NombUnidad
--		, p.ValorUnidadMedida
--		, p.IdEstado
--		, ep.NombEstado
--		, p.Habilitado
--		, P.DiasRotacion
--		, im.IdTipInsumo 
--		, im.DescTipInsumo
--		, p.CodProd
--		, p.CodOriginal
--		, p.CodBarra
--		, P.CreatedAt
--		, P.UpdatedAt
--    FROM Producto p 
--    LEFT JOIN SUBCLASIFICACION_PRODUCTO sp 
--		ON	p.IdSubClasificacion = sp.IdSubClasificacion
--    LEFT JOIN CLASIFICACION_PRODUCTO cl 
--		ON	sp.IdClasificacion = cl.IdClasificacion
--	LEFT JOIN CATEGORIA_PRODUCTO cp 
--		ON	cl.IdCategoria = cp.IdCategoria
--    LEFT JOIN ENVASE e 
--		ON	p.IdEnvase = e.IdEnvase
--    LEFT JOIN EMPAQUE em 
--		ON	p.IdEmpaque = em.IdEmpaque
--    LEFT JOIN UNIDAD_MEDIDA um 
--		ON	p.IdUnidadMedida = um.IdUnidadMedida
--    INNER JOIN ESTADO_PRODUCTO ep 
--		ON	p.IdEstado = ep.IdEstado
--	INNER JOIN dbo.TIPO_INSUMO im
--		ON	p.IdTipInsumo = im.IdTipInsumo
		
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
SELECT	p.IdProducto,p.IdProveedor,	p.NombProducto,	p.DescProducto,p.CodProd, p.CodOriginal,	cl.IdCategoria,	cp.NombCategoria,
		p.IdSubClasificacion,	sp.NombSubClasificacion,	cl.IdClasificacion,		cl.NombClasificacion,
		p.IdEnvase,	e.NombEnvase,		p.IdEmpaque,	em.NombEmpaque,    p.CantidadEmpaque,
		p.Imagen,	p.IdUnidadMedida,	um.NombUnidad,	p.ValorUnidadMedida,	p.IdEstado,
		ep.NombEstado,	p.Habilitado,		P.DiasRotacion,	P.CreatedAt,P.UpdatedAt
    FROM Producto p 
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
    INNER JOIN ESTADO_PRODUCTO ep 
		ON	p.IdEstado = ep.IdEstado;
GO
IF OBJECT_ID('V_SUBCLASIFICACIONES','V') IS NOT NULL
	DROP VIEW V_SUBCLASIFICACIONES
GO
CREATE VIEW V_SUBCLASIFICACIONES
AS
SELECT s.IdSubClasificacion,s.NombSubClasificacion,s.DescSubClasificacion,s.IdClasificacion,c.NombClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion;
GO

--SELECT * FROM VIEW_BASIC_GET_PRODUCT