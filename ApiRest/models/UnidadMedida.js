const {sql, pushAOJParam, storedProcExecute} = require('../Utils/defaultImports');


class UnidadMedidaModel {

    constructor() {
        this.aoj = [];
    }

    async getUnidadById( IdUnidadMedida ){
        this.aoj  = [];

        pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int,    params.IdUnidadMedida)
        return storedProcExecute('USP_GET_UNIDAD_DE_MEDIDA', aoj)
    }

    async getUnidadesMedida( params ){
        this.aoj = [];
    
        // throw new TypeError('Error de prueba')
        pushAOJParam(aoj, 'Habilitado',      sql.Bit, +params.Habilitado)
        return storedProcExecute('USP_GET_UNIDADES_DE_MEDIDA', aoj) 
    }

    async createUnidadMedida( params ){
        this.aoj = [];
        
        pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,params.IdClasificacionUnidadMedida)
        pushAOJParam(aoj, 'NombreUnidad',    sql.NVarChar(50),params.NombreUnidad)
        pushAOJParam(aoj, 'Simbolo',         sql.NVarChar(3),params.Simbolo);
        pushAOJParam(aoj, 'NImportancia',    sql.Int, params.NImportancia);
        return storedProcExecute('dbo.USP_CREATE_UNIDAD_MEDIDA', aoj)
    }

    async updateUnidadMedida( params ){
        this.aoj = [];
        pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int,        params.IdUnidadMedida)
        pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,     params.IdClasificacionUnidadMedida)
        pushAOJParam(aoj, 'NombreUnidad',            sql.NVarChar(50),params.NombreUnidad)
        pushAOJParam(aoj, 'Simbolo',                 sql.NVarChar(3),params.Simbolo);
        pushAOJParam(aoj, 'NImportancia',            sql.Int,        params.NImportancia);
        return storedProcExecute('dbo.USP_UPDATE_UNIDAD_MEDIDA', aoj)
    }

    async changeStateUnidadMedida( IdUnidadMedida, Habilitado ){
        this.aoj  = [];
        pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int, params.IdUnidadMedida)
        pushAOJParam(aoj, 'Habilitado',              sql.Bit, +params.Habilitado)
        return storedProcExecute('dbo.USP_DISP_UNIDAD_MEDIDA', aoj)
    }
}

module.exports = UnidadMedidaModel;