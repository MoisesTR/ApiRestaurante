const db   = require('../services/database');
const sql  = require('mssql');
const baseSelect    = 'SELECT IdEstado, NombEstado,DescEstado, Habilitado, CreatedAt FROM ESTADO_PRODUCTO';

class EstadoProductoModel {

    async getEstados( data ){
        let aoj = [];
    
        db.pushAOJParam(aoj,    'Habilitado',   sql.Int,    +data.Habilitado)
        return db.queryExecute(baseSelect + ' WHERE Habilitado = @Habilitado', aoj)
    }

    async getEstadoById( IdEstado ){
        let aoj     = [];
        let filters = '';

        filters += ' WHERE IdEstado = @IdEstado';
        db.pushAOJParam(aoj, 'IdEstado',    sql.Int,    IdEstado)
        
        return db.queryExecute(baseSelect + filters, aoj)
    }
}

module.exports = EstadoProductoModel;