const { existParam } = require('../Utils/util');
const sql   = require('mssql');
const db    = require('../services/database');
const baseSelect = 'SELECT IdCategoria,NombCategoria,DescCategoria,Habilitado,CreatedAt, UpdatedAt FROM CATEGORIA_PRODUCTO'

class CategoriaModel {

    constructor() {
        this.aoj = [];
    }
    
    async createCategoria( NombCategoria, DescCategoria ){ 
        this.aoj = [];
        db.pushAOJParam(aoj, 'NombCategoria',   sql.NVarChar(50),  NombCategoria)
        db.pushAOJParam(aoj, 'DescCategoria',   sql.NVarChar(150), DescCategoria)
        return db.storedProcExecute('USP_CREATE_CATEGORIA', aoj)
    }

    async getCategorias( data ){
        this.aoj     = [];
        let filter  = '';    
    
        if ( existParam( data.NombCategoria ) ) {
            filter += (filter === '') ? " WHERE NombCategoria = '%'@NombCategoria'%'" : " AND NombCategoria LIKE '%'@NombCategoria'%";
            db.pushAOJParam(aoj, 'NombCategoria', sql.NVarChar(50), data.NombCategoria)
        }
        if ( existParam( data.Habilitado )  ) {
            filter += ' WHERE Habilitado = @Habilitado';
            db.pushAOJParam(aoj, 'Habilitado',  sql.Bit() , +data.Habilitado)
        }
        return db.queryExecute(baseSelect +  filter, aoj)
    }

    async updateCategoria( data ){
        this.aoj    = [];
        db.pushAOJParam(aoj, 'IdCategoria',     sql.Int,            data.IdCategoria)
        db.pushAOJParam(aoj, 'NombCategoria',   sql.NVarChar(50),   data.NombCategoria)
        db.pushAOJParam(aoj, 'DescCategoria',   sql.NVarChar(150),  data.DescCategoria)
        return db.storedProcExecute('USP_UPDATE_CATEGORIA', aoj)
    }

    async getCategoriaById( IdCategoria ){
        this.aoj    = [];
        let filter = ' WHERE IdCategoria = @IdCategoria;';
    
        db.pushAOJParam(aoj, 'IdCategoria',     sql.Int,    IdCategoria);
        return db.queryExecute(baseSelect +filter, aoj)
    }

    async changeStateCategoria( IdCategoria, Habilitado ){
        this.aoj    = [];
        
        db.pushAOJParam(aoj, 'IdCategoria', sql.Int(), data.IdCategoria);
        db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
        return db.storedProcExecute('USP_DISP_CATEGORIA', aoj)
    }
}

module.exports = CategoriaModel;