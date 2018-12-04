const { sql, pushAOJParam, pushOutParam, storedProcExecute } = require('../Utils/defaultImports')

class MenuModel {
    
    constructor() {
        this.aoj = [];
    }

    async createMenu( menuData ) {
        this.aoj = [];
        
        pushOutParam(aoj, 'IdMenu',          sql.Int);
        pushAOJParam(aoj, 'IdPadre',         sql.Int,            menuData.IdPadre);
        pushAOJParam(aoj, 'NombreM',         sql.NVarChar(50),   menuData.NombreM);
        pushAOJParam(aoj, 'DescripcionM',    sql.NVarChar(150),  menuData.DescripcionM);
        pushAOJParam(aoj, 'NOrden',          sql.Int,            menuData.NOrden);
        return  storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    async updateMenu( menuData ) {
        this.aoj = [];
        
        pushOutParam(aoj, 'IdMenu',          sql.Int,            menuData.IdMenu);
        pushAOJParam(aoj, 'IdPadre',         sql.Int,            menuData.IdPadre);
        pushAOJParam(aoj, 'NombreM',         sql.NVarChar(50),   menuData.NombreM);
        pushAOJParam(aoj, 'DescripcionM',    sql.NVarChar(150),  menuData.DescripcionM);
        pushAOJParam(aoj, 'NOrden',          sql.Int,            menuData.NOrden);
        return  storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    async getMenuesByRol( IdRol ) {
        this.aoj = [];
        
        pushAOJParam(aoj,    'IdRol',        sql.Int,    IdRol);
        return  storedProcExecute('USP_GET_MENUES', aoj)
    }
}

module.exports = MenuModel;