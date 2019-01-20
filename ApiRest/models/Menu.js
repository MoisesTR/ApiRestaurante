const { sql, pushAOJParam, pushAOJOuput, storedProcExecute } = require('../Utils/defaultImports')

class MenuModel {
    
    static createMenu( menuData ) {
        const aoj = [];
        
        pushAOJOuput(aoj, 'IdMenu',         sql.Int);
        pushAOJParam(aoj, 'IdPadre',        sql.Int,            menuData.IdPadre);
        pushAOJParam(aoj, 'NombMenu',       sql.NVarChar(50),   menuData.NombMenu);
        pushAOJParam(aoj, 'DescMenu',       sql.NVarChar(150),  menuData.DescMenu);
        pushAOJParam(aoj, 'NOrden',         sql.Int,            menuData.NOrden);
        return  storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    static updateMenu( menuData ) {
        const aoj = [];
        
        pushAOJOuput(aoj, 'IdMenu',         sql.Int,            menuData.IdMenu);
        pushAOJParam(aoj, 'IdPadre',        sql.Int,            menuData.IdPadre);
        pushAOJParam(aoj, 'NombMenu',       sql.NVarChar(50),   menuData.NombMenu);
        pushAOJParam(aoj, 'DescMenu',       sql.NVarChar(150),  menuData.DescMenu);
        pushAOJParam(aoj, 'NOrden',         sql.Int,            menuData.NOrden);
        return  storedProcExecute('dbo.USP_INSERT_MENU', aoj)
    }
    
    static getMenuesByRol( IdRol ) {
        const aoj = [];
        
        pushAOJParam(aoj,    'IdRol',        sql.Int,    IdRol);
        return  storedProcExecute('USP_GET_MENUES', aoj)
    }
}

module.exports = MenuModel;