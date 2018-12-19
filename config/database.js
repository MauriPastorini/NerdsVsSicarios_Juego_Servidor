const host = process.env.DBHOST || 'mongodb://base-de-datos:27018/';
const dbName = 'admin';

module.exports = {
    host,
    dbName,
    connection_string: host,
}

