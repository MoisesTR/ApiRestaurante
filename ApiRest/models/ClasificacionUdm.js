const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports');
const baseSelect = 'SELECT IdClasifUDM, NombClasificacion, DescClasificacion, Habilitado, CreatedAt, UpdatedAt FROM CLASIFICACION_UNIDAD_MEDIDA';
const { addEqualParamInFilter } = require('../Utils/util');

class ClasificacionUdmModel {
    
    static getClasificaciones( {Habilitado} = {}){
        const   aoj = [];
        let     filter = '';

        console.log(Habilitado);
        filter += addEqualParamInFilter( filter, 'Habilitado' );
        pushAOJParam(aoj,   'Habilitado',   sql.Int,    1)
        return queryExecute( baseSelect + filter, aoj)
    }
    
    static getClasificacion( IdClasifUDM ){
        const aoj = [];
        
        filter += addEqualParamInFilter( filter, 'IdClasifUDM' );
        pushAOJParam(aoj,   'IdClasifUDM',  sql.Int,    IdClasifUDM)
        return queryExecute( baseSelect + filter, aoj)
    }
}

module.exports = ClasificacionUdmModel;