
'use strict';
const {matchedData, db, sql, mssqlErrors} = require('../Utils/defaultImports')
const baseSelect = 'SELECT IdMoneda, IdPais, IsPrincipal, NombMoneda, CodigoIso,Simbolo, Habilitado, CreatedAt, UpdatedAt FROM FACTURACION_MONEDA';
import { existParam, addLikeParamInFilter, addEqualParamInFilter } from '../Utils/util';
import { param } from 'express-validator/check';


export default class MonedaModel {

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
    _getAMoneda = ( paranName, type,  value ) => {
        this.aoj    = [];
        let filter  = ` WHERE ${paranName}  = @${paranName};`
        db.pushAOJParam( aoj, paranName, type, value);
        return db.queryExecute( baseSelect + filter, aoj)
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
        let aoj     = [];
        
        if ( existParam(params.CodigoIso) ) {
            filter = addLikeParamInFilter( filter, 'CodigoIso');
            db.pushAOJParam( aoj,   'CodigoIso',    sql.NVarChar(3),    CodigoIso);
        }
        if ( existParam( params.NombMoneda ) ) {
            filter = addLikeParamInFilter( filter, 'NombMoneda');
            db.pushAOJParam( aoj,   'NombMoneda',   sql.NVarChar(50),   NombMoneda);
        }
        if ( existParam( param.Habilitado ) ) {
            filter = addEqualParamInFilter( filter, 'Habilitado');
            db.pushAOJParam( aoj,   'Habilitado',   sql.Bit,            Habilitado);
        }
        return db.queryExecute( baseSelect + filter, aoj );
    }
}