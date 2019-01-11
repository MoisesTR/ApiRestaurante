'use strict'
const jwt       = require('jsonwebtoken');
const moment    = require('moment');
const secret    = "R3st@urAn3_C4aN";
const UserModel = require('../models/User');
const User      = new UserModel();

/**
 * @name createToken
 * @description Esta funcion recibe un usuario, para la creacion de un token personalizado
 * @param {Object} user
 */
exports.createToken = ( user )  => {
    let     _token  ='';
    const   payload = {
        sub:        user.IdUsuario,
        Username:   user.Username,
        Email:      user.Email,
        // IdTrabajador:   user.IdTrabajador,
        iar:    moment().unix(), /* Fecha de creacion */
        exp:    moment().add(5,"minutes").unix() /* Token expira en un dia */
    };
    //jsonwebtoken agrega el campo iat por defecto
    //Generated jwts will include an iat (issued at) claim by default unless noTimestamp is specified. 
    //If iat is inserted in the payload, it will be used instead of the real timestamp for calculating other things like exp given a timespan in options.expiresIn.
    //En este caso la fecha de expiracion la calculamos con moment
    console.log('Creando payload')
    _token  = jwt.sign(payload,secret);
    return { _token, expiration: payload.exp}
}

function verifyToken( token ) {
    return new Promise( ( resolve, reject ) => {
        jwt.verify( token, secret, (err, decoded) => {
            if( !!err ) {
                if ( err.name === 'TokenExpiredError' ) {
                    decoded     = jwt.decode(token, {complete: true});
                    decoded.payload.isExpired   = true;
                    resolve(decoded);
                } else {
                    console.error('Error, token invalido')
                    err.code    = 'EITOKEN';
                    reject({
                        ...{code, name, message } = err ,
                        status: 401
                    });
                }
            } else {
                resolve(decoded);
            }
        })
    })
}

exports.containToken = ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        return res.status(401)
                .json({
                    status: 401,
                    code:   'NAUTH',
                    message:'La peticion no tiene cabecera de autenticaciòn'
                });
    }
    next();
}

/**
 * @name ensureAuth
 * @description Utilizar siempre precedida de containToken
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 * @param {Middleware} next 
 */
exports.ensureAuth = ( req, res, next ) => {
    let token   = req.headers.authorization.replace(/['"]+/g,'');
    const {addOtherUInfo}   =   'true' === req.query.addOtherUInfo;

    console.log('Comprobando validez del token', req.query);
    verifyToken( token )
    .then( _decoded => {
        //A continuacion procedemos a buscar el usuario para validar que se encuentre habilitado
        return User.getUserByUsername( _decoded.Username )
    })
    .then( userResult => {
        //en caso de encontrarlo refrescaremos su informacion por si ha habido un cambio
        console.log('Busqueda de usuarios realizada');
        //Resultado del procedimiento
        let user = userResult.recordset[0];
        //Si encontramos el usuario
        if ( !!user ) {
            console.log('Se encontro el usuario');
            if ( user.habilitado == false ) {
                //si el usuario se encuentra deshabilitado
                return res.status(401)
                        .json({status:401,code:'EPUSER',message:'Usuario deshabilitado,favor contactar con soporte Casa Cross'});
            } 
            //Si el usuario esta habilitado se procede a actualizar el username y el email
            //por si ha habido un cambio en estos
            //Verificamos que no ah habido cambio en la informacion del usuario, desde la creacion del token
            if( moment(user.update_at).unix() > decoded.iat ){
                // si su info cambio no lo dejamos procedere
                return res.status(401)
                        .json({
                                status: 401, code:'EUCHAN',
                                message: 'La informacion del usuario cambio por favor vuelve a iniciar sesion!'
                            });
            }
            //setear el valor del payload en la request, para poder acceder a esta informacion
            //en todas la funciones de nuestros controladores
            req.user    = decoded;
            if ( !keepUserPass ) {
                delete user.Password;
            }
            if ( addOtherUInfo ) {
                req.user    = {...req.user, ...user };
            }
            next(); //next para pasar al siguiente controlador
        } else {
            return res.status(404)
                    .json({
                        status: 404, code:'EPUSER',
                        message:'Usuario no encontrado, favor contactar con soporte Casa Cross'
                    });
        }
    })
    .catch( error => {
        res.status(error.status | 500)
            .json(error)
    })
}