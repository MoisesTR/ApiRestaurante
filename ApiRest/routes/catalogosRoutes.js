const   express             = require('express');
const   PaisController      = require('../controllers/paises')
const   TipDocIdentController = require('../controllers/tipoDocumento')
const   {validsParams, Habilitado}      = require('../Utils/validations/genericValidations');
const   router              = express.Router();
const   validations         = require('../Utils/validations/validations')

router
    //Rutas para Manejo de catalogos
    .get( '/paises',                PaisController.getPaises)
    .get( '/pais/:IdPais',          PaisController.getPais)
    .get( '/monedas',               PaisController.getMonedas)
    .get( '/monedas/:IdMoneda',     PaisController.getMoneda)
    //Obtener tipos de documento
    .get('/tiposDocumento',                             Habilitado,validsParams,           TipDocIdentController.getTiposDocumento)
    .post('/tipoDocumento',                             validations.createTipoDocumentoI,       validsParams,       TipDocIdentController.createTipoDocumento)
    .put('/tipoDocumento/:IdTipDoc(\\d+)',              validations.updateTipoDocumentoI,       validsParams,       TipDocIdentController.updateTipoDocumento)
    .delete('/tipoDocumento/:IdTipDoc(\\d+)',    validations.changeStateGeneric('IdTipDoc'),  validsParams,       TipDocIdentController.changeStateTipoDocumento)
        
module.exports = router;