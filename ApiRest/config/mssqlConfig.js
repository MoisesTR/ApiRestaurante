var sql = require('mssql')

const config = {
    user: 'usuario_node',
    password: 'node123',
    server: 'localhost',
    database: 'ATOMIC_RESTAURANTE',
    port: '1433',
    parseJSON: true,
    options: {
        trustedConnection: false
    }
}
function getConnectionPoolGlobal(){
    async function conect(resolve,reject){
        if ( !!global.poolGlobal ){
            console.log('Reutilizando pool ',global.poolGlobal._eventsCount)
            resolve(global.poolGlobal)
        }
        else {
            try {
                const poolObt = new sql.ConnectionPool(config).connect()
                global.poolGlobal = poolObt
                resolve(global.poolGlobal)
                console.log('Nuevo pool Creado')
            } catch( _err ) {
                reject(_err)
            }
        }      
    }
    return new Promise(conect)
}
module.exports = {
    config,
    getConnectionPoolGlobal
}