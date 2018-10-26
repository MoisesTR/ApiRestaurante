const sql   = require('mssql');
const db    = require('../../services/database');
const {mssqlErrors} = require('../../Utils/util');
const {matchedData} = require('express-validator/filter');
const baseSelect    = `SELECT IdPais,IdMoneda, NombrePais, CodigoAlfa3, CodigoNumerico, PrefijoTelefonico, CreatedAt FROM PAIS`;

export default class PaisModel {

    async  getPaises() {
    
    }
    
    async  getPais( IdPais ) {
    
    }
    
    async  createPais() {
    
    }

    async  updatePais() {

    }
}