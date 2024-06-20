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

// CRUD para Productos
app.get("/productos", (req, res) => {
  config.query("SELECT * FROM producto", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los productos");
    } else {
      res.status(200).json(result);
    }
  });
});
app.put("/producto/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion, Precio, ID_Categoria, Stock } = req.body;
  if (!Nombre || !Descripcion || !Precio || !ID_Categoria || !Stock) {
    return res.status(400).send("Todos los campos son obligatorios");
  }
  const query =
    "UPDATE producto SET Nombre = ?, Descripcion = ?, Precio = ?, ID_Categoria = ?, Stock = ? WHERE ID_Producto = ?";
  config.query(
    query,
    [Nombre, Descripcion, Precio, ID_Categoria, Stock, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al actualizar el producto");
      } else {
        res.status(200).send("Producto actualizado correctamente");
      }
    }
  );
});

app.delete("/producto/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM producto WHERE ID_Producto = ?";
  config.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el producto");
    } else {
      res.status(200).send("Producto eliminado correctamente");
    }
  });
});

app.post("/producto", (req, res) => {
  const { Nombre, Descripcion, Precio, ID_Categoria, Stock } = req.body;
  if (!Nombre || !Descripcion || !Precio || !ID_Categoria || !Stock) {
    return res.status(400).send("Todos los campos son obligatorios");
  }
  const query =
    "INSERT INTO producto (Nombre, Descripcion, Precio, ID_Categoria, Stock) VALUES (?, ?, ?, ?, ?)";
  config.query(
    query,
    [Nombre, Descripcion, Precio, ID_Categoria, Stock],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar el producto");
      } else {
        res.status(201).send("Producto insertado correctamente");
      }
    }
  );
});

// CRUD para Categorías
app.get("/categorias", (req, res) => {
  config.query("SELECT * FROM categoria", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener las categorías");
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/categoria", (req, res) => {
  const { Nombre } = req.body;
  if (!Nombre) {
    return res.status(400).send("El nombre de la categoría es obligatorio");
  }
  const query = "INSERT INTO categoria (Nombre) VALUES (?)";
  config.query(query, [Nombre], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al agregar la categoría");
    } else {
      res.status(201).send("Categoría agregada correctamente");
    }
  });
});

app.put("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre } = req.body;
  if (!Nombre) {
    return res.status(400).send("El nombre de la categoría es obligatorio");
  }
  const query = "UPDATE categoria SET Nombre = ? WHERE ID_Categoria = ?";
  config.query(query, [Nombre, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al actualizar la categoría");
    } else {
      res.status(200).send("Categoría actualizada correctamente");
    }
  });
});

app.delete("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM categoria WHERE ID_Categoria = ?";
  config.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar la categoría");
    } else {
      res.status(200).send("Categoría eliminada correctamente");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
