const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports');

class ClasificacionUdmModel {
    constructor() {
        this.baseSelect =   `SELECT IdClasifUDM, NombClasificacion, DescClasificacion, Habilitado, CreatedAt, UpdatedAt 
        FROM CLASIFICACION_UNIDAD_MEDIDA`;
        this.aoj    = [];
    }
    
    getClasificaciones( {Habilitado} = {}){
        this.aoj = [];
        
        pushAOJParam(aoj,   'Habilitado',   sql.Int,    +Habilitado)
        return queryExecute( this.baseSelect + filter,aoj)
    }
    
    getClasificacion( IdClasifUDM ){
        this.aoj=[];
        
        pushAOJParam(aoj,   'IdClasifUDM',  sql.Int,    IdClasifUDM)
        return queryExecute( this.baseSelect + filter,aoj)
    }
}

module.exports = ClasificacionUdmModel;