// mysql DB
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     database : 'node_complete',
//     user : 'root',
//     password : ''
// });

// module.exports = pool.promise();


// sequelize DB

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;