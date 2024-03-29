const { pushAOJParam, sql, storedProcExecute, queryExecute }  = require('../../Utils/defaultImports')
const { addLikeParamInFilter, addEqualParamInFilter } = require('../../Utils/util');
const baseSelect = 'SELECT CAT.IdCategoria,CAT.IdTipInsumo,CAT.NombCategoria,CAT.DescCategoria,CAT.Habilitado,CAT.CreatedAt, CAT.UpdatedAt, TIP.NombTipInsumo FROM CATEGORIA_PRODUCTO AS CAT INNER JOIN dbo.TIPO_INSUMO AS TIP ON CAT.IdTipInsumo = TIP.IdTipInsumo'
const queryUpdate = `UPDATE CATEGORIA_PRODUCTO 
SET NombCategoria = @NombCategoria, DescCategoria = @DescCategoria, UpdatedAt= GETDATE()
WHERE IdCategoria = @IdCategoria `;

class CategoriaModel {    
    static createCategoria( IdTipInsumo,NombCategoria, DescCategoria ){ 
        const aoj = [];
    
        pushAOJParam(aoj,   'IdTipInsumo',      sql.Int,            IdTipInsumo);
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
            filter += ' WHERE CAT.Habilitado = @Habilitado';
            pushAOJParam(aoj, 'Habilitado',  sql.Bit() , +data.Habilitado)
        }

        console.log(baseSelect +  filter);
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