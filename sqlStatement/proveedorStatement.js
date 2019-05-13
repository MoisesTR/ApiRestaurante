exports.SELECT_PROVEEDOR =
    ` SELECT IdProveedor
                , IdPais
                , IsProvServicio
                , NombProveedor
                , Direccion
                , Email
                , Imagen
                , DescProveedor
                , NombRepresentante
                , IdTipDoc
                , Documento
                , Abreviatura
                , IsMercado
                , Habilitado
                , CreatedAt
                , UpdatedAt
                , 
        FROM    PROVEEDOR P
                INNER JOIN TELEFONOS_PROVEEDOR T
                    ON P.IdProveedor = T.IdProveedor`;