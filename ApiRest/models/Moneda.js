'use strict';
const baseSelect    = 'SELECT IdMoneda, IsPrincipal, NombMoneda, CodigoIso,Simbolo, Habilitado, CreatedAt, UpdatedAt FROM FACTURACION_MONEDA';
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../Utils/util');
const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports')


class MonedaModel {

    createMoneda() {
        throw new ReferenceError('Funcion no implementada');
    }
    
    updateMoneda() {
        throw new ReferenceError('Funcion no implementada');
    }

    /**
     * @name _getAMoneda
     * @param filter String 
     */
    _getAMoneda( paranName, type,  value ) {
        this.aoj    = [];
        let filter  = ` WHERE ${paranName}  = @${paranName};`
        
        pushAOJParam( this.aoj, paranName, type, value);
        return queryExecute( baseSelect + filter, this.aoj)
    }

    getMonedaById( IdMoneda) {
        return this._getAMoneda( 'IdMoneda',    sql.TinyInt,   IdMoneda );
    }

    getMonedaByIdPais( IdPais ) {
        return this._getAMoneda( 'IdPais',      sql.TinyInt,    IdPais);
    }

    getMonedaByCodIso( CodigoIso ) {
        return  this._getAMoneda( 'CodigoIso',  sql.NVarChar(3), CodigoIso);
    }

    getMonedaPrincipal( ) {
        return  this._getAMoneda( 'IsPrincipal',sql.Bit,        1);
    }
    getMonedas( params ) { 
        let filter  = '';
        this.aoj     = [];
        
        if ( !!params.CodigoIso ) {
            filter = addLikeParamInFilter( filter, 'CodigoIso');
            pushAOJParam( this.aoj,   'CodigoIso',    sql.NVarChar(3),    CodigoIso);
        }
        if ( !!params.NombMoneda ) {
            filter = addLikeParamInFilter( filter, 'NombMoneda');
            pushAOJParam( this.aoj,   'NombMoneda',   sql.NVarChar(50),   NombMoneda);
        }
        if ( !!param.Habilitado ) {
            filter = addEqualParamInFilter( filter, 'Habilitado');
            pushAOJParam( this.aoj,   'Habilitado',   sql.Bit,            Habilitado);
        }
       
        return queryExecute( baseSelect + filter, this.aoj );
    }
}

module.exports = MonedaModel;