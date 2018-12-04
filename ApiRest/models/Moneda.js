'use strict';
const baseSelect    = 'SELECT IdMoneda, IdPais, IsPrincipal, NombMoneda, CodigoIso,Simbolo, Habilitado, CreatedAt, UpdatedAt FROM FACTURACION_MONEDA';
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../Utils/util');
const { param }     = require('express-validator/check');
const { sql, pushAOJParam, queryExecute } = require('../Utils/defaultImports')


class MonedaModel {

    async createMoneda() {
        throw new ReferenceError('Funcion no implementada');
    }
    
    async updateMoneda() {
        throw new ReferenceError('Funcion no implementada');
    }

    /**
     * @name _getAMoneda
     * @param filter String 
     */
    async _getAMoneda( paranName, type,  value ) {
        this.aoj    = [];
        let filter  = ` WHERE ${paranName}  = @${paranName};`
        
        pushAOJParam( this.aoj, paranName, type, value);
        return await queryExecute( baseSelect + filter, this.aoj)
    }

    async getMonedaById( IdMoneda) {
        return this._getAMoneda( 'IdMoneda',    sql.TinyInt,   IdMoneda );
    }

    async getMonedaByIdPais( IdPais ) {
        return this._getAMoneda( 'IdPais',      sql.TinyInt,    IdPais);
    }

    async getMonedaByCodIso( CodigoIso ) {
        return  this._getAMoneda( 'CodigoIso',  sql.NVarChar(3), CodigoIso);
    }

    async getMonedaPrincipal( ) {
        return  this._getAMoneda( 'IsPrincipal',sql.Bit,        1);
    }
    async getMonedas( params ) { 
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