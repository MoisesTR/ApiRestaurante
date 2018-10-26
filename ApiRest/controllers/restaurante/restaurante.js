const {mssqlErrors, matchedData, db, sql} = require('../defaultImports.js')

const baseSelect    = `SELECT IdRestaurante, IdMoneda, IdPais, IdMonedaFacturacion, IsAutoBackup, IsCuotaFija, NombRestaurante, DescRestaurante, CuotaFija, PorcIva, RazonSocial, SitioWeb, Correo, TelPrincipal, TelPrincipal2, 
FechaFundacion, Login, Workspace, Habilitado, CreatedAt, UpdatedAt
FROM            RESTAURANTE`;

exports.getRestaurantes = ( req, res) => {
    let     data    = matchedData(req, {locations:'query'});
    let     aoj     = [];
    let     filters = '';

    db.pushAOJParam( aoj, 'Habilitado',     sql.Bit,    data.Habilitado);
    db.queryExecute( baseSelect +filters, aoj) 
    .then( result => {
        res.status(200) 
            .json({restaurantes: result.recordset})
    })
    .catch( error => res.status( error.status | 500).json( mssqlErrors(error) ))
}

exports.createRestaurante = (req, res) => {
    let     data    = matchedData(req, {locations:'body'});
    let     aoj     = [];
    
    db.pushAOJParam( aoj, 'IdRestaurante',      data.IdRestaurante);
    db.pushAOJParam( aoj, 'IdMoneda',           data.IdMoneda);
    db.pushAOJParam( aoj, 'IdPais',             data.IdPais);
    db.pushAOJParam( aoj, 'IdMonedaFacturacion',data.IdMonedaFacturacion);
    db.pushAOJParam( aoj, 'IsAutoBackup',       data.IsAutoBackup);
    db.pushAOJParam( aoj, 'IsCuotaFija',        data.IsCuotaFija);
    db.pushAOJParam( aoj, 'NombRestaurante',    data.NombRestaurante);
    db.pushAOJParam( aoj, 'DescRestaurante',    data.DescRestaurante);
    db.pushAOJParam( aoj, 'CuotaFija',          data.CuotaFija);
    db.pushAOJParam( aoj, 'PorcIva',            data.PorcIva);
    db.pushAOJParam( aoj, 'RazonSocial',        data.RazonSocial);
    db.pushAOJParam( aoj, 'SitioWeb',           data.SitioWeb);
    db.pushAOJParam( aoj, 'Correo',             data.Correo);
    db.pushAOJParam( aoj, 'TelPrincipal',       data.TelPrincipal);
    db.pushAOJParam( aoj, 'TelPrincipal2',      data.TelPrincipal2);
    db.pushAOJParam( aoj, 'FechaFundacion',     data.FechaFundacion);
    db.pushAOJParam( aoj, 'Login',              data.Login);
    db.pushAOJParam( aoj, 'Workspace',          data.Workspace);
    db.pushAOJParam( aoj, 'Habilitado',         data.Habilitado);
    db.storedProcExecute('USP_CREATE_RESTAURANTE', aoj)
    .then( result => {

    })
    .catch(err =>{
        res.status(err.status | 500)
            .json( mssqlErrors( err) )
    })
}
db.pushAOJParam( aoj, '',             data.Correo);