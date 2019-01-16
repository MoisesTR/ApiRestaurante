const {pushAOJParam, queryExecute,sql, storedProcExecute, whereHabilitadoFilter} = require('../Utils/defaultImports')
const baseSelect    = `SELECT IdRestaurante, IdMoneda, IdPais, IdMonedaFacturacion, IsAutoBackup, IsCuotaFija, NombRestaurante, DescRestaurante, CuotaFija, PorcIva, RazonSocial, SitioWeb, 
    Correo, TelPrincipal, TelPrincipal2, FechaFundacion, Login, Workspace, Habilitado, CreatedAt, UpdatedAt
    FROM            RESTAURANTE`;

module.exports = class Restaurante {
    static getRestaurantes( data ) {
        const aoj =[];

        pushAOJParam( aoj, 'Habilitado',     sql.Bit,    +data.Habilitado);
        return queryExecute( baseSelect + whereHabilitadoFilter, aoj) 
    }
    
    static getRestaurante( IdRestaurante ) {
        const aoj = [];

        pushAOJParam( aoj, 'IdRestaurante',     sql.Int,    IdRestaurante);
        return queryExecute( baseSelect + ' WHERE IdRestaurante = @IdRestaurante', aoj) 
    }

    static createRestaurante( data ) {
        const aoj = [];

        console.log(data);
        
        // pushAOJParam( aoj, 'IdRestaurante',      sql.Int,   data.IdRestaurante);
        pushAOJParam( aoj, 'IdMoneda',           sql.TinyInt,   data.IdMoneda);
        pushAOJParam( aoj, 'IdPais',             sql.TinyInt,   data.IdPais);
        pushAOJParam( aoj, 'IdMonedaFacturacion',sql.TinyInt,   data.IdMonedaFacturacion);
        pushAOJParam( aoj, 'IsAutoBackup',       sql.Bit,   +data.IsAutoBackup);
        pushAOJParam( aoj, 'IsCuotaFija',        sql.Bit,   +data.IsCuotaFija);
        pushAOJParam( aoj, 'NombRestaurante',    sql.NVarChar(100),     data.NombRestaurante);
        pushAOJParam( aoj, 'DescRestaurante',    sql.NVarChar(150),     data.DescRestaurante);
        pushAOJParam( aoj, 'CuotaFija',          sql.Numeric(17,7),     data.CuotaFija);
        pushAOJParam( aoj, 'PorcIva',            sql.Numeric(5,2),      data.PorcIva);
        pushAOJParam( aoj, 'RazonSocial',        sql.NVarChar(100),     data.RazonSocial);
        pushAOJParam( aoj, 'SitioWeb',           sql.NVarChar(100),     data.SitioWeb);
        pushAOJParam( aoj, 'Correo',             sql.NVarChar(150),     data.Correo);
        pushAOJParam( aoj, 'TelPrincipal',       sql.NVarChar(20),      data.TelPrincipal);
        pushAOJParam( aoj, 'TelPrincipal2',      sql.NVarChar(20),      data.TelPrincipal2);
        pushAOJParam( aoj, 'FechaFundacion',     sql.SmallDateTime(),   data.FechaFundacion);
        pushAOJParam( aoj, 'Login',              sql.NVarChar(150),     data.Login);
        pushAOJParam( aoj, 'Workspace',          sql.NVarChar(150),     data.Workspace);
        // pushAOJParam( aoj, 'Habilitado',         sql.,data.Habilitado);
        return storedProcExecute('USP_CREATE_RESTAURANTE', aoj)
    }
}