const sql   = require('mssql');
const db    = require('../services/database');
const {mssqlErrors} = require('./util');
const {matchedData, sanitize} = require('express-validator/filter');
const { query,param,body,check,oneOf, validationResult } = require('express-validator/check');
const whereHabilitadoFilter = ' WHERE Habilitado = @Habilitado';

module.exports = {
    sql,
    ...db, 
    mssqlErrors,
    matchedData,
    sanitize,
    query,
    param, 
    body, 
    oneOf,
    check, 
    validationResult,
    whereHabilitadoFilter
}