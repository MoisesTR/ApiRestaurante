const jwt = require('../../services/jwt');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds    = 10;
const {mssqlErrors, matchedData, sanitize, db, sql} = require('../../Utils/defaultImports')
const UserModel     =require( "../../models/User");
let User = new UserModel();

//funcion registro\
function signUp(req, res) {
    var userData = matchedData(req);
    var aoj = [];
    console.log('*-*-*-*-*-*-*-*-*-*-*    \tsignup \t*-*-*-*-*-*-*\n', userData)
    bcrypt.hash(userData.Password, saltRounds)
    .then((hashPassw) => {
        userData.Password = hashPassw;
        console.log('password hasseada')

        return User.getUserByUsernameOREmail( userData.Username, userData.email)
    }).then((usersfind) => {
        var users = usersfind.recordset;
        console.log(usersfind)
            //Si se encontro mas de un usuario
        if (users.length > 1) {
            // console.log(usersfind.recordset[0])
            throw { status: 401, code: "UEEXIST", message: "No se registro el usuario, email y username ya se encuentran registrados!" };
            //res.status(401).json({code:"UEXIST",message:"No se registro el usuario, email o username ya registrados!"})
        } else if (users.length == 1) {
            // if(usersfind[0].username == userData.username || usersfind[1].username== userData.username)
            if (users[0].Username == userData.Username)
                throw { status: 401, code: "UEXIST", message: 'No se registro el usuario username:' + userData.username + ', ya se encuentra registrado!' };
            else
                throw { status: 401, code: "EEXIST", message: 'No se registro el usuario email:' + userData.email + ', ya se encuentra registrado!' };
        } else {
            console.log('Creando Usuario');
            return User.createUser(userData)
        }
    }).then((result) => {
        console.log("Creado")
        res.status(200)
            .json({ 
                user: result.recordset[0] 
            })
    }).catch((err) => {
        console.error('Error principal')
        res.status(err.status | 500)
            .json(err)
    })
}
//funcion login
function singIn(req, res) {
    var userData = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'Username', sql.NVarChar(50), userData.Username);

    User.getUserByUsername( userData.Username )
    .then((userResult) => {
        var user = userResult.recordset[0];
        if (user) {
            var passh = user.Password;
            console.log('Usuario encontrado');

            let isEqual = bcrypt.compareSync(userData.Password, passh);

        } else {
            console.log('Usuario no encontrado!');
            res.status(404).json({ status: '401', code: 'NEXIST', message: 'El usuario ingresado no existe en la base de dato!' });
        }
    })
    .then((isequal) => {
        if (isequal) {
            console.log('Las contrasenas coinciden');
            console.log((userData.gettoken == true) ? 'Se retornara un token' : 'Se retornara la informacion del usuario');
            if (userData.gettoken == true) {
                console.log('Mande get token')
                let tokenGen = jwt.createToken(user);
                //console.log('Devolviendo token, del usuario '+user.username);
                console.log('token:' + tokenGen);
                res.status(200).json({ token: tokenGen });
            } else {
                //delete user.password
                res.status(200).json(user);
            }
        } else {
            console.log('Las contrasenas no coinciden');
            res.status(401)
                .json({ status: 401, code: 'EPASSW', message: 'La contraseña es incorrecta' })
        }
    })
    .catch((err) => {
        console.log('Error principal: ' + err);
        res.status( res.status | 500)
            .json(err)
    })
}

function getUsers(req, res) {
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +Habilitado);
    User.getUsers( {Habilitado} )
    .then((result) => {
        res.status(200)
            .json({
                 usuarios: result.recordset 
            });
    }).catch((error) => {
        res.status( error.status | 500)
            .json(error)
    })
}
//
function updateUser(req, res) {
    var userData = matchedData(req, { locations: ['body', 'query']});
    if (IdUsuario != req.user.sub) {
        return res.status(403)
                .json({ 
                    status: 403, 
                    code: 'EUNAUTH', 
                    message: 'Este no es tu usuario' 
                });
    }
    User.updateUser( )
    .then( result => {

        res.status(200)
            .json({ 
                status: 200, 
                code: '', 
                message: 'Usuario actualizado' 
            });
    })
    .catch( err => {

    })
}

function changeStateUser(req, res) {
    let data = matchedData(req, {locations: ['body', 'params']});
    console.log(data)

    User.changeStateUser( )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200)
            .json((afectadas > 0) ? { success: 'Usuario ' + accion + ' con exito!' } : { failed: 'No se encontro el usuario solicitado!' })
        console.log('Usuario cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(err)
        console.log('Error:', err)
    });
}
module.exports = {
    signUp,
    singIn,
    updateUser,
    getUsers,
    changeStateUser
};