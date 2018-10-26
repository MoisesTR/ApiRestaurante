const {db, sql, mssqlErrors, matchedData} = require('../defaultImports');

export default class UnidadMedida {

    constructor() {
        this.aoj = [];
    }
    async getUnidadById( IdUnidadMedida ){
        this.aoj  = [];
        db.pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int,    params.IdUnidadMedida)
        return db.storedProcExecute('USP_GET_UNIDAD_DE_MEDIDA', aoj)
    }

    async getUnidadesMedida( params ){
        this.aoj = [];
    
        throw new TypeError('Error de prueba')
        db.pushAOJParam(aoj, 'Habilitado',      sql.Bit, +params.Habilitado)
        return db.storedProcExecute('USP_GET_UNIDADES_DE_MEDIDA', aoj) 
    }

    async createUnidadMedida( params ){
        this.aoj = [];
        db.pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,params.IdClasificacionUnidadMedida)
        db.pushAOJParam(aoj, 'NombreUnidad',    sql.NVarChar(50),params.NombreUnidad)
        db.pushAOJParam(aoj, 'Simbolo',         sql.NVarChar(3),params.Simbolo);
        db.pushAOJParam(aoj, 'NImportancia',    sql.Int, params.NImportancia);
        return db.storedProcExecute('dbo.USP_CREATE_UNIDAD_MEDIDA', aoj)
    }

    async updateUnidadMedida( params ){
        this.aoj = [];
        db.pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int,        params.IdUnidadMedida)
        db.pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,     params.IdClasificacionUnidadMedida)
        db.pushAOJParam(aoj, 'NombreUnidad',            sql.NVarChar(50),params.NombreUnidad)
        db.pushAOJParam(aoj, 'Simbolo',                 sql.NVarChar(3),params.Simbolo);
        db.pushAOJParam(aoj, 'NImportancia',            sql.Int,        params.NImportancia);
        return db.storedProcExecute('dbo.USP_UPDATE_UNIDAD_MEDIDA', aoj)
    }

    async changeStateUnidadMedida( IdUnidadMedida, Habilitado ){
        this.aoj  = [];
        db.pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int, params.IdUnidadMedida)
        db.pushAOJParam(aoj, 'Habilitado',              sql.Bit, +params.Habilitado)
        return db.storedProcExecute('dbo.USP_DISP_UNIDAD_MEDIDA', aoj)
    }
}