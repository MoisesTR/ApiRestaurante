const { sql, pushAOJParam } = require('../Utils/defaultImports');
const baseSelect    =  `SELECT IdClasificacion, IdCategoria, NombClasificacion,DescClasificacion,Habilitado, CreatedAt,UpdatedAt 
                        FROM CLASIFICACION_PRODUCTO`;

module.exports =  class ClasificacionController {

    async createClasificacion( IdCategoria, NombClasificacion, DescClasificacion) {
        let aoj = [];

        console.log(IdCategoria, NombClasificacion);
        pushAOJParam(aoj, 'IdCategoria',         sql.Int,                IdCategoria);
        pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion);
        pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion);
        return  storedProcExecute( 'USP_CREATE_CLASIFICACION', aoj )
    }
    
    async getClasificaciones( {Habilitado} = {} ) {
        let aoj     = [];
        let filter  = '';

        if (  Habilitado ) {
            filter += ' WHERE Habilitado = @Habilitado';
            pushAOJParam(aoj, 'Habilitado',  sql.Bit(),  +Habilitado);
        }
        return queryExecute(baseSelect + filter, aoj)
    }
    
    async getClasificacionesByIdCategoria(  ){
        let filter  = '';
        let aoj = [];
    
        filter +=   ' WHERE IdCategoria = @IdCategoria';
        pushAOJParam(aoj, 'IdCategoria',    sql.Int, data.IdCategoria)
        if ( Habilitado ) {
            filter  +=  ' AND Habilitado = @Habilitado'
            pushAOJParam(aoj, 'Habilitado', sql.Int, data.Habilitado)
        }
        return  queryExecute(baseSelect + filter, aoj)
    }
    
    async updateClasificacion( {IdClasificacion, IdCategoria, NombClasificacion, DescClasificacion} = {}) {
        let aoj = [];
        pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),              IdClasificacion)
        pushAOJParam(aoj, 'IdCategoria',         sql.Int(),              IdCategoria)
        pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion)
        pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion)
        return  storedProcExecute('USP_UPDATE_CLASIFICACION', aoj)
    }
    
    async getClasificacionById( IdClasificacion ) {
        let aoj     = [];
        let filter  = '';
    
        filter += ' WHERE IdClasificacion = @IdClasificacion';
        pushAOJParam(aoj, 'IdClasificacion', sql.Int,    IdClasificacion);
        return queryExecute(baseSelect + filter, aoj)
    }
    
    async changeStateClasificacion( IdClasificacion, Habilitado ) {
        let aoj = [];

        pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),  IdClasificacion);
        pushAOJParam(aoj, 'Habilitado',          sql.Bit(), +Habilitado);
        return storedProcExecute('USP_DISP_CLASIFICACION', aoj)
    }
}