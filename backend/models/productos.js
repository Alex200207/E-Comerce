const pool = require("../config/db");

const getProductos = async () => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM producto");
  conn.release();
  return rows;
};

const getProductoById = async (id) => {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM producto WHERE ID_Producto = ?",
    [id]
  );
  conn.release();
  return rows[0];
};

const createProducto = async (producto) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "INSERT INTO producto (Nombre, Descripcion, Precio, ID_Categoria, Stock) VALUES (?, ?, ?, ?, ?)",
    [
      producto.Nombre,
      producto.Descripcion,
      producto.Precio,
      producto.ID_Categoria,
      producto.Stock,
    ]
  );
  conn.release();
  return result;
};

const updateProducto = async (id, producto) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "UPDATE producto SET Nombre = ?, Descripcion = ?, Precio = ?, ID_Categoria = ?, Stock = ? WHERE ID_Producto = ?",
    [
      producto.Nombre,
      producto.Descripcion,
      producto.Precio,
      producto.ID_Categoria,
      producto.Stock,
      id,
    ]
  );
  conn.release();
  return result;
};

const deleteProducto = async (id) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "DELETE FROM producto WHERE ID_Producto = ?",
    [id]
  );
  conn.release();
  return result;
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
