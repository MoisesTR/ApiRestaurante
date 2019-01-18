const { pushAOJParam, sql, storedProcExecute, queryExecute }  = require('../../Utils/defaultImports')
const { addLikeParamInFilter, addEqualParamInFilter } = require('../../Utils/util');
const baseSelect = 'SELECT IdCategoria,NombCategoria,DescCategoria,Habilitado,CreatedAt, UpdatedAt FROM CATEGORIA_PRODUCTO'
const queryUpdate = `UPDATE CATEGORIA_PRODUCTO 
SET NombCategoria = @NombCategoria, DescCategoria = @DescCategoria, UpdatedAt= GETDATE()
WHERE IdCategoria = @IdCategoria `;

class CategoriaModel {

    constructor() {
        this.aoj = [];
    }
    
    createCategoria( NombCategoria, DescCategoria ){ 
        this.aoj = [];

        pushAOJParam(this.aoj, 'NombCategoria',   sql.NVarChar(50),  NombCategoria)
        pushAOJParam(this.aoj, 'DescCategoria',   sql.NVarChar(150), DescCategoria)
        return storedProcExecute('USP_CREATE_CATEGORIA', this.aoj)
    }

    getCategorias( data ){
        this.aoj     = [];
        let filter  = '';    
    
        if ( !!data.NombCategoria  ) {
            filter += addLikeParamInFilter( filter, 'NombCategoria' );
            pushAOJParam(this.aoj, 'NombCategoria', sql.NVarChar(50), data.NombCategoria)
        }
        if ( undefined != data.Habilitado  ) {
            filter += addEqualParamInFilter( filter, 'Habilitado' );
            pushAOJParam(this.aoj, 'Habilitado',  sql.Bit() , +data.Habilitado)
        }

        return queryExecute(baseSelect +  filter, this.aoj)
    }

    updateCategoria( data ){
        this.aoj    = [];

        pushAOJParam(this.aoj, 'IdCategoria',     sql.Int,            data.IdCategoria)
        pushAOJParam(this.aoj, 'NombCategoria',   sql.NVarChar(50),   data.NombCategoria)
        pushAOJParam(this.aoj, 'DescCategoria',   sql.NVarChar(150),  data.DescCategoria)
        
        return queryExecute(queryUpdate, this.aoj)
    }

    getCategoriaById( IdCategoria ){
        this.aoj    = [];
        let filter = ' WHERE IdCategoria = @IdCategoria;';
    
        pushAOJParam(this.aoj, 'IdCategoria',     sql.Int,    IdCategoria);
        return queryExecute(baseSelect +filter, this.aoj)
    }

    changeStateCategoria( IdCategoria, Habilitado ){
        this.aoj    = [];
        
        pushAOJParam(this.aoj, 'IdCategoria',    sql.Int(),  IdCategoria);
        pushAOJParam(this.aoj, 'Habilitado',     sql.Bit(),  +Habilitado);
        return storedProcExecute('USP_DISP_CATEGORIA', this.aoj)
    }
}

module.exports = CategoriaModel;