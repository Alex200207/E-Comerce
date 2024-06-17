const mysql = require('mysql2'); // USar la libreria

// Configuracion de la base de datos
const config = mysql.createConnection({
    host: 'localhost', //127.0.0.1 
    user: 'root',
    password: 'alex2002',
    database: 'e-comersedb',
    insecureAuth: true,
    port: 3307
});

module.exports = config; // Exportar la configuracion