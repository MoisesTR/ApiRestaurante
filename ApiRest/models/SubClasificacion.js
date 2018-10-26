const db    = require('../services/database');
const sql   = require('mssql');

class SubClasificacionModel {
    
    async getSubclasificById( IdSubClasificacion ) {
        var aoj = [];

        db.pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        return  db.storedProcExecute('USP_GET_SUBCLASIFICACION', aoj)
    }
    
    async getSubclasificaciones( Habilitado ) {
        var aoj = [];

        db.pushAOJParam(aoj, 'Habilitado',          sql.Int,    +Habilitado)
        return  db.storedProcExecute('USP_GET_SUBCLASIFICACIONES', aoj)
    }
    
    async createSubclasificacion( data ) {
        var aoj = [];

        db.pushAOJParam(aoj, 'IdClasificacion',             sql.Int, data.IdClasificacion)
        db.pushAOJParam(aoj, 'NombSubClasificacion',        sql.NVarChar(50), data.NombreSubClasificacion)
        db.pushAOJParam(aoj, 'DescSubClasificacion',        sql.NVarChar(150), data.DescripcionSubClasificacion)
        return  db.storedProcExecute('USP_CREATE_SUBCLASIFICACION', aoj)
    }
    
    async updateSubclasificacion( data ) {
        var aoj = [];
    
        db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
        db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
        db.pushAOJParam(aoj, 'NombreSubClasificacion', sql.NVarChar(50), data.NombreSubClasificacion)
        db.pushAOJParam(aoj, 'DescripcionSubClasificacion', sql.NVarChar(150), data.DescripcionSubClasificacion)
        return  db.storedProcExecute('USP_UPDATE_SUBCLASIFICACION', aoj)
    }
    
    async getSubclasificacionesByIdClasificacion( IdClasificacion ) {
        var aoj = [];

        db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
        return  db.storedProcExecute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION', aoj)
    }
    
    async changeStateSubClasificacion( IdSubClasificacion, Habilitado ) {
        var aoj = [];
        db.pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        db.pushAOJParam(aoj, 'Habilitado',          sql.Bit,    +Habilitado)
        return  db.storedProcExecute('USP_DISP_SUBCLASIFICACION', aoj)
    }
}

module.exports = SubClasificacionModel;