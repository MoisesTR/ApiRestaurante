const db            = require('../services/database')
const sql           = require('mssql');
const { mssqlErrors,existParam } = require('../Utils/util');
const {matchedData} = require('express-validator/filter');
const baseSelect    =  `SELECT IdClasificacion, IdCategoria, NombClasificacion,DescClasificacion,Habilitado, CreatedAt,UpdatedAt 
                        FROM CLASIFICACION_PRODUCTO`;

module.exports =  class ClasificacionController {

    async createClasificacion( {IdCategoria, NombClasificacion, DescClasificacion} = {}) {
        let aoj = [];

        db.pushAOJParam(aoj, 'IdCategoria',         sql.Int,                IdCategoria);
        db.pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion);
        db.pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion);
        return  db.storedProcExecute('USP_CREATE_CLASIFICACION', aoj)
    }
    
    async getClasificaciones( {} ) {
        let aoj     = [];
        let filter  = '';

        if (  existParam(Habilitado) ) {
            filter += ' WHERE Habilitado = @Habilitado';
        }
        db.pushAOJParam(aoj, 'Habilitado',  sql.Bit(),  +Habilitado);
        return db.queryExecute(baseSelect + filter, aoj)
    }
    
    async getClasificacionesByIdCategoria(req,res){
        let data    = req.params;
        let filter  = '';
        let aoj = [];
    
        filter += ' WHERE IdCategoria = @IdCategoria';
        db.pushAOJParam(aoj, 'IdCategoria',sql.Int, data.IdCategoria)
        if ( existParam( data.IdCategoria ) ) {
            filter  +=  ' AND Habilitado = @Habilitado'
            db.pushAOJParam(aoj, 'Habilitado',sql.Int, data.Habilitado)
        }
        return  db.queryExecute(baseSelect + filter, aoj)
    }
    
    async updateClasificacion( {IdClasificacion, IdCategoria, NombClasificacion, DescClasificacion} = {}) {
        let aoj = [];
        db.pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),              IdClasificacion)
        db.pushAOJParam(aoj, 'IdCategoria',         sql.Int(),              IdCategoria)
        db.pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion)
        db.pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion)
        return  db.storedProcExecute('USP_UPDATE_CLASIFICACION', aoj)
    }
    
    async getClasificacionById( IdClasificacion ) {
        let aoj     = [];
        let filter  = '';
    
        filter += ' WHERE IdClasificacion = @IdClasificacion';
        db.pushAOJParam(aoj, 'IdClasificacion', sql.Int,    IdClasificacion);
        return db.queryExecute(baseSelect + filter, aoj)
    }
    
    async changeStateClasificacion( IdClasificacion, Habilitado ) {
        let aoj = [];
        db.pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),  IdClasificacion);
        db.pushAOJParam(aoj, 'Habilitado',          sql.Bit(), +Habilitado);
        return db.storedProcExecute('USP_DISP_CLASIFICACION', aoj)
    }
}