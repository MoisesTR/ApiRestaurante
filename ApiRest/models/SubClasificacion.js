const { sql, pushAOJParam, storedProcExecute } = require('../Utils/defaultImports');

class SubClasificacionModel {
    
    async getSubclasificById( IdSubClasificacion ) {
        var aoj = [];

        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        return  storedProcExecute('USP_GET_SUBCLASIFICACION', aoj)
    }
    
    async getSubclasificaciones( Habilitado ) {
        var aoj = [];

        pushAOJParam(aoj, 'Habilitado',          sql.Int,    +Habilitado)
        return  storedProcExecute('USP_GET_SUBCLASIFICACIONES', aoj)
    }
    
    async createSubclasificacion( data ) {
        var aoj = [];

        pushAOJParam(aoj, 'IdClasificacion',             sql.Int, data.IdClasificacion)
        pushAOJParam(aoj, 'NombSubClasificacion',        sql.NVarChar(50), data.NombreSubClasificacion)
        pushAOJParam(aoj, 'DescSubClasificacion',        sql.NVarChar(150), data.DescripcionSubClasificacion)
        return  storedProcExecute('USP_CREATE_SUBCLASIFICACION', aoj)
    }
    
    async updateSubclasificacion( data ) {
        var aoj = [];
    
        pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
        pushAOJParam(aoj, 'NombreSubClasificacion', sql.NVarChar(50), data.NombreSubClasificacion)
        pushAOJParam(aoj, 'DescripcionSubClasificacion', sql.NVarChar(150), data.DescripcionSubClasificacion)
        return  storedProcExecute('USP_UPDATE_SUBCLASIFICACION', aoj)
    }
    
    async getSubclasificacionesByIdClasificacion( IdClasificacion ) {
        var aoj = [];

        pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
        return  storedProcExecute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION', aoj)
    }
    
    async changeStateSubClasificacion( IdSubClasificacion, Habilitado ) {
        var aoj = [];
        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        pushAOJParam(aoj, 'Habilitado',          sql.Bit,    +Habilitado)
        return  storedProcExecute('USP_DISP_SUBCLASIFICACION', aoj)
    }
}

module.exports = SubClasificacionModel;