const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports');
const baseSelect = `SELECT	s.IdSubClasificacion,
s.NombSubClasificacion,
s.DescSubClasificacion,
s.IdClasificacion,
c.NombClasificacion,
s.Habilitado,
s.CreatedAt,
s.UpdatedAt FROM SUBCLASIFICACION_PRODUCTO s
INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion`;

class SubClasificacionModel {
    
    getSubclasificById( IdSubClasificacion ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        return  queryExecute(baseSelect+' WHERE s.IdSubClasificacion = @IdSubClasificacion ', aoj)
    }
    
    getSubclasificaciones( Habilitado ) {
        const aoj = [];
        let filter = '';

        if ( Habilitado != undefined ) {
            filter += ' WHERE s.Habilitado = @Habilitado';
            pushAOJParam(aoj, 'Habilitado',          sql.Int,    +Habilitado)
        }
        return  queryExecute(baseSelect + filter, aoj)
    }
    
    createSubclasificacion( data ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdClasificacion',             sql.Int,           data.IdClasificacion)
        pushAOJParam(aoj, 'NombSubClasificacion',        sql.NVarChar(50),  data.NombSubClasificacion)
        pushAOJParam(aoj, 'DescSubClasificacion',        sql.NVarChar(150), data.DescSubClasificacion)
        return  storedProcExecute('USP_CREATE_SUBCLASIFICACION', aoj)
    }
    
    async updateSubclasificacion( data ) {
        const aoj = [];
    
        pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
        pushAOJParam(aoj, 'IdClasificacion',    sql.Int, data.IdClasificacion)
        pushAOJParam(aoj, 'NombSubClasificacion', sql.NVarChar(50),     data.NombSubClasificacion)
        pushAOJParam(aoj, 'DescSubClasificacion', sql.NVarChar(150),    data.DescSubClasificacion)
        return  storedProcExecute('USP_UPDATE_SUBCLASIFICACION', aoj)
    }
    
    async getSubclasificacionesByIdClasificacion( IdClasificacion ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdClasificacion', sql.Int, IdClasificacion)
        return  storedProcExecute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION', aoj)
    }
    
    async changeStateSubClasificacion( IdSubClasificacion, Habilitado ) {
        const aoj = [];
        pushAOJParam(aoj, 'IdSubClasificacion',  sql.Int,    IdSubClasificacion)
        pushAOJParam(aoj, 'Habilitado',          sql.Bit,    +Habilitado)
        return  storedProcExecute('USP_DISP_SUBCLASIFICACION', aoj)
    }
}

module.exports = SubClasificacionModel;