const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')

class DetalleBodegaSucursal {
    constructor({IdDetalle, IdBodegaC, IdProducto, IdEstadoEm, IdDetalleAP, IdBodegaAP}) {
        this.IdDetalle= IdDetalle;
        this.IdProducto = IdProducto
        this.IdEstadoEm =IdEstadoEm 
        this.IdDetalleAP = IdDetalleAP;
        this.IdDetalleAP = IdDetalleAP;
        this.IdBodegaAP = IdBodegaAP;
    }

    createDetalle() {
        pushAOJParam(aoj,   'IdBodegaC' , sql.Int ,IdBodegaC);
        pushAOJParam(aoj, , sql. ,);
        pushAOJParam(aoj, , sql. ,);
        pushAOJParam(aoj, , sql. ,);
        pushAOJParam(aoj, , sql. ,);
    }

    updateDetalle() {

    }

    changeState() {

    }

    static async getDetalle() {

    }

    static async getDetalles() {

    }
}

module.exports = DetalleBodegaSucursal;