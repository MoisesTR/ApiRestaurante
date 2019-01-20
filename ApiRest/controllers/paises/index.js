const  moneda = require('../facturacion/moneda');
const pais = require('./pais');

module.exports = {
    ...pais,
    ...moneda
}