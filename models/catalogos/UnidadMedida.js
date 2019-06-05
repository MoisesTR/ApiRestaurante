const statement = require('../../sqlStatement/unidadMedidaStatements');
const {sql, pushAOJParam, storedProcExecute, queryExecute} = require('../../Utils/defaultImports');

class UnidadMedidaModel {

    getUnidadById( IdUnidadMedida ){
        const aoj  = [];

        pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int,    IdUnidadMedida)
        return queryExecute(statement.BASE_SELECT + ' WHERE IdUnidadMedida = @IdUnidadMedida', aoj)
    }

    getUnidadesMedida( {Habilitado} ){
        const aoj = [];
        let filter  = '';
    
        if ( Habilitado) {
            filter += ' WHERE CLA.Habilitado = @Habilitado';
            pushAOJParam(aoj, 'Habilitado',  sql.Bit() , +Habilitado)
        }
        return queryExecute( statement.BASE_SELECT + filter, aoj)
    }

    createUnidadMedida( params ){
        const aoj = [];
        
        pushAOJParam(aoj, 'IdClasifUDM',    sql.Int,            params.IdClasifUDM)
        pushAOJParam(aoj, 'NombUnidad',     sql.NVarChar(50),   params.NombUnidad)
        pushAOJParam(aoj, 'Simbolo',        sql.NVarChar(3),    params.Simbolo);
        // pushAOJParam(aoj, 'NImportancia',   sql.Int,            params.NImportancia);
        return storedProcExecute('dbo.USP_CREATE_UNIDAD_MEDIDA', aoj)
    }

    updateUnidadMedida( params ){
        const aoj = [];

        pushAOJParam(aoj, 'IdUnidadMedida',     sql.Int,            params.IdUnidadMedida)
        pushAOJParam(aoj, 'IdClasifUDM',        sql.Int,            params.IdClasifUDM)
        pushAOJParam(aoj, 'NombUnidad',         sql.NVarChar(50),   params.NombUnidad)
        pushAOJParam(aoj, 'Simbolo',            sql.NVarChar(3),    params.Simbolo);
        pushAOJParam(aoj, 'NImportancia',       sql.Int,            params.NImportancia);
        return storedProcExecute('dbo.USP_UPDATE_UNIDAD_MEDIDA', aoj)
    }

    changeStateUnidadMedida( IdUnidadMedida, Habilitado ){
        const aoj  = [];

        pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int,   IdUnidadMedida)
        pushAOJParam(aoj, 'Habilitado',              sql.Bit,   +Habilitado)
        return storedProcExecute('dbo.USP_DISP_UNIDAD_MEDIDA', aoj)
    }
}

module.exports = UnidadMedidaModel;
