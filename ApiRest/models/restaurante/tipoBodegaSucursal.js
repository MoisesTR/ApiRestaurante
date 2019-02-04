const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')
const baseSelect = '';

module.exports = class BodegaSucursal {
    static async getTipo( IdTipBode ) {

        pushAOJParam(aoj, 'IdTipBode',  sql.TinyInt,    +IdTipBode);
    }
    
    static async getTipos({NombTipBod, Habilitado}) {
        const aoj = [];
        let filter = '';

        if ( NombTipBod ) {
            filter +=  addLikeParamInFilter(filter, 'NombTipBod');
            pushAOJParam(aoj,   'NombTipBod',   sql.NVarChar(50),   NombTipBod);
        }
        if ( Habilitado !== undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilidato',   sql.Bit,            Habilitado);
        }
        const response = await queryExecute(baseSelect +  filter, aoj);
        return response.recordset;
    } 
    
    createTipo({NombTipBod, DescTipBod}) {
        const aoj = [];

        pushAOJParam(aoj,   'NombTipBod',   sql.NVarChar(50),   NombTipBod);
        pushAOJParam(aoj,   'DescTipBod',   sql.NVarChar(150),   DescTipBod);
        return storedProcExecute('USP_CREATE_TIPO_BODEGA_SUCURSAL', aoj);
    }
    
    updateTipo({IdTipBode, NombTipBod, DescTipBod}) {
        const aoj  = [];
        
        pushAOJParam(aoj,   'NombTipBod',   sql.NVarChar(50),   NombTipBod);
        pushAOJParam(aoj,   'DescTipBod',   sql.NVarChar(150),   DescTipBod);
        pushAOJParam(aoj, 'IdTipBode',  sql.TinyInt,    +IdTipBode);
        return storedProcExecute('USP_UPDATE_TIPO_BODEGA_SUCURSAL', aoj);
    }

    changeState({IdTipBode, Habilitado}) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTipBode',  sql.TinyInt,    +IdTipBode);
        pushAOJParam(aoj, 'Habilitado', sql.Bit,    +Habilitado);
        return storedProcExecute('USP_DISP_TIPO_BODEGA_SUCURSAL', aoj);
    }
}