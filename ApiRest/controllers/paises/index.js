const  moneda = require('./moneda');
const pais = require('./pais');

module.exports = {
    ...pais,
    ...moneda
}