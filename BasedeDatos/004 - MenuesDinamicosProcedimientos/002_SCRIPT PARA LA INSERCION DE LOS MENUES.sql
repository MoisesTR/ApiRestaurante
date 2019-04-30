use ATOMIC_RESTAURANTE;
--Opciones Generales del menu(Menues Padres)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Inicio','Pantalla inicial del sistema','/','./assets/img/icon/home.png','no-collase',1)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Insumos','Insumos (Inventario)','#','./assets/img/icon/product.png','',2)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Factura','Facturas de sistema sistema','#','./assets/img/icon/facturas.png','',3)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Reportes','Modulo de reportes','/reportes','/assets/img/icon/reportes.png','no-collase',4)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Catalogos','Catalogos de sistema','#','./assets/img/icon/catalogo.png','',5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Sucursales','Sucursales del restaurante ','/sucursales','./assets/img/icon/sucursales.png','no-collase',6)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Trabajadores','Trabajadores asociados al restaurante','/trabajador','./assets/img/icon/trabajadores.png','no-collase',7)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Cargos','Cargos que ocupan los trabajadores en el restaurante ','/cargo','./assets/img/icon/roles.png','no-collase',8)
--INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Salidas','Salidas del inventario de bodega','/salida-producto','./assets/img/icon/ventas.png','no-collase',10)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Configuraciones','Configuraciones generales del sistema','#','./assets/img/icon/configuraciones.png','',12)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Proveedor','Modulo de Proveedor','#','./assets/img/icon/proveedores.png','',9)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Gastos','Gastos','#','./assets/img/icon/gastos.png','',10)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Usuarios','Usuarios','/usuarios','./assets/img/icon/usuarios.png','no-collase',11)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Testing UI','Testing','/testing','./assets/img/icon/usuarios.png','no-collase',12)

--Opciones especificas del menu(Submenues)

--SELECT	IdRecursoSistema, *
--FROM	RECURSO_SISTEMA

--MENU FACTURA
--SUBMENUES

DECLARE @ID_RC_FACTURA INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Factura' AND IdMenuPadre IS NULL)
DECLARE @ID_RC_PROVEEDOR INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Proveedor' AND IdMenuPadre IS NULL)
DECLARE @ID_RC_INSUMOS INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Insumos' AND IdMenuPadre IS NULL)
DECLARE @ID_RC_GASTOS INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Gastos' AND IdMenuPadre IS NULL)
DECLARE @ID_RC_CATALOGOS INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Catalogos' AND IdMenuPadre IS NULL)
DECLARE @ID_RC_CONFIGURACIONES INT = (SELECT TOP 1 IdRecursoSistema FROM dbo.RECURSO_SISTEMA WHERE Nombre = 'Configuraciones' AND IdMenuPadre IS NULL)

-- MENU FACTURAS
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Agregar factura','Modulo Factura','/factura/add','ninguno',1,@ID_RC_FACTURA)

INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Total','Modulo Factura','/factura/summaryFactura','ninguno',4,@ID_RC_FACTURA)

-- MENU PROVEEDORES
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Proveedor','Modulo Proveedor','/proveedor','ninguno',2,@ID_RC_PROVEEDOR)

-- MENU INSUMOS
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Alimenticios','Catalogos de sistema','/producto','ninguno',1,@ID_RC_INSUMOS)

INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Utensilios/Limpieza','Catalogos de sistema','/consumo-interno','ninguno',2,@ID_RC_INSUMOS)

--MENU GASTOS
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Gastos','Modulo Gastos','/gasto/gastos','ninguno',1,@ID_RC_GASTOS)

INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Total','Modulo Gastos','/gastos/summary-gastos','ninguno',2,@ID_RC_GASTOS)

--MENU CATALOGOS
--SUBMENUES
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES 
('Categoria','Categorias de los productos','/categorias','ninguno',1,@ID_RC_CATALOGOS)
, ('Clasificacion','Clasificaciones de los productos','/clasificacion-productos','ninguno',2,@ID_RC_CATALOGOS) 
, ('Subclasificación','Subclasificaciones de los productos','/subclasificacion-productos','ninguno',3,@ID_RC_CATALOGOS)
, ('Empaques','Empaques de los productos','/empaques','ninguno',4,@ID_RC_CATALOGOS)
, ('Envases','Envases de los productos','/envases','ninguno',5,@ID_RC_CATALOGOS)
, ('Unidades Medida','Unidades de medida de los productos','/unidadmedida','ninguno',6,@ID_RC_CATALOGOS)


-- MENU CONFIGURACIONES
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) 
VALUES ('Documentos y Moneda','Modulo Configuraciones','/configuraciones/documentos','ninguno',1,@ID_RC_CONFIGURACIONES)
, ('Restaurante','Modulo Configuraciones','/configuraciones/restaurante','ninguno',2,@ID_RC_CONFIGURACIONES)

INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol, IdRecursoSistema)
SELECT	IdRol = 2
		, IdRecursoSistema
FROM	dbo.RECURSO_SISTEMA
WHERE	Habilitado = 1
