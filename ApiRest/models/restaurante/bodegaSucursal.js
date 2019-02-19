const { sql, pushAOJParam, storedProcExecute, queryExecute } = require('../../Utils/defaultImports')

module.exports = class BodegaSucursal {
    constructor({IdBodegaS, IdSucursal, IdTipBode, NombBodega, DescLocal, Login, WorkSpace, Habilitado, CreatedAt}){
        this.IdBodegaS  = IdBodegaS;
        this.IdSucursal = IdSucursal;
        this.IdTipBode  = IdTipBode;
        this.NombBodega = NombBodega;
        this.DescLocal  = DescLocal;
        this.Login      = Login;
        this.WorkSpace  = WorkSpace;
        this.Habilitado = Habilitado;
        this.CreatedAt  = CreatedAt;
    }
    static async getBodega( IdSucursal, IdTipBode ) {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal', sql.Int,        +IdSucursal);
        pushAOJParam(aoj, 'IdTipBode',  sql.TinyInt,    +IdTipBode);
        const resp = await queryExecute(baseSelect +  filter, aoj);
        return resp.recordset[0];
    }

    static async getBodegas({IdSucursal,NombBodega, Login, WorkSpace}) {
        const aoj = [];
        let filter = '';

        if ( IdSucursal ) {
            filter +=  addEqualParamInFilter(filter, 'IdSucursal');
            pushAOJParam(aoj, 'IdSucursal' ,       sql.Int,IdSucursal)
        }
        if ( NombBodega ) {
            filter = addLikeParamInFilter(filter,'NombBodega');
            pushAOJParam(aoj,   'NombBodega',    sql.NVarChar(100),  NombBodega);
        }
        if ( Login ) {
            filter = addLikeParamInFilter(filter,   'Login');
            pushAOJParam(aoj,   'Login',    sql.NVarChar(100),  Login);
        }
        if ( WorkSpace ) {
            filter = addLikeParamInFilter(filter,   'WorkSpace');
            pushAOJParam(aoj,   'WorkSpace',    sql.NVarChar(100),  WorkSpace);
        }
        if ( Habilitado != undefined ) {
            filter  +=  addEqualParamInFilter(filter, 'Habilitado');
            pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        }
        const resp = await queryExecute(baseSelect +  filter, aoj);
        return resp.recordset;
    } 

    createBodega() {
        const aoj = [];

        pushAOJParam(aoj, 'IdSucursal', sql.Int,            +this.IdSucursal);
        pushAOJParam(aoj, 'IdTipBode',  sql.TinyInt,        +this.IdTipBode);
        pushAOJParam(aoj, 'NumBodega',  sql.TinyInt,        this.NumBodega);
        pushAOJParam(aoj, 'NombBodega', sql.NVarChar(100),  this.NombBodega);
        pushAOJParam(aoj, 'DescLocal',  sql.NVarChar(200),  this.DescLocal);
        pushAOJParam(aoj, 'Login',      sql.NVarChar(150),  this.Login);
        pushAOJParam(aoj, 'WorkSpace',  sql.NVarChar(150),  this.WorkSpace);
        return  storedProcExecute('USP_CREATE_BODEGA_SUCURSAL', aoj);
    }
    
    updateBodega({IdBodegaS, NombBodega, DescLocal}) {
        const aoj = [];
        
        pushAOJParam(aoj, 'IdBodegaS',  sql.Int,            +IdBodegaS);
        pushAOJParam(aoj, 'NombBodega', sql.NVarChar(100),  NombBodega);
        pushAOJParam(aoj, 'DescLocal',  sql.NVarChar(200),  DescLocal);
        return  storedProcExecute('USP_CREATE_BODEGA_SUCURSAL', aoj);
    }

    changeState( Habilitado ) {
        const aoj = [];

        pushAOJParam(aoj,   'IdBodegaS',    sql.Int,        this.IdBodegaS);
        pushAOJParam(aoj,   'Habilitado',   sql.Bit,        +Habilitado);
        return storedProcExecute('USP_DISP_BODEGA_SUCURSAL', aoj);
    }
}