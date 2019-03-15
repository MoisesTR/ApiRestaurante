const { pushAOJParam, sql, storedProcExecute, queryExecute }  = require('../../Utils/defaultImports')
const { addLikeParamInFilter, addEqualParamInFilter } = require('../../Utils/util');
const baseSelect = 'SELECT IdCategoria,IdTipInsumo,NombCategoria,DescCategoria,Habilitado,CreatedAt, UpdatedAt FROM CATEGORIA_PRODUCTO'
const queryUpdate = `UPDATE CATEGORIA_PRODUCTO 
SET NombCategoria = @NombCategoria, DescCategoria = @DescCategoria, UpdatedAt= GETDATE()
WHERE IdCategoria = @IdCategoria `;

class CategoriaModel {    
    static createCategoria( IdTipInsumo,NombCategoria, DescCategoria ){ 
        const aoj = [];
        console.log('Pruebas');
        console.log(DescCategoria);
        pushAOJParam(aoj,   'IdTipInsumo',      sql.Bit,            IdTipInsumo);
        pushAOJParam(aoj,   'NombCategoria',    sql.NVarChar(50),   NombCategoria)
        pushAOJParam(aoj,   'DescCategoria',    sql.NVarChar(150),  DescCategoria)
        return storedProcExecute('USP_CREATE_CATEGORIA', aoj)
    }

    static getCategorias( data ){
        const aoj     = [];
        let filter  = '';    
    
        if ( !!data.IdTipInsumo ) {
            filter += addLikeParamInFilter( filter, 'IdTipInsumo');
            pushAOJParam(aoj, 'IdTipInsumo',   sql.Bit,    data.IdTipInsumo);
        }
        if ( !!data.NombCategoria  ) {
            filter += addLikeParamInFilter( filter, 'NombCategoria' );
            pushAOJParam(aoj, 'NombCategoria', sql.NVarChar(50), data.NombCategoria)
        }
        if ( undefined != data.Habilitado  ) {
            filter += addEqualParamInFilter( filter, 'Habilitado' );
            pushAOJParam(aoj, 'Habilitado',  sql.Bit() , +data.Habilitado)
        }

        return queryExecute(baseSelect +  filter, aoj)
    }

    static updateCategoria( data ){
        const aoj    = [];

        pushAOJParam(aoj, 'IdCategoria',     sql.Int,            data.IdCategoria)
        pushAOJParam(aoj, 'NombCategoria',   sql.NVarChar(50),   data.NombCategoria)
        pushAOJParam(aoj, 'DescCategoria',   sql.NVarChar(150),  data.DescCategoria)
        
        return queryExecute(queryUpdate, aoj)
    }

    static getCategoriaById( IdCategoria ){
        const aoj    = [];
        let filter = ' WHERE IdCategoria = @IdCategoria;';
    
        pushAOJParam(aoj, 'IdCategoria',     sql.Int,    IdCategoria);
        return queryExecute(baseSelect +filter, aoj)
    }

    static changeStateCategoria( IdCategoria, Habilitado ){
        const aoj    = [];
        
        pushAOJParam(aoj, 'IdCategoria',    sql.Int(),  IdCategoria);
        pushAOJParam(aoj, 'Habilitado',     sql.Bit(),  +Habilitado);
        return storedProcExecute('USP_DISP_CATEGORIA', aoj)
    }
}

module.exports = CategoriaModel;