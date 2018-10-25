const host = 'mongodb://base-de-datos:27018/';
const dbName = 'nerdsvssicarios';

module.exports = {
    host,
    dbName,
    connection_string: host + dbName,
}

