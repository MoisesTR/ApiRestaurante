const express   = require('express');
const Router    = express.Router();
const admonValidations = require('../Utils/validations/admonValidations');
const { validsParams } = require('../Utils/validations/genericValidations');
const RestauranteController = require('../controllers/restaurante/restaurante');

Router
    .get('/restaurantes$/',               admonValidations.getRestaurantes,   validsParams, RestauranteController.getRestaurantes)
    .get('/restaurantes/:IdRestaurante(\\d+)',admonValidations.getRestaurante,    validsParams, RestauranteController.getRestaurante)
    .post('/restaurantes',              admonValidations.createRestaurante, validsParams, RestauranteController.createRestaurante)
    .put('/restaurantes/:IdRestaurante(\\d+)',admonValidations.getRestaurante,admonValidations.createRestaurante, validsParams, RestauranteController.updateRestaurante)

module.exports = Router;