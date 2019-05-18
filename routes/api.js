const express = require('express');
const ClasificacionController   = require('../controllers/clasificacion');
const EmpaqueController         = require('../controllers/catalogos/empaque');
const EnvaseController          = require('../controllers/catalogos/envase');
const ProveedorController       = require('../controllers/proveedor');
const SubClasifController       = require('../controllers/subclasificacion');
const EstadoProductoController  = require('../controllers/estadoproducto');
const ProductoController        = require('../controllers/producto');
const ImagenController          = require('../controllers/imagenes');
const UploadController          = require('../controllers/upload');
const SucursalController        = require('../controllers/restaurante/sucursal');
const UnidadMedidaController    = require('../controllers/catalogos/unidadmedida');
const TrabajadorController      = require('../controllers/trabajador/trabajador');
const CargoController           = require('../controllers/trabajador/cargo');
const clasifUDMController       = require('../controllers/clasificacionudm');
const bodegaApController        = require('../controllers/bodegaAp');
const menuController            = require('../controllers/menu');
const validations               = require('../Utils/validations/validations');
let   FactCompController        = require('../controllers/facturacion');
let   {validsParams, Habilitado : habilitadoValid,changeStateGeneric}    = require('../Utils/validations/genericValidations');
const Router = express.Router();


Router
    .get('/', (req, res) => {
        res.status(200).json({
            isApi: true
        })
    })
    //Rutas clasificacion controller
    .get('/clasificacion/:IdClasificacion(\\d+)',                           ClasificacionController.getClasificacionById)
    .get('/clasificaciones/:IdCategoria(\\d+)/:Habilitado(\\d+)',           ClasificacionController.getClasificacionesByIdCategoria)
    .get('/clasificaciones',                        habilitadoValid,                        validsParams,   ClasificacionController.getClasificaciones)
    .post('/clasificacion',                         validations.createClasificacion,        validsParams,   ClasificacionController.createClasificacion)
    .put('/clasificacion/:IdClasificacion(\\d+)',   validations.updateClasificacion,        validsParams,   ClasificacionController.updateClasificacion)
    .delete('/clasificacion/:IdClasificacion(\\d+)',changeStateGeneric('IdClasificacion'),  validsParams,   ClasificacionController.changeStateClasificacion)
    //Rutas empaque controller
    .get('/empaque/:IdEmpaque(\\d+)',       EmpaqueController.getEmpaqueById)
    .get('/empaques',                       habilitadoValid,                    validsParams,       EmpaqueController.getEmpaques)
    .post('/empaque',                       validations.createEmpaque,          validsParams ,      EmpaqueController.createEmpaque)
    .put('/empaque/:IdEmpaque(\\d+)',       validations.updateEmpaque,          validsParams,       EmpaqueController.updateEmpaque)
    .delete('/empaque/:IdEmpaque(\\d+)',    changeStateGeneric('IdEmpaque'),    validsParams,       EmpaqueController.changeStateEmpaque)
    //Rutas envase controler
    .get('/envase/:IdEnvase(\\d+)',     EnvaseController.getEnvaseById)
    .get('/envases',                    habilitadoValid,                    validsParams,       EnvaseController.getEnvases)
    .post('/envase',                    validations.createEnvase,           validsParams,       EnvaseController.createEnvase)
    .put('/envase/:IdEnvase(\\d+)',     validations.updateEnvase,           validsParams,       EnvaseController.updateEnvase)
    .delete('/envase/:IdEnvase(\\d+)',  changeStateGeneric('IdEnvase'),     validsParams,       EnvaseController.changeStateEnvase)
    //Rutas proveedor Controller
    .get('/proveedor/:IdProveedor(\\d+)',           ProveedorController.getProveedorById)
    .get('/proveedores',                            habilitadoValid,                        validsParams,   ProveedorController.getProveedores)
    .post('/proveedor',                             validations.createProveedor,            validsParams,   ProveedorController.createProveedor)
    .post('/proveedor/telefono',                    validations.createTelefonoProveedor,    validsParams,   ProveedorController.createTelefonoProveedor)
    .put('/proveedor/:IdProveedor(\\d+)',           validations.updateProveedor,            validsParams,   ProveedorController.updateProveedor)
    .delete('/proveedor/:IdProveedor(\\d+)',        changeStateGeneric('IdProveedor'),      validsParams,   ProveedorController.changeStateProveedor)
    .delete('/proveedor/telefono/:IdTelefono(\\d+)',changeStateGeneric('IdTelefono'),       validsParams,   ProveedorController.changeStateTelefonoProveedor)
    //Rutas subclasificacion Controller
    .get('/subclasificacion/:IdSubClasificacion(\\d+)', SubClasifController.getSubclasificById)
    .get('/subclasificaciones',                         habilitadoValid,                            validsParams,       SubClasifController.getSubclasificaciones)
    .get('/subclasificaciones/:IdClasificacion(\\d+)',  SubClasifController.getSubclasificacionesByIdClasificacion)
    .post('/subclasificacion',                          validations.createSubclasificacion,         validsParams,       SubClasifController.createSubclasificacion)
    .put('/subclasificacion/:IdSubClasificacion(\\d+)', validations.updateSubclasificacion,         validsParams,       SubClasifController.updateSubclasificacion)
    .delete('/subclasificacion/:IdSubClasificacion(\\d+)',changeStateGeneric('IdSubClasificacion'), validsParams,       SubClasifController.changeStateSubClasificacion)
    //Rutas estadoproducto controller
    .get('/estadosproducto',                        habilitadoValid,        validsParams,   EstadoProductoController.getEstados)
    .get('/estadoproducto/:IdEstado(\\d+)',         EstadoProductoController.getEstadoById)
    //Rutas producto controller
    .get('/productos\$',                              habilitadoValid,    validations.getProducts,    validsParams,   ProductoController.getProductos)
    .get('/productos/:IdProducto(\\d+)',            ProductoController.getProductoById)
    .get('/productos/proveedor/:IdProveedor(\\d+)', ProductoController.getProductosByProveedorId)
    .post('/productos\$',                             validations.createProducto,         validsParams,   ProductoController.createProducto)
    .put('/productos/:IdProducto(\\d+)',            validations.updateProducto,         validsParams,   ProductoController.updateProducto)
    .delete('/productos/:IdProducto(\\d+)',         changeStateGeneric('IdProducto'),   validsParams,   ProductoController.changeStateProducto)

    .get('/getImagen/:tipo/:img',       ImagenController.getImage)
    .put('/uploadImage/:carpeta/:id',               UploadController.uploadImage)
    .delete('/deleteImage/:tipo/:img',  ImagenController.deleteImage)
    //Rutas sucursal Controller
    .get('/sucursales',                     habilitadoValid,                    validsParams,       SucursalController.getSucursales)
    .get('/sucursal/:IdSucursal(\\d+)',     SucursalController.getSucursalById)
    .post('/sucursal',                      validations.createSucursal,         validsParams,       SucursalController.createSucursal)
    .put('/sucursal/:IdSucursal(\\d+)',     validations.updateSucursal,         validsParams,       SucursalController.updateSucursal)
    .delete('/sucursal/:IdSucursal(\\d+)',  changeStateGeneric('IdSucursal'),   validsParams,       SucursalController.changeStateSucursal)
    //Rutas para unidad de Medida Controller
    .get('/unidadesmedida',                         habilitadoValid,    validsParams,           UnidadMedidaController.getUnidadesMedida)
    .get('/unidadmedida/:IdUnidadMedida(\\d+)',     UnidadMedidaController.getUnidadById)
    .post('/unidadmedida',                          validations.createUnidadMedida,         validsParams,   UnidadMedidaController.createUnidadMedida)
    .put('/unidadmedida/:IdUnidadMedida(\\d+)',     validations.updateUnidadMedida,         validsParams,   UnidadMedidaController.updateUnidadMedida)
    .delete('/unidadmedida/:IdUnidadMedida(\\d+)',  changeStateGeneric('IdUnidadMedida'),   validsParams,   UnidadMedidaController.changeStateUnidadMedida)
    //Rutas clasificacionUnidadmedida controller
    .get('/clasificacionunidadmedida/:IdClasifUDM(\\d+)',   clasifUDMController.getClasificacionUdmById)
    .get('/clasificacionesunidadmedida',                    clasifUDMController.getClasificacionesUdm)
    /*********** faltan */
    //Rutas para Trabajador Controller
    .get('/trabajadores',                       habilitadoValid.concat(validations.IdSucursal), validsParams,       TrabajadorController.getTrabajadores)
    .get('/trabajador/:IdTrabajador(\\d+)',     TrabajadorController.getTrabajadorById)
    .post('/trabajador',                        validations.createTrabajador,                   validsParams,       TrabajadorController.createTrabajador)
    .put('/trabajador/:IdTrabajador(\\d+)',     validations.createTrabajador.concat(validations.updateTrabajador),  validsParams,       TrabajadorController.updateTrabajador)
    .delete('/trabajador/:IdTrabajador(\\d+)',  changeStateGeneric('IdTrabajador'),             validsParams,       TrabajadorController.changeStateTrabajador)
    //Rutas Para Cargo Controller
    .get('/cargos',                     habilitadoValid,validsParams,   CargoController.getCargos)
    .post('/cargo',                     validations.createCargo,        validsParams,       CargoController.createCargo)
    .get('/cargo/:IdCargo(\\d+)',       CargoController.getCargoById)
    .put('/cargo/:IdCargo(\\d+)',       validations.updateCargo,        validsParams,       CargoController.updateCargo)
    .delete('/cargo/:IdCargo(\\d+)',    changeStateGeneric('IdCargo'),  validsParams,       CargoController.changeStateCargo)
    //Rutas para Bodega Area Produccion
    .post('/entradabodegaap',                           validations.createEntradaBodegaAP,      validsParams,   bodegaApController.createEntradaBodegaAp)
    .post('/detalleentradabodegaap',                    validations.detalleEntradaBodega,       validsParams,   bodegaApController.createDetalleEntrada)
    .get('/detallebodegaap',                            bodegaApController.getDetalleBodegaAp)
    .put('/generarfactura/:IdEntradaBodegaAP(\\d+)',    validations.crearFactura,               validsParams,   bodegaApController.generarFactura)
    //Facturacion
    .post('/bulk/factComp',     validations.bulkCreateFacturaCompra,        validsParams,       FactCompController.bulkCreateFacturaCompra)
    .post('/factComp',              validations.createFacturaCompra,        validsParams,       FactCompController.createFacturaCompra)
    .post('/detalleFactComp',       validations.createDetalleFacturaCompra, validsParams,       FactCompController.createDetalleFacturaCompra)
    .get('/getFactura',             habilitadoValid,                    validations.getFacturaById,         validsParams ,          FactCompController.getFacturaById)
    .get('/updateFactComp',         habilitadoValid,                    validations.updateFacturaCompra,    validsParams ,          FactCompController.updateFacturaCompra)
    .get('/updateDetalleFactura',   habilitadoValid,                    validations.updateClasificacion,    validsParams ,          FactCompController.updateDetalleFacturaCompra)
    .get('/getCambiosFactura',      habilitadoValid,                    validations.getCambiosFacturaById,  validsParams ,          FactCompController.getCambiosFacturaById)
    .get('/listarfacturas',         habilitadoValid,                    validations.obtenerFacturasC,       validsParams ,          FactCompController.obtenerFacturasCompra)
    .get('/getFacturas', FactCompController.getFacturasIngresadas)
    .get('/top5Productos', FactCompController.getProductosMasComprados)
    //Rutas para los menues
    .post('/menu', menuController.createMenu)
    .get('/menus/rol/:IdRol(\\d+)',validations.getMenuesByRol,menuController.getMenuesByRol)
    .get('/menus/:IdMenu(\\d+)',validations.getMenuesByRol,menuController.getMenuesByRol)

module.exports = Router