'use strict';
const baseSelect    = 'SELECT IdTipCambio,IdMonedaPrincipal, IdMonedaCambio, ValorMonedaPrincipal, ValorCambioOficial, ValorCambioParalelo, Fecha, Habilitado, CreatedAt, UpdatedAt FROM FACTURACION_TIPO_CAMBIO_MONEDA';
const { addLikeParamInFilter, addEqualParamInFilter }   =  require( '../../Utils/util');
const { sql, pushAOJParam, queryExecute, storedProcExecute } = require('../../Utils/defaultImports');


class TipoCambio {

    static createTipoCambio( IdMonedaPrincipal, IdMonedaCambio, ValorMonedaPrincipal, ValorCambioOficial, ValorCambioParalelo, Fecha ) {
        const aoj = [];

        pushAOJParam(aoj,   'IdMonedaPrincipal',    sql.TinyInt,    IdMonedaPrincipal);
        pushAOJParam(aoj,   'IdMonedaCambio',       sql.TinyInt,    IdMonedaCambio);
        pushAOJParam(aoj,   'ValorMonedaPrincipal',	sql.Numeric(19,7),  ValorMonedaPrincipal);
        pushAOJParam(aoj,   'ValorCambioOficial',   sql.Numeric(19,7),  ValorCambioOficial);
        pushAOJParam(aoj,   'ValorCambioParalelo',  sql.Numeric(19,7),  ValorCambioParalelo);
        pushAOJParam(aoj,   'Fecha',                sql.SmallDateTime(),    Fecha);
        return storedProcExecute( 'USP_CREATE_TIPO_CAMBIO_MONEDA', aoj);
    }

    static getTiposCambio() {
        const aoj  = [];
        let     filter =  '';

        return queryExecute( baseSelect, aoj );
    }

    static getTipoCambio( IdTipCambio, IdMonedaPrincipal, IdMonedaCambio, Fecha ) {
        const   aoj = [];
        let     filter = '';
        if ( !IdTipCambio && (!IdMonedaPrincipal && !IdMonedaCambio) ) {
            throw new Error('Para obtener el tipo de cambio envia su id o la fecha esperada.')
        }

        if ( !!IdTipCambio ) {
            filter = addEqualParamInFilter(filter, 'IdTipCambio');
            pushAOJParam(aoj,   'IdTipCambio',  sql.Int,    IdTipCambio);
        } else {
            filter = addEqualParamInFilter(filter, 'IdMonedaPrincipal');
            filter = addEqualParamInFilter(filter, 'IdMonedaCambio');
            pushAOJParam(aoj,   'IdMonedaPrincipal',    sql.TinyInt,    IdMonedaPrincipal);
            pushAOJParam(aoj,   'IdMonedaCambio',       sql.TinyInt,    IdMonedaCambio);
            if ( !!Fecha ) {
                filter = addEqualParamInFilter(filter, 'Fecha');
                pushAOJParam(aoj,   'Fecha',    sql.SmallDateTime(),    Fecha);
            } 
            else {
                filter = addEqualParamInFilter(filter, 'Habilitado');
                pushAOJParam(aoj,   'Habilitado',   sql.Bit,    1);
            }
        }

        return queryExecute( baseSelect + filter, aoj );
    }

    static disHableTipoCambio( IdTipCambio ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdTipCambio',    sql.Int,    IdTipCambio);
        return storedProcExecute('USP_DIS_TIPO_CAMBIO_MONEDA', aoj);
    }
}

module.exports = TipoCambio;