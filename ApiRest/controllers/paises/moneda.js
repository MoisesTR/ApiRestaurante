'use strict';
const {matchedData, db, sql, mssqlErrors} = require('../../Utils/defaultImports');
import MonedaModel  from '../../models/Moneda';
require('../')
let Moneda  = 

exports.getMonedas = ( req, res ) => {
    let data = matchedData( req,{locations: 'query'});
}