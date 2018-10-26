const sql   = require('mssql');
const db    = require('../../services/database');
const {mssqlErrors} = require('../../Utils/util');
const {matchedData} = require('express-validator/filter');
const baseSelect    = `SELECT IdPais,IdMoneda, NombrePais, CodigoAlfa3, CodigoNumerico, PrefijoTelefonico, CreatedAt FROM PAIS`;

exports.getPaises   = (req, res) => {

};

exports.getPais     = ( req, res ) => {

};

exports.createPais  = ( req, res ) => {

};

exports.updatePais  = ( req, res ) => {

};