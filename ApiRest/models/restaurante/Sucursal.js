const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')
const baseSelect = 'SELECT IdSucursal,NombSucursal,Direccion, Telefono1, Telefono2,Habilitado from dbo.SUCURSAL_RESTAURANTE';

class SucursalModel {
    static getSucursalById( IdSucursal ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal',      sql.Int,    IdSucursal)
        return queryExecute( baseSelect + ' WHERE IdSucursal = @IdSucursal', aoj)
    }
    
    static getSucursales( Habilitado ) {
        const aoj = [];
        const filter = ' WHERE Habilitado = @Habilitado';

        pushAOJParam(aoj, 'Habilitado',      sql.Int,    +Habilitado)
        return queryExecute( baseSelect+ filter, aoj)
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