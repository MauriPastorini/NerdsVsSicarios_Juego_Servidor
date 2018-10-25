const host = 'mongodb://localhost:27017/';
const dbName = 'nerdsvssicarios';

module.exports = {
    host,
    dbName,
    connection_string: host + dbName,
}

