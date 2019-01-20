const   express             = require('express');
//Controllers
const   PaisController      = require('../controllers/paises')
const   BancoController     = require('../controllers/paises/banco');
const   TipDocIdentController   = require('../controllers/catalogos/tipoDocumento')
const   CategoriaController     = require('../controllers/catalogos/categoria');
const   TipoInsumoController    = require('../controllers/catalogos/tipoInsumo');
const   {validsParams, Habilitado, changeStateGeneric}      = require('../Utils/validations/genericValidations');
const   router              = express.Router();
const   validations         = require('../Utils/validations/catalogsValidation')
    
router
    //Rutas para Manejo de catalogos
    .get( '/paises',                PaisController.getPaises)
    .get( '/pais/:IdPais',          PaisController.getPais)
    .get( '/monedas\$',             PaisController.getMonedas)
    .get( '/monedas/:IdMoneda',     PaisController.getMoneda)
    .post('/monedas',               PaisController.createMoneda)
    //Rutas para Interaccion Bancos
    .get( '/bancos\$',              validations.getBancos,  validsParams,   BancoController.getBancos)
    .get( '/bancos/:IdBanco(\\d+)',                BancoController.getBanco)
    .post('/bancos',                validations.createBanco, validsParams,  BancoController.createBanco)
    //Obtener tipos de documento
    .get('/tiposDocumento',                         Habilitado, validsParams,           TipDocIdentController.getTiposDocumento)
    .post('/tipoDocumento',                         validations.createTipoDocumentoI,       validsParams,       TipDocIdentController.createTipoDocumento)
    .put('/tipoDocumento/:IdTipDoc(\\d+)',          validations.updateTipoDocumentoI,       validsParams,       TipDocIdentController.updateTipoDocumento)
    .delete('/tipoDocumento/:IdTipDoc(\\d+)',       changeStateGeneric('IdTipDoc'),  validsParams,       TipDocIdentController.changeStateTipoDocumento)
    //Rutas para Tipos de Insumos
    .get('/tiposInsumos\$',         validations.getTiposInsumo,     validsParams,   TipoInsumoController.getTiposInsumo)
    .get('/tiposInsumos/:IdTipInsumo(\\d+)',        TipoInsumoController.getTipoInsumo)
    .post('/tiposInsumos',          validations.createTipoInsumo,   validsParams,   TipoInsumoController.createTipoInsumo)
    //Rutas categoria controller
    .get('/categoria/:IdCategoria(\\d+)',   CategoriaController.getCategoriaById)
    .get('/categorias',                     Habilitado,                    validsParams,   CategoriaController.getCategorias)
    .post('/categoria',                     validations.createCategoria,        validsParams,   CategoriaController.createCategoria)
    .put('/categoria/:IdCategoria(\\d+)',   validations.updateCategoria,        validsParams,   CategoriaController.updateCategoria)
    .delete('/categoria/:IdCategoria(\\d+)',changeStateGeneric('IdCategoria'),  validsParams,   CategoriaController.changeStateCategoria)
    
module.exports = router;