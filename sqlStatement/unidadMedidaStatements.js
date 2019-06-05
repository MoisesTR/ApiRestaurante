exports.BASE_SELECT = `SELECT 
UNI.IdUnidadMedida
, UNI.IdClasifUDM
, UNI.IdUDMBase
, UNI.NombUnidad
, UNI.Simbolo
, UNI.FactorConversion
, UNI.Habilitado
, UNI.CreatedAt
, UNI.UpdatedAt
, CLA.NombClasificacion 
FROM UNIDAD_MEDIDA UNI
    INNER JOIN CLASIFICACION_UNIDAD_MEDIDA CLA
        ON UNI.IdClasifUDM = CLA.IdClasifUDM`;
