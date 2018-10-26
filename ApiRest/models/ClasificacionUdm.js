const baseSelect    = `SELECT	CLASI.IdCategoria
, CLASI.IdClasificacion
, CLASI.NombreClasificacion
, CLASI.DescripcionClasificacion
, CLASI.Habilitado 
, CATE.NombCategoria
FROM	dbo.CLASIFICACION_PRODUCTO CLASI
INNER JOIN dbo.CATEGORIA_PRODUCTO CATE
ON		CLASI.IdCategoria = CATE.IdCategoria`;

class ClasificacionUdmModel {
    constructor() {
        this.baseSelect =   `SELECT IdClasifUDM, NombClasificacion, DescClasificacion, Habilitado, CreatedAt, UpdatedAt 
        FROM CLASIFICACION_UNIDAD_MEDIDA`;
        this.aoj    = [];
    }
    async getClasificaciones( {Habilitado} = {}){
        this.aoj = [];
        db.pushAOJParam(aoj,'Habilitado',   sql.Int,    +Habilitado)
        return db.queryExecute( this.baseSelect + filter,aoj)
    }
    
    async getClasificacion( IdClasifUDM ){
        this.aoj=[];
        db.pushAOJParam(aoj,'IdClasifUDM',  sql.Int,    IdClasifUDM)
        return db.query( this.baseSelect + filter,aoj)
    }
}

module.exports = ClasificacionUdmModel;