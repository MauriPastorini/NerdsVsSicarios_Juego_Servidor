https://stackoverflow.com/questions/41615574/mongodb-server-has-startup-warnings-access-control-is-not-enabled-for-the-dat/42926515#42926515

// use admin
// db.createUser(
//   {
//     user: "mybetouseradmin",
//     pwd: "f9a3015fcc7a47a4bb9b79dfd03d3f01",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//   }
// )

// mongo --port 27018 -u "mybetouseradmin" -p "f9a3015fcc7a47a4bb9b79dfd03d3f01" --authenticationDatabase "admin"

// use nerdsvssicarios
// db.createUser(
//   {
//     user: "betoyartuadmins",
//     pwd: "f9a3015fcc7a47a4bb9b79dfd03d3f08",
//     roles: [ { role: "readWrite", db: "nerdsvssicarios" },
//              { role: "read", db: "reporting" } ]
//   }
// )