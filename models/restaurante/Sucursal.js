const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')
const baseSelect = 'SELECT SUC.IdSucursal,SUC.NombSucursal,SUC.Direccion, SUC.Telefono1, SUC.Telefono2,SUC.Habilitado, RES.IdRestaurante, RES.NombRestaurante from dbo.SUCURSAL_RESTAURANTE SUC INNER JOIN dbo.RESTAURANTE RES ON SUC.IdRestaurante = RES.IdRestaurante ';

class SucursalModel {
    static async getSucursalById( IdSucursal ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal',      sql.Int,    IdSucursal)
        const resp = await queryExecute( baseSelect + ' WHERE IdSucursal = @IdSucursal', aoj)
        return resp.recordset[0];
    }
    
    static async getSucursales( Habilitado ) {
        const aoj = [];
        const filter = ' WHERE SUC.Habilitado = @Habilitado';

        pushAOJParam(aoj, 'Habilitado',      sql.Int,    +Habilitado)
        const resp = await queryExecute( baseSelect+ filter, aoj)
        return resp.recordset;
    }
    
    static createSucursal( data ) {
        const aoj = [];

        pushAOJParam(aoj,    'IdRestaurante',   sql.Int,            data.IdRestaurante);
        pushAOJParam(aoj,    'NombSucursal',    sql.NVarChar(100),  data.NombSucursal)
        pushAOJParam(aoj,    'Direccion',       sql.NVarChar(250),  data.Direccion)
        pushAOJParam(aoj,    'Telefono1',       sql.NVarChar(20),   data.Telefono1)
        pushAOJParam(aoj,    'Telefono2',       sql.NVarChar(20),   data.Telefono2)
        return storedProcExecute('USP_CREATE_SUCURSAL', aoj)
    }
    
    static updateSucursal( data ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal',          sql.Int,            data.IdSucursal)
        pushAOJParam(aoj, 'NombSucursal',      sql.NVarChar(100),  data.NombSucursal)
        pushAOJParam(aoj, 'Direccion',           sql.NVarChar(250),  data.Direccion)
        pushAOJParam(aoj, 'Telefono1',           sql.NVarChar(20),   data.Telefono1)
        pushAOJParam(aoj, 'Telefono2',           sql.NVarChar(20),   data.Telefono2)
        return storedProcExecute('USP_UPDATE_SUCURSAL', aoj)
    }
    
    static changeStateSucursal( IdSucursal, Habilitado) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal',  sql.Int,    IdSucursal);
        pushAOJParam(aoj, 'Habilitado',  sql.Bit,    +Habilitado);
        return storedProcExecute('USP_DISP_SUCURSAL', aoj)
    }
}
module.exports = SucursalModel;