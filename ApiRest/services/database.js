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

exports.pushAOJOuput    = function pushAOJOuput(aoj, name, type ) {
    pushAOJ(aoj, 0, name, type);
};

exports.addMssqlParam   = function( filterVar, param ) {
    filterVar += ' AND ' + param  + ' = @' + param;
};

exports.addLikeParam    = function( param ) {
    return      ' AND ' + param  + ' LIKE \'%\'+@' + param + '+\'%\'';
};

function storedProcExecuteServer(spName, parametersJsonArray) {
    return conSql.getConnectionPoolGlobalServer()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request()
        for (var i = 0; i < parametersJsonArray.length; i++) {
            if(parametersJsonArray[i].pClasf == 1)
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            else
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
        }
       // console.dir(request.parameters)
        return request.execute(spName);			
    }).catch(function(err) {
        //console.log("Connection Error: " + err);
        throw err;
    })
}

function storedProcExecute(spName, parametersJsonArray) {
    console.log('storedProcExec')
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request()
        const tam = parametersJsonArray.length;
        for (var i = 0; i < tam; i++) {
            if(parametersJsonArray[i].pClasf == 1) {
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            } else {
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
            }
        }
        // console.dir(request)
        return request.execute(spName);			
    }).catch(function(err) {
        throw err
    })
}
function queryExecute(query, parametersJsonArray) {
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request();
        const tam = parametersJsonArray.length;
        for (var i = 0; i < tam; i++) {
            if(parametersJsonArray[i].pClasf == 1) {
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            } else {
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
                }
        }
        return request.query(query);			
    }).catch(function(err) {
        console.log("Connection Error: " + err);
        throw err
    })
}