const sql   = require('mssql');
const {pushAOJParam, queryExecute, storedProcExecute}    = require('../services/database');
const baseSelect    = `SELECT P.IdPais,FM.IdMoneda, NombPais, CodAlfa3, CodNumerico, PrefijoTelefonico, P.CreatedAt 
                        FROM PAIS AS P
                         LEFT JOIN FACTURACION_MONEDA AS FM
                        ON P.IdMoneda = FM.IdMoneda`;

class PaisModel {
    
    constructor() {
        this.aoj = [];
    }

    getPaises( Habilitado ) {
        let filter = '';

        pushAOJParam( this.aoj,     'Habilitado',   sql.Bit,    Habilitado );
        return queryExecute( baseSelect + filter, this.aoj )
    }
    
    getPais( IdPais ) {
        let filter  =  ' WHERE P.IdPais = @IdPais';
        this.aoj    = [];

        pushAOJParam( this.aoj,     'IdPais',       sql.Int,    IdPais);
        return queryExecute( baseSelect + filter, this.aoj )
    }
    
    createPais() {
    
        throw new Error('Metodo no implementado');
    }

    updatePais() {
        throw new Error('Metodo no implementado')
    }
}

module.exports = PaisModel;