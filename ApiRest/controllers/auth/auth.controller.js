const jwt = require('../../services/jwt');
const bcrypt = require('bcryptjs');
const saltRounds    = 10;
const {mssqlErrors, matchedData} = require('../../Utils/defaultImports')
const randomstring = require('randomstring');
const UserModel     =require( "../../models/User");

//funcion registro
exports.signUp = async ( req, res ) => {
    const   userData    = matchedData(req);
    try {
        const hassPassw = await bcrypt.hash(userData.Password, saltRounds);
        userData.Password = hassPassw;
        const users = await UserModel.getUserByUsernameOrEmail( userData.Username, userData.Email);
        //Si se encontro mas de un usuario
        if ( users.length > 1 ) {
            // console.log(usersfind.recordset[0])
            throw { status: 401, code: "UEEXIST", message: "No se registro el usuario, email y username ya se encuentran registrados!" };
        } else if ( users.length === 1 ) {
            // if(usersfind[0].username == userData.username || usersfind[1].username== userData.username)
            if ( users[0].Username === userData.Username )
                throw { status: 401, code: "UEXIST", message: 'El usuario:' + userData.Username + ', ya se encuentra registrado!' };
            else
                throw { status: 401, code: "EEXIST", message: 'No se registro el usuario con email:' + userData.Email + ', ya se encuentra registrado!' };
        } else {
            const User = new UserModel();
            const userResult = await User.createUser({...userData})
            
            res.status(201)
                .json({ 
                    success: 'Success the user are register!' 
                });
        }
    } catch( _err ) {
        res.status(_err.status || 500)
            .json(mssqlErrors(_err))
    }
}

/**
 * @name signIn
 * @param {*} req 
 * @param {*} res 
 */
exports.signIn = async ( req, res ) => {
    const   userData = matchedData(req);
    
    try {
        const   user = await UserModel.getUserByUsername( userData.Username )
        if (user) {
            const passh = user.Password;
            const isequal =  await bcrypt.compare(userData.Password, passh);
            
            if (isequal) {
                console.log((!!userData.gettoken) ? 'Se retornara un token' : 'Se retornara la informacion del usuario');
                if (!!userData.gettoken) {
                    const {_token : tokenGen, expiration} = jwt.createToken(user);

                    const User = new UserModel(user);
                    const refreshT   = randomstring.generate(15) + new Date().getTime();
                    const respInsert = await User.insertRefreshT(refreshT, req.headers['user-agent'])
                    res.status(200)
                        .json({ token: tokenGen, expiration, refreshT });
                } else {
                    res.status(200)
                        .json(user);
                }
            } else {
                console.log('Las contrasenas no coinciden');
                throw { 
                    status: 401, code: 'EPASSW', 
                    message: 'La contraseña es incorrecta' 
                };  
            }
        } else {
            console.log('Usuario no encontrado!');
            throw { 
                    status: 401, code: 'NEXIST', 
                    message: 'El usuario ingresado no existe en la base de dato!' 
                };
        }
    } catch( _err ) {
        console.log('Error principal: ', _err);
        res.status( _err.status || 500)
            .json(_err)
    }
}

exports.getUsers = (req, res) => {
    const Habilitado = req.query.Habilitado;
    
    UserModel.getUsers( {Habilitado} )
    .then( result => {
        res.status(200)
            .json({
                 usuarios: result 
            });
    }).catch((error) => {
        res.status( error.status | 500)
            .json(error)
    })
}
//
exports.updateUser = (req, res) => {
    const userData = matchedData(req, { locations: ['body', 'query']});
    if (IdUsuario != req.user.sub) {
        return res.status(403)
                .json({ 
                    status: 403, 
                    code: 'EUNAUTH', 
                    message: 'Este no es tu usuario' 
                });
    }
    User.updateUser( userData )
    .then( result => {

        res.status(200)
            .json({ 
                status: 200, 
                message: 'Usuario actualizado' 
            });
    })
    .catch( err => {
        res.status(err.status || 500)
            .json(mssqlErrors(err))
    })
}

exports.changeStateUser = ( req, res ) => {
    const data = matchedData(req, {locations: ['body', 'params']});

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
    console.log(req.headers);
    
    res.status(200)
        .json(req.headers)
}

exports.refreshToken = async ( req, res ) => {
    const {refreshToken, userName} = matchedData(req, {locations: ['body']});

    try {
        const user = await UserModel.getUsers({ secretToken: refreshToken, userName})
        console.log('users', req.user);
        
        if ( !user ) {
            throw {
                status:401, code:'DTOKEN', 
                message:'The refresh token is not valid.'
            }
        }
        if( user._id.toString() !== req.user._id.toString() ) {
            throw {
                status: 401, code:'ITOKEN',
                message: 'The sent token does not belong to your user.',
            }
        }
        if ( user.enabled == 0 ) {
           throw {
                    status:403, code:'UDESH',   
                    message:'Tu usuario se encuentra deshabilitado!'
                };
        }
        const {_token : tokenGen, expiration} = await jwt.createToken(user);
            res.status(200)
            .json({ 
                token: tokenGen, 
                refreshToken, 
                expiration 
            });
        saveLog(user._id, {userName: user.userName},`${userName} refresh token.`)                   
    } catch( _err ) {
        next( _err );
    }
}