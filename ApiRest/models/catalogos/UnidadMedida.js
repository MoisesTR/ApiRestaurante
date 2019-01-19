const {sql, pushAOJParam, storedProcExecute} = require('../../Utils/defaultImports');


class UnidadMedidaModel {

    constructor() {
        this.aoj = [];
    }

    async getUnidadById( IdUnidadMedida ){
        this.aoj  = [];

        pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int,    IdUnidadMedida)
        return storedProcExecute('USP_GET_UNIDAD_DE_MEDIDA', aoj)
    }

    async getUnidadesMedida( Habilitado ){
        this.aoj = [];
    
        pushAOJParam(aoj, 'Habilitado',      sql.Bit,   +Habilitado)
        return storedProcExecute('USP_GET_UNIDADES_DE_MEDIDA', aoj) 
    }

    async createUnidadMedida( params ){
        this.aoj = [];
        
        pushAOJParam(aoj, 'IdClasifUDM',    sql.Int,            params.IdClasifUDM)
        pushAOJParam(aoj, 'NombUnidad',     sql.NVarChar(50),   params.NombUnidad)
        pushAOJParam(aoj, 'Simbolo',        sql.NVarChar(3),    params.Simbolo);
        pushAOJParam(aoj, 'NImportancia',   sql.Int,            params.NImportancia);
        return storedProcExecute('dbo.USP_CREATE_UNIDAD_MEDIDA', aoj)
    }

    async updateUnidadMedida( params ){
        this.aoj = [];
        pushAOJParam(aoj, 'IdUnidadMedida',     sql.Int,            params.IdUnidadMedida)
        pushAOJParam(aoj, 'IdClasifUDM',        sql.Int,            params.IdClasifUDM)
        pushAOJParam(aoj, 'NombUnidad',         sql.NVarChar(50),   params.NombUnidad)
        pushAOJParam(aoj, 'Simbolo',            sql.NVarChar(3),    params.Simbolo);
        pushAOJParam(aoj, 'NImportancia',       sql.Int,            params.NImportancia);
        return storedProcExecute('dbo.USP_UPDATE_UNIDAD_MEDIDA', aoj)
    }

    async changeStateUnidadMedida( IdUnidadMedida, Habilitado ){
        this.aoj  = [];
        pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int,   IdUnidadMedida)
        pushAOJParam(aoj, 'Habilitado',              sql.Bit,   +Habilitado)
        return storedProcExecute('dbo.USP_DISP_UNIDAD_MEDIDA', aoj)
    }
}

module.exports = UnidadMedidaModel;