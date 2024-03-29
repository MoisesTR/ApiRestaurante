const express = require('express');
// Controllers
const CuentaController = require("../controllers/contabilidad/cuenta");
const claseCuentaController = require('../controllers/contabilidad/claseCuenta');
const grupoCuentaController = require('../controllers/contabilidad/grupoCuenta');
const SubcCuentaController  = require('../controllers/contabilidad/subCuenta');
const MovSubCuentaController  = require('../controllers/contabilidad/movimientoCuenta');
const DocumentoController   = require('../controllers/contabilidad/documento');
// Validations
const validations = require('../Utils/validations/contabilidadValidations');
const   { containToken, ensureAuth }      = require('../services/jwt');
const   { validsParams, Habilitado } = require('../Utils/validations/genericValidations');

const Router = express.Router();

Router
    // Clases de Cuentas
    .get( '/cuentas/clases\$',  validations.getClasesCuentas,    validsParams,  claseCuentaController.getClasesCuenta)
    .get( '/cuentas/clases/:IdClasCuenta(\\d+)',    validations.getClaseCuenta,      validsParams,   claseCuentaController.getClaseCuenta)
    .post('/cuentas/clases',    validations.createClaseCuenta,  validsParams  ,claseCuentaController.createClaseCuenta)
    // Grupos de cuentas
    .get( '/cuentas/grupos\$',    validations.getGruposCuenta, validsParams, grupoCuentaController.getGruposCuenta)
    .get( '/cuentas/grupos/:IdGrupo(\\d+)',    validations.getGrupoCuenta, validsParams, grupoCuentaController.getGrupoCuenta)
    .post('/cuentas/grupos',    validations.createGrupoCuenta, validsParams, grupoCuentaController.createGrupoCuenta)
    // Cuentas
    .get( '/cuentas\$',     validations.getCuentas,     validsParams,   CuentaController.obtenerCuentas)
    .get( '/cuentas/:NumCuenta([0-9]{4})',  CuentaController.obtenerCuenta)
    .post('/cuentas\$',     validations.createCuenta,   validsParams,   CuentaController.createCuenta)
    .put( '/cuentas/:NumCuenta([0-9]{4})',  validations.updateCuenta, validsParams, CuentaController.actualizarCuenta)
    // Subcuentas
    .get( '/subcuentas\$',     validations.getSubCuentas,     validsParams,   SubcCuentaController.getSubCuentas)
    .get( '/subcuentas/:NumSubCuenta([0-9]{6})',  SubcCuentaController.getSubCuenta)
    .post('/subcuentas\$',     validations.createSubCuenta,   validsParams,   SubcCuentaController.createSubCuenta)
    .put( '/subcuentas/:NumSubCuenta([0-9]{6})',  validations.updateSubCuenta, validsParams, SubcCuentaController.updateSubCuenta)
    //Movimientos
    .get( '/subcuentas/movimientos\$',     validations.getMovimientosCuenta,     validsParams,   MovSubCuentaController.getMovimientosCuenta)
    .get( '/subcuentas/movimientos/:IdMovimiento(\\d+)',  MovSubCuentaController.getMovimientoCuenta)
    .post('/subcuentas/movimientos\$',     validations.createMovimientoCuenta,   validsParams,   MovSubCuentaController.createMovimientoCuenta)
    .put( '/subcuentas/movimientos/:IdMovimiento(\\d+)',  validations.updateMovimientoCuenta, validsParams, MovSubCuentaController.updateMovimientoCuenta)
    // Documentos
    .get( '/documentos\$',     validations.getDocumentos,     validsParams,   DocumentoController.getDocumentos)
    .get( '/documentos/:IdDocumento(\\d+)',     DocumentoController.getDocumento)
    .post('/documentos\$',     validations.createDocumento,   validsParams,   DocumentoController.crearDocumento)
    .put( '/documentos/:IdDocumento(\\d+)',  validations.updateDocumento, validsParams, DocumentoController.updateDocumento)

module.exports = Router;