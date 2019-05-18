exports.BASE_SELECT_TRABAJADOR =
    `SELECT T.IdTrabajador, T.IdSucursal, S.NombSucursal, T.IdCargo, C.NombCargo,
        T.Nombres, T.Apellidos, T.IdTipDoc, T.Documento, T.Imagen,
        T.FechaNacimiento, T.Direccion, T.Telefono1, T.Telefono2, T.FechaIngreso,
        T.Habilitado, U.Username,T.CreatedAt,T.UpdatedAt
        FROM dbo.TRABAJADOR T 
        INNER JOIN dbo.SUCURSAL_RESTAURANTE S ON T.IdSucursal= S.IdSucursal
        INNER JOIN dbo.CARGO_TRABAJADOR C ON T.IdCargo = C.IdCargo
        LEFT  JOIN dbo.USUARIO	U ON T.IdTrabajador = U.IdTrabajador
        `;

exports.UPDATE_IMAGE =
    `UPDATE TRABAJADOR
     SET    Imagen = @Imagen`;