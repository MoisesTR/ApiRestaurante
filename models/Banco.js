'use strict';
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../Utils/util');
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../Utils/defaultImports')
const baseSelect = 'SELECT IdBanco, IdPais, Banco, Siglas, Direccion, Telefono1, Telefono2, Correo, Web FROM FACTURACION_BANCOS ';

module.exports = class BancoModel {

    static async getBancos( {IdPais, Banco, Habilitado, Siglas} ) {
        const   aoj = [];
        let filter = '';

        if ( !!IdPais ) {
            filter += addLikeParamInFilter(filter, 'IdPais');
            pushAOJParam( aoj,  'IdPais',       sql.Int,        IdPais );
        }
        if ( !!Banco ) {
            filter += addLikeParamInFilter(filter, 'Banco');
            pushAOJParam( aoj,  'Banco',        sql.NVarChar,   Banco );
        }
        if (!!Siglas) {
            filter += addLikeParamInFilter( filter, 'Siglas' ); 
            pushAOJParam( aoj,  'Siglas',       sql.NVarChar,   Siglas)
        }
        if ( undefined !== Habilitado) {
            filter += addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam( aoj,  'Habilitado',   sql.Bit,        Habilitado );
        }
        
        const bancos=  await queryExecute( baseSelect + filter, aoj )
        return bancos.recordset
    }

    static async getBanco( IdBanco ) {
        const aoj = [];

        pushAOJParam( aoj,  'IdBanco',      sql.Int,        IdBanco);
        const response =  await queryExecute(baseSelect+ ' WHERE IdBanco = @IdBanco', aoj);
        return response.recordset[0];
    }

    static createBanco( IdPais, Banco, Siglas, Direccion, Telefono1, Telefono2, Correo, Web ) {
        const aoj = [];
        
        pushAOJParam( aoj, 'IdPais',        sql.Int,        IdPais);
        pushAOJParam( aoj, 'Banco',         sql.NVarChar,   Banco);
        pushAOJParam( aoj, 'Siglas',        sql.NVarChar,   Siglas);
        pushAOJParam( aoj, 'Direccion',     sql.NVarChar,   Direccion);
        pushAOJParam( aoj, 'Telefono1',     sql.NVarChar,   Telefono1);
        pushAOJParam( aoj, 'Telefono2',     sql.NVarChar,   Telefono2);
        pushAOJParam( aoj, 'Correo',        sql.NVarChar,   Correo);
        pushAOJParam( aoj, 'Web',           sql.NVarChar,   Web);
        return  storedProcExecute('USP_CREATE_BANCO', aoj);
    }
}