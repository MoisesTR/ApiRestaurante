const sql = require('mssql');

const config = {
    user: 'usuario_node',
    password: process.env.DB_PASSWORD ,
    server: process.env.DB_URL ,
    database: 'ATOMIC_RESTAURANTE',
    port: 1433,
    parseJSON: true,
    options: {
        encrypt: true,
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