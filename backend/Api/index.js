// Crear un servidor con express
const express = require("express");

// Incluir el middleware CORS
const cors = require("cors");

// Incluir el middleware Body Parser (para procesar peticiones POST)
const bodyParser = require("body-parser");

// Incluir la configuración de conexión a MySQL
const config = require("./config");

// Crear una instancia de Express
const app = express();

// Usar el middleware CORS y el middleware Body Parser
app.use(cors());
app.use(bodyParser.json());

// Usar el puerto 3000
const port = 3000;

// Crear una ruta por defecto
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Crear una ruta para obtener todos los proyectos
app.get("/producto", (req, res) => {
  // Realizar la consulta a la base de datos
  config.query("SELECT * FROM producto", (err, filas) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los productos");
    } else {
      res.json(filas);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Ruta para obtener todas las categorías
app.get("/categorias", (req, res) => {
  config.query("SELECT * FROM categoria", (err, categorias) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener las categorías");
    } else {
      res.json(categorias);
    }
  });
});
