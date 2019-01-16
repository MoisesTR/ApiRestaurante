const jwt = require('../../services/jwt');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds    = 10;
const {mssqlErrors, matchedData, db, sql} = require('../../Utils/defaultImports')
const UserModel     =require( "../../models/User");
let User = new UserModel();

//funcion registro
exports.signUp = ( req, res ) => {
    const   userData    = matchedData(req);
    let     hashPassw   = null;
    
    bcrypt.hash(userData.Password, saltRounds)
    .then((_hashPassw) => {
        hashPassw = _hashPassw;

        console.log(userData);
        
        return User.getUserByUsernameOREmail( userData.Username, userData.Email)
    }).then((usersfind) => {
        const   users = usersfind.recordset;
        console.log(usersfind)
            //Si se encontro mas de un usuario
        if ( users.length > 1 ) {
            // console.log(usersfind.recordset[0])
            throw { status: 401, code: "UEEXIST", message: "No se registro el usuario, email y username ya se encuentran registrados!" };
            //res.status(401).json({code:"UEXIST",message:"No se registro el usuario, email o username ya registrados!"})
        } else if ( users.length === 1 ) {
            // if(usersfind[0].username == userData.username || usersfind[1].username== userData.username)
            if ( users[0].Username === userData.Username )
                throw { status: 401, code: "UEXIST", message: 'No se registro el usuario username:' + userData.username + ', ya se encuentra registrado!' };
            else
                throw { status: 401, code: "EEXIST", message: 'No se registro el usuario email:' + userData.email + ', ya se encuentra registrado!' };
        } else {
            return User.createUser({...userData, hashPassw})
        }
    }).then((result) => {
        console.log("Creado")
        res.status(200)
            .json({ 
                user: result.recordset[0] 
            })
    }).catch((err) => {
        console.error('Error principal', err)
        res.status(err.status | 500)
            .json(err)
    })
}

/**
 * @name singIn
 * @param {*} req 
 * @param {*} res 
 */
exports.singIn = ( req, res ) => {
    const   userData = matchedData(req);
    let     user =  null;

    User.getUserByUsername( userData.Username )
    .then((userResult) => {
        user = userResult.recordset[0];
        if (user) {
            const passh = user.Password;

            return  bcrypt.compare(userData.Password, passh);
        } else {
            console.log('Usuario no encontrado!');
            res.status(404)
                .json({ status: '401', code: 'NEXIST', message: 'El usuario ingresado no existe en la base de dato!' });
        }
    })
    .then((isequal) => {
        if (isequal) {
            console.log((!!userData.gettoken) ? 'Se retornara un token' : 'Se retornara la informacion del usuario');
            if (!!userData.gettoken) {
                console.log('Mande get token')
                let {_token : tokenGen, expiration} = jwt.createToken(user);
                //console.log('Devolviendo token, del usuario '+user.username);
                console.log('token:' + tokenGen);
                res.status(200).json({ token: tokenGen, expiration });
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

exports.getUsers = (req, res) => {
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
exports.updateUser = (req, res) => {
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

exports.changeStateUser = ( req, res ) => {
    let data = matchedData(req, {locations: ['body', 'params']});
    console.log(data)

    User.changeStateUser( data.IdUsuario, data.Habilitado )
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

exports.getAuthenticateUserInfo = ( req, res ) => {
    req.status(200)
        .json(req)
}

exports.refreshToken = ( req, res ) => {
    
}