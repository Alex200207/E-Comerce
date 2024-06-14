const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'alex2002',
  database: 'e-comersedb',
  port:3307,
});

module.exports = pool;
