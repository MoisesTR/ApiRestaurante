'use strict';
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../Utils/util');
const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports')
const baseSelect = 'SELECT IdBanco, IdPais, Banco, Siglas, Direccion, Telefono1, Telefono2, Correo, Web FROM FACTURACION_BANCOS';

class BancoModel {

    getBancos( {IdPais, Banco, Habilitado, Siglas} ) {
        let aoj = [];
        let filter = '';

        pushAOJParam( aoj,  'IdPais',       sql.Int,        IdPais );
        pushAOJParam( aoj,  'Banco',        sql.NVarChar,   Banco );
        pushAOJParam( aoj,  'Siglas',       sql.NVarChar,   Siglas)
        pushAOJParam( aoj,  'Habilitado',   sql.Bit,        Habilitado );
        return queryExecute( baseSelect + filter, aoj )
    }

    getBanco( IdBanco ) {

    }

    createBanco( bancoData ) {
        
    }
}