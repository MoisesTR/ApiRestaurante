const conSql = require('../config/mssqlConfig');


/**
 * @name    pushAOJ
 * @param {Array} aoj Array de Parametros
 * @param {*} mode 
 * @param {String} name 
 * @param {*} type 
 * @param {Object} value 
 */
function pushAOJ(aoj, mode, name,type, value) {
    aoj[aoj.length] = {
        pMode: mode,
		pName: name,
		pType: type,
		pData: value
	};
};

exports.pushAOJParam    = function pushAOJParam(aoj, name, type, value) {
	pushAOJ(aoj, 1, name, type, value);
};

exports.pushAOJOuput    = ( aoj, name, type ) => {
    pushAOJ(aoj, 0, name, type);
};

exports.addMssqlParam   = ( filterVar, param ) => {
    return filterVar + ` AND ${param}   = @${param}`;
};

exports.addLikeParam    = function( param ) {
    return      ' AND ' + param  + ' LIKE \'%\'+@' + param + '+\'%\'';
};

/**
 * @name    addInputOrOutputParam
 * @param {Request} request 
 * @param {Object} parametersJsonArray 
 */
function addInputOrOutputParam( request, parametersJson ) {
    if  (   parametersJson.pMode == 1   ){
        request.input(
            parametersJson['pName'],
            eval(parametersJson['pType']),
            parametersJson['pData']);
    }   else    {
        request.output(
            parametersJson['pName'],
            eval(parametersJson['pType'])
        );
    }
};

/**
 * @name storedProcExecute
 * @param {String} spName 
 * @param {Array} parametersJsonArray 
 * @param {Object} config 
 * @param {Connection} userConn 
 */
async function executeStoredProc( spName, parametersJsonArray, config, userConn ) {
    let     isConnSupplied  = !!userConn;
    let     conn            =  ( isConnSupplied ) ? userConn : undefined;
    if  ( isConnSupplied ) {
        return execSP(conn, spName, parametersJsonArray)
    }
    try { 
        const pool = await conSql.getConnectionPoolGlobal();
        pool.on('error', (error) => {
            throw error;
        })
        
        return execSP(pool, spName, parametersJsonArray);			
    } catch( _err ) {
        return Promise.reject( _err )
    }
};

exports.executeStoredProc = executeStoredProc;

/**
 * @name execSP
 * @param {sql.ConnectionPool} conn Este parametro puede ser una Connection mssql o un Transaction
 * @param {String} spName Nombre del Procedimiento
 * @param {Array} parametersJsonArray 
 */
function execSP(conn, spName, parametersJsonArray) {
    let request  = conn.request();
    for (var i = 0; i < parametersJsonArray.length; i++) {
        addInputOrOutputParam(request, parametersJsonArray[i]);
    }
    return request.execute(spName)
};

async function executeQueryByConfig(queryString, parametersJsonArray, config, connection) {
    if ( parametersJsonArray == null || parametersJsonArray == undefined ) {
        throw   new Error('Arreglo de parametros indefinido.');
    }
    if ( (config == undefined) && (connection == undefined ) )  {
        throw   new Error('Debes definir una configuracion o coneccion a utilizar.');
    }
    let isConnSupplied  = (connection != undefined);

    if  ( isConnSupplied ) {
        return execQuery(queryString, parametersJsonArray, connection);
    }
    try {
        const pool = await conSql.getConnectionPoolGlobal()
        
        console.log('Conecto');
        return execQuery(queryString, parametersJsonArray, pool);
    } catch( _err ) {
        console.error("Connection Error: " + _err);
        return Promise.reject( _err )
    }
};
exports.executeQueryByConfig    = executeQueryByConfig;

/**
 * @name executeStoredProcServer
 * @description Ejecutar Procedimiento Almacenado en el servidor
 * @returns {Promise} Promise con resultado del Procedimiento
 * @param {String} spName Nombre del Procedimiento Almacenado
 * @param {Array} parametersJsonArray
 */
exports.storedProcExecute = (spName, parametersJsonArray) => {
    return executeStoredProc(spName, parametersJsonArray, conSql.config);
};

exports.queryExecute = (queryString, parametersJsonArray) => {
    return  executeQueryByConfig(queryString, parametersJsonArray, conSql.config);
};

function execQuery( query, parametersJsonArray, conn ) {
    let request  = conn.request();
    for (var i = 0; i < parametersJsonArray.length; i++) {
        addInputOrOutputParam(request, parametersJsonArray[i]);
    }
    console.log('\r\nExecuting '+query);
    return request.query( query );			
}

exports.bulkInsert  = ( table, conn ) => {
    return conn.request()
        .bulk( table );
};