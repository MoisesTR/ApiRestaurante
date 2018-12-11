const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports')
const baseSelect    = 'SELECT IdEstado, NombEstado,DescEstado, Habilitado, CreatedAt FROM ESTADO_PRODUCTO';

class EstadoProductoModel {

    getEstados( data ){
        let aoj = [];
    
        pushAOJParam(aoj,    'Habilitado',   sql.Int,    +data.Habilitado)
        return queryExecute(baseSelect + ' WHERE Habilitado = @Habilitado', aoj)
    }

    getEstadoById( IdEstado ){
        let aoj     = [];
        let filters = '';

        filters += ' WHERE IdEstado = @IdEstado';
        pushAOJParam(aoj, 'IdEstado',    sql.Int,    IdEstado)
        
        return queryExecute(baseSelect + filters, aoj)
    }
}

module.exports = EstadoProductoModel;