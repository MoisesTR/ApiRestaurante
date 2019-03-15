use ATOMIC_RESTAURANTE;

--GO
--INSERT INTO TRABAJADOR(IdSucursal,IdCargo,Nombres,Apellidos,IdTipDoc,Documento,Imagen,FechaNacimiento,Direccion,Telefono1,Telefono2,FechaIngreso, IdPais) 
--VALUES(1,1,'Cristian','Chang',1,'00111960028E','chang.jpg','19800101','Rubenia','87792956',NULL,GETDATE(), 3)

--DECLARE @ID_TRABAJADOR INT = (SELECT TOP 1 IdTrabajador FROM TRABAJADOR ORDER BY 1 DESC)

--INSERT INTO ROL_USUARIO(NombRol,DescRol) 
--VALUES('Administrador','Acceso total al sistema')

DECLARE @ID_ROL_USUARIO INT = (SELECT TOP 1 IdRol FROM ROL_USUARIO ORDER BY 1 DESC)

INSERT INTO USUARIO(IdRol,IdTrabajador,Username,Email,Imagen,Password) 
VALUES(@ID_ROL_USUARIO,NULL,'Chang','chang@gmail.com','chang.jpg','$2a$10$z7b9HIddHmRvfD5.nY/hQuQaEthl28qBoGfMnuNNYNs.lQr5f/WfG')


