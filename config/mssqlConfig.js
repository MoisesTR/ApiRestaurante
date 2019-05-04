const sql = require('mssql');

const config = {
    user: 'usuario_node',
    password: 'UsAtom_2019@',
    server: 'atomicdev-chang-rest.database.windows.net',
    database: 'ATOMIC_RESTAURANTE',
    port: 1433,
    parseJSON: true,
    options: {
        trustedConnection: false
    }
}
exports.config = config;

//Ya que async retorna una promesa
exports.getConnectionPoolGlobal = async () => {
    if ( !global.poolGlobal ){
        console.log('Creando new Pool');
        const poolObt = await new sql.ConnectionPool(config);
        global.poolGlobal = await poolObt.connect();
    }      

    return global.poolGlobal;
}