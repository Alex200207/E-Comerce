const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const usuarioRoutes = require("./routes/usuarios");
const productoRoutes = require("./routes/productos");
const categoriaRoutes = require("./routes/categorias");
const pedidoRoutes = require("./routes/pedidos");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/pedidos", pedidoRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
