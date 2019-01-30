const express = require('express');
// Controllers
const claseCuentaController = require('../controllers/contabilidad/claseCuenta');
const grupoCuentaController = require('../controllers/contabilidad/grupoCuenta');
// Validations
const validations = require('../Utils/validations/contabilidadValidations');
const   { containToken, ensureAuth }      = require('../services/jwt');
const   { validsParams, Habilitado } = require('../Utils/validations/genericValidations');

const Router = express.Router();

Router
    // Clases de Cuentas
    .get( '/cuentas/clases\$',  validations.getClasesVentas,    validsParams,  claseCuentaController.getClasesCuenta)
    .get( '/cuentas/clases/:IdClasCuenta(\\d+)',    validations.getClaseVenta,      validsParams,   claseCuentaController.getClaseCuenta)
    .post('/cuentas/clases',    validations.createClaseCuenta,  validsParams  ,claseCuentaController.createClaseCuenta)
    // Grupos de cuentas
    .get( '/cuentas/grupos\$',    validations.getGruposCuenta, validsParams, grupoCuentaController.getGruposCuenta)
    .get( '/cuentas/grupos/:IdGrupo(\\d+)',    validations.getGrupoCuenta, validsParams, grupoCuentaController.getGrupoCuenta)
    .post('/cuentas/grupos',    validations.createGrupoCuenta, validsParams, grupoCuentaController.createGrupoCuenta)
    // Cuentas
    ;

module.exports = Router;