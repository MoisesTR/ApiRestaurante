const statement = require('../sqlStatement/clasificacionStatement');
const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../Utils/defaultImports');
const { addEqualParamInFilter } = require('../Utils/util');

module.exports =  class ClasificacionController {

    createClasificacion( IdCategoria, NombClasificacion, DescClasificacion) {
        const   aoj = [];

        console.log(IdCategoria, NombClasificacion);
        pushAOJParam(aoj, 'IdCategoria',         sql.Int,                IdCategoria);
        pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion);
        pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion);
        return  storedProcExecute( 'USP_CREATE_CLASIFICACION', aoj )
    }
    
    getClasificaciones( {Habilitado} = {} ) {
        let aoj     = [];
        let filter  = '';

        if (  Habilitado ) {
            filter += ' WHERE CLA.Habilitado = @Habilitado';
            pushAOJParam(aoj, 'Habilitado',  sql.Bit() , +Habilitado)
        }
        return queryExecute(statement.BASE_SELECT + filter, aoj)
    }
    
    getClasificacionesByIdCategoria( IdCategoria, Habilitado ){
        let filter  = '';
        let aoj = [];
    
        filter +=   ' WHERE CLA.IdCategoria = @IdCategoria';
        pushAOJParam(aoj, 'IdCategoria',    sql.Int, IdCategoria)
        if ( Habilitado ) {
            filter  += addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
        }
        return  queryExecute(statement.BASE_SELECT + filter, aoj)
    }
    
    updateClasificacion( {IdClasificacion, IdCategoria, NombClasificacion, DescClasificacion} = {}) {
        let aoj = [];
        
        pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),              IdClasificacion)
        pushAOJParam(aoj, 'IdCategoria',         sql.Int(),              IdCategoria)
        pushAOJParam(aoj, 'NombClasificacion',   sql.NVarChar(50),       NombClasificacion)
        pushAOJParam(aoj, 'DescClasificacion',   sql.NVarChar(150),      DescClasificacion)
        return  storedProcExecute('USP_UPDATE_CLASIFICACION', aoj)
    }
    
    getClasificacionById( IdClasificacion ) {
        const aoj     = [];
        let filter  = '';
    
        filter += ' WHERE CLA.IdClasificacion = @IdClasificacion';
        pushAOJParam(aoj, 'IdClasificacion', sql.Int,    IdClasificacion);
        return queryExecute(statement.BASE_SELECT + filter, aoj)
    }
    
    changeStateClasificacion( IdClasificacion, Habilitado ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdClasificacion',     sql.Int(),  IdClasificacion);
        pushAOJParam(aoj, 'Habilitado',          sql.Bit(), +Habilitado);
        return storedProcExecute('USP_DISP_CLASIFICACION', aoj)
    }
}
