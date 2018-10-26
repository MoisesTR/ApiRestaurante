const db = require('../services/database');
const sql = require('mssql');

class MenuModel {
    
    constructor() {
        this.aoj = [];
    }

    async createMenu( menuData ) {
        this.aoj = [];
        db.pushOutParam(aoj, 'IdMenu',          sql.Int);
        db.pushAOJParam(aoj, 'IdPadre',         sql.Int,            menuData.IdPadre);
        db.pushAOJParam(aoj, 'NombreM',         sql.NVarChar(50),   menuData.NombreM);
        db.pushAOJParam(aoj, 'DescripcionM',    sql.NVarChar(150),  menuData.DescripcionM);
        db.pushAOJParam(aoj, 'NOrden',          sql.Int,            menuData.NOrden);
        return  db.storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    async updateMenu( menuData ) {
        this.aoj = [];
        
        db.pushOutParam(aoj, 'IdMenu',          sql.Int,            menuData.IdMenu);
        db.pushAOJParam(aoj, 'IdPadre',         sql.Int,            menuData.IdPadre);
        db.pushAOJParam(aoj, 'NombreM',         sql.NVarChar(50),   menuData.NombreM);
        db.pushAOJParam(aoj, 'DescripcionM',    sql.NVarChar(150),  menuData.DescripcionM);
        db.pushAOJParam(aoj, 'NOrden',          sql.Int,            menuData.NOrden);
        return  db.storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    async getMenuesByRol( IdRol ) {
        this.aoj = [];
        
        db.pushAOJParam(aoj,    'IdRol',        sql.Int,    IdRol);
        return  db.storedProcExecute('USP_GET_MENUES', aoj)
    }
}

module.exports = MenuModel;