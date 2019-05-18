exports.BASE_SELECT_USER =
    `SELECT * FROM dbo.USUARIO`;


exports.BASE_REFRESH_TK =
    `SELECT RefreshT, IdUsuario, UserAgent, CreatedAt FROM dbo.REFRESH_TOKEN_USER`;

exports.BASE_UPDATE_RT =
    `UPDATE dbo.REFRESH_TOKEN_USER SET Habilitado = 0 WHERE IdUsuario`;

exports.BASE_DELETE_RT =
    `DELETE FROM dbo.REFRESH_TOKEN_USER`;

exports.GET_USER_BY_ID = `
SELECT  IdRol
, IdTrabajador
, Username
, Email
, Imagen
, Password
, Habilitado
, CreatedAt
, UpdatedAt
FROM USUARIO`;

exports.UPDATE_IMAGE_USER = `UPDATE USUARIO SET Imagen = @Imagen`;