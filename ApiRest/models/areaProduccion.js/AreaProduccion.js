const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')
const { addEqualParamInFilter } = require('../../Utils/util');
const baseSelect = 'SELECT IdAreaProduccion, IdSucursal, NumAP,CodBarAP, NombAP, Habilitado, CreatedAt, UpdatedAt FROM AREA_PRODUCCION';

module.exports = class AreaProduccion {
    static async getArea({ IdAreaProduccion, IdSucursal }) {
        const aoj = [];
        let filter = '';

        if ( IdAreaProduccion ) {
            pushAOJParam(aoj,   'IdAreaProduccion',     sql.TinyInt,    IdAreaProduccion)
            filter +=  addEqualParamInFilter(filter, 'IdAreaProduccion');
        } else if ( IdSucursal ) {
            pushAOJParam(aoj,   'IdSucursal',   sql.Int,    IdSucursal);
            filter +=  addEqualParamInFilter(filter,    'IdSucursal');
        } else {
            throw new Error('Debes seleccionar un filtro para el area de produccion.');
        }

        const response = await queryExecute(baseSelect + filter, aoj);
        return response.recordset[0];
    }

    static async getAreas({Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        const response = await queryExecute(baseSelect + filter, aoj);
        return response.recordset;
    }
    
    createArea({IdSucursal, NombAP}) {
        const aoj = [];
        
        pushAOJParam(aoj,   'IdSucursal',   sql.Int,    IdSucursal);
        pushAOJParam(aoj,   'NombAP',        sql.NVarChar(50),   NombAP);
        return storedProcExecute('USP_CREATE_AREA_PRODUCCION', aoj);
    }
    
    updateArea({IdAreaProduccion, NombAP}) {
        const aoj = [];
        
        pushAOJParam(aoj,   'IdAreaProduccion',   sql.Int,    IdAreaProduccion);
        pushAOJParam(aoj,   'NombAP',        sql.NVarChar(50),   NombAP);
        return storedProcExecute('USP_UPDATE_AREA_PRODUCCION', aoj);
    }
    
    changeState( IdAreaProduccion, Habilitado ) {
        const aoj = [];
        
        pushAOJParam(aoj,   'IdAreaProduccion', sql.Int,    IdAreaProduccion);
        pushAOJParam(aoj,   'Habilitado',       sql.Bit,        +Habilitado);
        return storedProcExecute('USP_DISP_AREA_PRODUCCION')
    }
}