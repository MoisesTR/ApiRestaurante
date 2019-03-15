const { pushAOJParam, storedProcExecute,whereHabilitadoFilter, queryExecute, sql} = require('../Utils/defaultImports')
const baseSelect = `SELECT T.IdTrabajador, T.IdSucursal, S.NombSucursal, T.IdCargo, C.NombCargo,
        T.Nombres, T.Apellidos, T.IdTipDoc, T.Documento, T.Imagen,
        T.FechaNacimiento, T.Direccion, T.Telefono1, T.Telefono2, T.FechaIngreso,
        T.Habilitado, U.Username,T.CreatedAt,T.UpdatedAt
        FROM dbo.TRABAJADOR T 
        INNER JOIN dbo.SUCURSAL_RESTAURANTE S ON T.IdSucursal= S.IdSucursal
        INNER JOIN dbo.CARGO_TRABAJADOR C ON T.IdCargo = C.IdCargo
        LEFT  JOIN dbo.USUARIO	U ON T.IdTrabajador = U.IdTrabajador
        `;

class TrabajadorModel {
    
    static getTrabajadorById( IdTrabajador ) {
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
}

module.exports = TrabajadorModel;