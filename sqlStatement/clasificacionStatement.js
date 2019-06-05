exports.BASE_SELECT = `SELECT 
                        CLA.IdClasificacion
                        , CLA.IdCategoria
                        , CLA.NombClasificacion
                        , CLA.DescClasificacion
                        , CLA.Habilitado
                        , CLA.CreatedAt
                        , CLA.UpdatedAt 
                        , CAT.NombCategoria
                        FROM CLASIFICACION_PRODUCTO CLA 
                        INNER JOIN dbo.CATEGORIA_PRODUCTO CAT 
                        ON CLA.IdCategoria = CAT.IdCategoria`;
