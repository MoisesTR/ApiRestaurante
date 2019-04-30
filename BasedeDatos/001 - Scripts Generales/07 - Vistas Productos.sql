USE ATOMIC_RESTAURANTE;

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
		, NombCategoria = ISNULL(cp.NombCategoria, 'No Tiene')
		, cl.IdClasificacion
		, NombClasificacion = ISNULL(cl.NombClasificacion, 'No Tiene')
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
		INNER JOIN CATEGORIA_PRODUCTO cp 
			ON	P.IdCategoria = cp.IdCategoria
		INNER JOIN dbo.TIPO_INSUMO im
			ON	p.IdTipInsumo = im.IdTipInsumo
		INNER JOIN ESTADO_PRODUCTO ep 
			ON	p.IdEstado = ep.IdEstado
		LEFT JOIN CLASIFICACION_PRODUCTO cl 
			ON	P.IdClasificacion = cl.IdClasificacion
		LEFT JOIN ENVASE e 
			ON	p.IdEnvase = e.IdEnvase
		LEFT JOIN EMPAQUE em 
			ON	p.IdEmpaque = em.IdEmpaque
		LEFT JOIN UNIDAD_MEDIDA um 
			ON	p.IdUnidadMedida = um.IdUnidadMedida
    
	
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
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON P.IdCategoria = CP.IdCategoria
		LEFT JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON P.IdClasificacion = C.IdClasificacion
		INNER JOIN	dbo.TIPO_INSUMO	AS TI
			ON P.IdTipInsumo = TI.IdTipInsumo

GO

--SELECT * FROM VIEW_BASIC_GET_PRODUCT