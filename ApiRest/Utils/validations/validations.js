const { query,param,check,body } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');
const {isDate}   = require('./genericValidations');

exports.getTelefonoSucursal = [
    param('IdTelefonoSucursal').isInt(),
    check('IdSucursal', 'IdSucursal es requerido.').isInt(),
    sanitize('IdSucursal').toInt()
];

const createCargo = [
    body('NombCargo', 'El nombre del cargo es requerido!').isLength({min: 3, max:50}),
    body('DescCargo', 'La descripcion del cargo es requerida!').isLength({min: 3, max:100}).optional({nullable: true}),
    body('CodCargo', 'El codigo del cargo es requerido!').isLength({min:2, max: 4}).optional({nullable: true}),
];
exports.createCargo = createCargo;


exports.updateCargo = createCargo.concat([
    check(      'IdCargo').isInt(),
    sanitize(   'IdCargo').toInt()
]);

const createProveedor = [
    body('IdPais', 'Selecciona el Pais del Proveedor').isInt(),
    body('IsProvServicio', 'Selecciona si es Proveedor de Servicios.').isBoolean(),
    body('NombProveedor', 'Ingrese el Nombre del proveedor.').isString(),
    body('Direccion', 'Ingrese la direccion del proveedor.').isString().trim(),
    body('Email','Ingrese el Email del Proveedor.').optional({nullable: true}),
    body('Imagen').isString().optional({nullable: true}),
    body('DescProveedor').isLength({min: 4, max:200}).optional({nullable:true}),
    body('NombRepresentante','Ingrese el Nombre del representante.').isLength({min: 3, max:100}).optional({nullable: true}),
    body('IdTipDoc').isInt(),
    body('Documento','El campo de Ruc es requerido!.'),
    body('Abreviatura').isLength({min:2, max:15}),
    body('IsMercado','El campo de mercado es requerido.').isBoolean(),
    sanitize('IdPais').toInt(),
    sanitize('IsProvServicio').toBoolean(),
    sanitize('IdTipDoc').toInt(),
    sanitize('IsMercado').toBoolean()
];
exports.createProveedor = createProveedor;

exports.updateProveedor = createProveedor.concat([
    param('IdProveedor', 'Seleccione el proveedor a actualizar.').isInt()
]);

exports.createEntradaBodegaAP = [
    body('IdBodegaAreaP', 'Selecciona una Bodega de Area de Produccion').isInt(),
    body('IdTrabajador', 'Seleccione un Trabajador para ingresar la Factura.').isInt(),
    body('IdProveedor', 'Seleccione el Proveedor de la Factura.').isInt(),
    body('NFactura').isString(),
    body('RepresentanteProveedor').isString(),
    body('PorcRetencion').isInt(),
    body('PorcIva').isInt(),
    body('PorcDescuento').isInt(),
    isDate('FechaHora')
];

exports.editEntradaBodegaAP = [
    param('IdEntradaBodegaAP').isInt()
];

exports.crearFactura = [
    check('IdEntradaBodegaAP').isInt()
];
    
exports.detalleEntradaBodega = [
    check('IdEntradaBodegaAP').isInt(),
    check('IdProductoProveedor').isInt(),
    check('Cantidad').isInt(),
    check('PrecioUnitarioEntrada').isFloat(),
    check('DescuentoCalculado').isFloat()
];

const createEnvase = [
    body('NombEnvase', 'El nombre de envase es requerido!').isString().isLength({min: 3, max:50}),
    body('DescEnvase', 'La descripcion debe tener una longitud maxima de 150 caracteres.').isString().optional({nullable:true}).isLength({max:150}),
    sanitize('NombEnvase').toString().trim(),
    sanitize('DescEnvase').toString().trim()
];
exports.createEnvase = createEnvase;

exports.updateEnvase = createEnvase.concat([
    param('IdEnvase', 'IdEnvase debe ser Entero').isInt(),
    sanitize('IdEnvase').toInt()
]); 

exports.IdSucursal = [
    check('IdSucursal','Ingresa un Numero Valido').isInt().optional({nullable:true}),
    sanitize('IdSucursal').toInt()
]
exports.getMenues = [
    query('IdRol','Rol Necesario').isInt()
]
exports.createTrabajador = [
    check('IdSucursal', 'IdSucursal debe ser entero!').isInt(),
    body('IdCargo', 'IdCargo debe ser entero').isInt(),
    body('Nombres', 'Nombres debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
    body('Apellidos', 'Apellidos debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
    body('IdTipDoc', 'IdDocumento es requerido y debe ser entero').isInt(),
    body('IdPais',    'Selecciona un pais.'),
    body('Documento', 'Documento es necesario').isLength({ min: 4, max: 50 }),
    body('Imagen', 'Imagen es requerida').isString(),
    isDate('FechaNacimiento'),
    body('Direccion', 'Direccion debe tener un minimo de 10 y un maximo de 300').isLength({ min: 10, max: 300 }),
    body('Telefono1', 'EL primer telefono es requerido y debe tener 8 digitos!').isLength(8).isInt(),
    body('Telefono2', 'El Telefono2 debe tener una longitud de 8 digitos y ser numerico!').optional({nullable:true}),
    isDate('FechaIngreso'),
    sanitize('IdSucursal', 'IdSucursal debe ser entero').toInt(),
    sanitize('IdCargo', 'IdCargo debe ser entero').toInt(),
    sanitize('FechaNacimiento').toDate(),
    sanitize('FechaIngreso').toDate()
];

exports.updateTrabajador = [
    check('IdTrabajador', 'IdTrabajador debe ser un entero!').isInt(),
    sanitize('IdTrabajador').toInt()
];

const createEmpaque = [
    body('NombEmpaque', 'Nombre de Empaque requerido').isLength({min: 3, max:50}),
    body('DescEmpaque'  , 'La descripcion debe ser texto!').isLength({min: 3, max:150}).optional({nullable: true}),
];

exports.createEmpaque = createEmpaque;

exports.updateEmpaque = createEmpaque.concat([
    param('IdEmpaque', 'IdEmpaque debe ser Entero').isInt(),
    sanitize('IdEmpaque').toInt()
]);

const createClasificacion =  [
    body('IdCategoria', 'Id de la categoria es requerido!').isInt(),
    body('NombClasificacion','El nombre de la clasificacion es requerido, y no debe tener mas de 50 caracteres.').isString().isLength({max:50}),
    body('DescClasificacion', 'La Descripcion no debe tener mas de 150 caracteres.').isString().optional({nullable:true}),
    sanitize('IdCategoria').toInt(),
    sanitize('NombClasificacion').toString()
];
exports.createClasificacion = createClasificacion;

exports.updateClasificacion = createClasificacion.concat([
    param(      'IdClasificacion'   ).isInt(),
    sanitize(   'IdClasificacion'   ).toInt()
]);

const createSubclasificacion =  [
    body('NombSubClasificacion','El nombre de la subclasificacion es requerido, y no debe tener mas de 50 caracteres.').isString().isLength({max:50}),
    body('DescSubClasificacion', 'La Descripcion no debe tener mas de 150 caracteres.').isString().optional({nullable:true}),
    body('IdClasificacion', 'Id de la clasificacion es requerido!').isInt(),
    sanitize('IdClasificacion').toInt(),
    sanitize('NombSubClasificacion').toString()
];

exports.createSubclasificacion = createSubclasificacion;

exports.updateSubclasificacion = createSubclasificacion.concat([
    param('IdSubClasificacion').isInt(),
    sanitize('IdSubClasificacion').toInt()
]);

const createSucursal =  [
    body('IdRestaurante', 'Selecciona el Restaurante al que pertenece la sucursal.').isInt(),
    body('NombSucursal','El nombre de la subclasificacion es requerido, y no debe tener mas de 50 caracteres.').isString().isLength({max:50}),
    body('Direccion', 'La Direccion no debe tener mas de 300 caracteres.').isString(),
    body('Telefono1','El telefono es requerido y debe tener 8 digitos.').isLength(8).isInt(),
    body('Telefono2','El telefono debe tener 8 digitos.').optional({nullable:true}),
    sanitize('NombSucursal').toString(),
    sanitize('Direccion').toString().trim()
];

exports.createSucursal = createSucursal;

exports.updateSucursal = createSucursal.concat([
    param('IdSucursal', 'Id de la sucursal es requerido!').isInt(),
    sanitize('IdSucursal').toInt()
])

const createProducto = [
    body('IdProveedor', 'Selecciona Un proveedor.').isInt(),
    body('IdSubClasificacion', 'Selecciona Una SubClasificacion.').isInt().optional({nullable:true}),
    body('IdEstado','Elige el estado del producto.').isInt(),
    body('NombProducto','Ingresa el Nombre del Producto.').isString(),
    body('DescProducto','Ingresa la Descripcion del producto.').isString(),
    body('Imagen','Ingresa el nombre de la Imagen.').optional({nullable:true}),
    body('IdEnvase').isInt().optional({nullable:true}),
    body('IdEmpaque', 'Debes seleccionar un empaque.').isInt().optional({nullable:true}),
    body('IsGranel', 'Debes especificar si el producto es granel o no.').isBoolean(),
    body('CantidadEmpaque').optional({nullable:true}),
    body('IdUnidadMedida','Debes seleccionar una unidad de medida.').isInt().optional({nullable: true}),
    body('ValorUnidadMedida').isNumeric().optional({nullable: true}),
    body('DiasRotacion').isInt(),
    body('IdTipInsumo').isInt(),
    body('CodProd').isString(),
    body('CodOriginal').optional({nullable:true}),
    body('CodBarra').optional({nullable:true}),
    sanitize('ValorUnidadMedida').toFloat(),
    sanitize('DiasRotacion').toInt(),
    sanitize('CodProd').toString(),
    sanitize('IsGranel').toBoolean()
];
exports.createProducto = createProducto;

exports.updateProducto = createProducto.concat([
    param('IdProducto').isInt()
]);

let createUnidadMedida = [
    body('IdClasifUDM','Seleccione la clasificacion de la unidad de medida.').isInt().toInt(),
    body('NombUnidad', 'Ingrese el nombre de la unidad de medida.').isString().isLength({max:50}),
    body('Simbolo','Ingrese el Simbolo de la Unidad de Medida.').isString().isLength({max:3}).toString(),
    body('NImportancia','Ingrese el valor de Importancia de esta Unidad de Medida.').isInt()
];
exports.createUnidadMedida = createUnidadMedida;

exports.updateUnidadMedida = createUnidadMedida.concat([
    param('IdUnidadMedida').isInt()
]);

exports.createFacturaCompra  = [
    body('NumRefFactura').isString(),
    body('IdProveedor'  ).isInt(),
    body('IdTrabajador' ).isInt(),
    body('IdTipoMoneda' ).isInt(),
    body('IdFormaPago'  ).isInt(),
    body('NombVendedor' ).isString(),
    isDate('FechaFactura'),
    isDate('FechaRecepcion'),
    body('SubTotal').isFloat(),
    body('TotalIva').isFloat(),
    body('CambioActual').isFloat(),
    body('TotalDescuento').isFloat(),
    body('TotalCordobas').isFloat(),
    body('TotalOrigenFactura').isFloat(),
    body('Retencion').isFloat(),
    sanitize('IdProveedor'  ).toInt(),
    sanitize('IdTrabajador' ).toInt(),
    sanitize('IdTipoMoneda' ).toInt(),
];

exports.updateFacturaCompra  = [
    body('NumRefFactura'),
    body('IdTrabajador'),
    body('NombVendedor'),
    body('SubTotal'),
    body('TotalIva'),
    body('CambioActual'),
    body('TotalDescuento'),
    body('TotalCordobas'),
    body('Retencion')
];

exports.createDetalleFacturaCompra = [
    body('IdFactura'    ).isInt(),
    body('IdProducto'   ).isInt(),
    body('PrecioUnitario').isNumeric(),
    body('Cantidad'     ).isNumeric(),
    body('GravadoIva'   ).isNumeric(),
    body('SubTotal'     ).isNumeric(),
    body('Iva'          ).isNumeric(),
    body('Descuento'    ).isNumeric(),
    body('TotalDetalle' ).isNumeric(),
    body('Bonificacion' ).isInt().optional({nullable:true}),
    sanitize('IdFactura'    ).toInt(),
    sanitize('IdProducto'   ).toInt(),
    sanitize('PrecioUnitario').toFloat(),
    sanitize('Cantidad'     ).toFloat(),
    sanitize('GravadoIva'   ).toFloat(),
    sanitize('SubTotal'     ).toFloat(),
    sanitize('Iva'          ).toFloat(),
    sanitize('Descuento'    ).toFloat(),
    sanitize('TotalDetalle' ).toFloat(),
];

exports.updateDetalleFacturaCompra = [
    body('IdFactura').isInt(),
    body('IdProducto').isInt(),
    body('PrecioUnitario').isNumeric(),
    body('Cantidad').isNumeric(),
    body('GravadoIva').isInt(),
    body('SubTotal').isNumeric(),
    body('Iva').isNumeric(),
    body('Descuento').isNumeric(),
    body('TotalDetalle').isNumeric(),
    body('Bonificacion').isInt()
];

exports.getFacturaById = [
    check('IdFactura').isInt()

];

exports.getCambiosFacturaById = [
    check('IdFactura').isInt()
];

exports.getProducts = [
    query('IdProveedor').isInt().optional({nullable: true}),
    query('IdTipInsumo').isInt().optional({nullable: true}),
    query('IsGranel').isBoolean().optional({nullable: true}),
    query('Habilitado').isBoolean().optional({nullable: true}),
    sanitize('IsGranel').toBoolean(),
    sanitize('Habilitado').toBoolean()
];

exports.obtenerFacturasC = [
    check('IdFechaFiltro').toInt().optional({nullable:true}),
    check('FechaInicio').toDate().optional({nullable:true}),
    check('FechaFin').toDate().optional({nullable:true}),
    check('IdProveedor').isInt().optional({nullable:true}),
    check('IdEstadoFactura').isInt().optional({nullable:true}),
    sanitize('IdFechaFiltro', 'La fecha filtro enviada no es una fecha valida.').toInt(),
    sanitize('FechaInicio', 'La fecha Inicio enviada no es una fecha valida.').toDate(),
    sanitize('FechaFin', 'La Fecha Fin Enviada no es una fecha valida').toDate()
];

exports.getMenuesByRol = [
    check('IdRol').isInt()
];


const createTelefonoProveedor = [
    body('IdProveedor', 'Selecciona Un proveedor.').isInt(),
    body('Telefono', 'Ingresa un telefono.').isString(),
    body('NombPAsignada','Ingresa un nombre.').isString(),
    body('Cargo').isLength({min:3, max:20}).optional({nullable:true}),
    body('Extension').isLength({min:1, max:10}).optional({nullable:true}),
    body('IsTitular').isBoolean(),
    sanitize('IdProveedor').toInt(),
    sanitize('IsTitular').toBoolean()
];

exports.createTelefonoProveedor = createTelefonoProveedor;