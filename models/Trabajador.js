const statement = require('../sqlStatement/trabajadorStatement');
const { pushAOJParam, storedProcExecute,whereHabilitadoFilter, queryExecute, sql} = require('../Utils/defaultImports')
const baseSelect = statement.BASE_SELECT_TRABAJADOR;
const updateImage = statement.UPDATE_IMAGE;

class TrabajadorModel {
    
    static async getTrabajadorById( IdTrabajador ) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdTrabajador', sql.Int, IdTrabajador);
        return queryExecute(baseSelect + ' WHERE T.IdTrabajador = @IdTrabajador', aoj)
    }

    static getTrabajadores( Habilitado, IdSucursal, IdPais ) {
        const aoj = [];
        let filter = '';
        
        if ( !Habilitado != null ) {
            filter += ' WHERE T.Habilitado = @Habilitado';
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,    +Habilitado);
        }
        if ( !!IdSucursal ) {
            pushAOJParam(aoj,   'IdSucursal',   sql.Int,    IdSucursal);
        }
        if ( !!IdPais ) {

            pushAOJParam(aoj,   'IdPais',       sql.Int,    IdPais);
        }
        return queryExecute( baseSelect + filter, aoj)
    }
    
    static createTrabajador( trabajadorData ) {
        const aoj = [];
       
        pushAOJParam(aoj, 'IdSucursal', sql.Int,            trabajadorData.IdSucursal);
        pushAOJParam(aoj, 'IdCargo',    sql.Int,            trabajadorData.IdCargo);
        pushAOJParam(aoj, 'Nombres',    sql.NVarChar(50),   trabajadorData.Nombres);
        pushAOJParam(aoj, 'Apellidos',  sql.NVarChar(50),   trabajadorData.Apellidos);
        pushAOJParam(aoj, 'IdTipDoc',   sql.Int,            trabajadorData.IdTipDoc);
        pushAOJParam(aoj, 'IdPais',     sql.Int,            +trabajadorData.IdPais);
        pushAOJParam(aoj, 'Documento',  sql.NVarChar(50),   trabajadorData.Documento);
        pushAOJParam(aoj, 'Imagen',     sql.NVarChar(50),   trabajadorData.Imagen);
        pushAOJParam(aoj, 'FechaNacimiento', sql.Date(),    trabajadorData.FechaNacimiento);
        pushAOJParam(aoj, 'Direccion',  sql.NVarChar(300),  trabajadorData.Direccion);
        pushAOJParam(aoj, 'Telefono1',  sql.NVarChar(20),   trabajadorData.Telefono1);
        pushAOJParam(aoj, 'Telefono2',  sql.NVarChar(20),   trabajadorData.Telefono2);
        pushAOJParam(aoj, 'FechaIngreso', sql.Date(),       trabajadorData.FechaIngreso);
        // pushOutParam(aoj, 'IdTrabajador', sql.Int)
        return storedProcExecute('USP_CREATE_TRABAJADOR', aoj)
    }
    
    static updateTrabajador( trabajadorData ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTrabajador',   sql.Int,            trabajadorData.IdTrabajador);
        pushAOJParam(aoj, 'IdSucursal',     sql.Int,            trabajadorData.IdSucursal);
        pushAOJParam(aoj, 'IdCargo',        sql.Int,            trabajadorData.IdCargo);
        pushAOJParam(aoj, 'Nombres',        sql.NVarChar(50),   trabajadorData.Nombres);
        pushAOJParam(aoj, 'Apellidos',      sql.NVarChar(50),   trabajadorData.Apellidos);
        pushAOJParam(aoj, 'IdTipDoc',       sql.Int,            trabajadorData.IdTipDoc);
        pushAOJParam(aoj, 'Documento',      sql.NVarChar(50),   trabajadorData.Documento);
        pushAOJParam(aoj, 'Imagen',         sql.NVarChar(50),   trabajadorData.Imagen);
        pushAOJParam(aoj, 'FechaNacimiento', sql.Date,          trabajadorData.FechaNacimiento);
        pushAOJParam(aoj, 'Direccion',      sql.NVarChar(300),  trabajadorData.Direccion);
        pushAOJParam(aoj, 'Telefono2',      sql.NVarChar(20),   trabajadorData.Telefono2);
        pushAOJParam(aoj, 'Telefono1',      sql.NVarChar(20),   trabajadorData.Telefono1);
        pushAOJParam(aoj, 'FechaIngreso',   sql.Date(),         trabajadorData.FechaIngreso);  
        return storedProcExecute('USP_UPDATE_TRABAJADOR', aoj)
    }
    
    static changeStateTrabajador( IdTrabajador, Habilitado ) {
        const aoj = [];
        
        console.log('Changing state')
        pushAOJParam(aoj, 'IdTrabajador',    sql.Int,   IdTrabajador);
        pushAOJParam(aoj, 'Habilitado',      sql.Bit,   +Habilitado);
        return storedProcExecute('USP_DISP_TRABAJADOR', aoj)
    }

    static async updateImageTrabajador(IdTrabajador, Imagen) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTrabajador', sql.Int, IdTrabajador);
        pushAOJParam(aoj, 'Imagen', sql.NVarChar(100), Imagen);
        return queryExecute(updateImage + ' WHERE IdTrabajador = @IdTrabajador', aoj)
    }


}

module.exports = TrabajadorModel;