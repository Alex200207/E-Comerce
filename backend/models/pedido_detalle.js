const pool = require("../config/db");

const getPedidoDetalles = async () => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM pedido_detalle");
  conn.release();
  return rows;
};

const getPedidoDetalleById = async (id) => {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM pedido_detalle WHERE ID_Pedido = ?",
    [id]
  );
  conn.release();
  return rows;
};

const createPedidoDetalle = async (detalle) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "INSERT INTO pedido_detalle (ID_Pedido, ID_Producto, Cantidad, Precio) VALUES (?, ?, ?, ?)",
    [detalle.ID_Pedido, detalle.ID_Producto, detalle.Cantidad, detalle.Precio]
  );
  conn.release();
  return result;
};

const updatePedidoDetalle = async (id, detalle) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "UPDATE pedido_detalle SET ID_Producto = ?, Cantidad = ?, Precio = ? WHERE ID_Pedido = ?",
    [detalle.ID_Producto, detalle.Cantidad, detalle.Precio, id]
  );
  conn.release();
  return result;
};

const deletePedidoDetalle = async (id) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "DELETE FROM pedido_detalle WHERE ID_Pedido = ?",
    [id]
  );
  conn.release();
  return result;
};

module.exports = {
  getPedidoDetalles,
  getPedidoDetalleById,
  createPedidoDetalle,
  updatePedidoDetalle,
  deletePedidoDetalle,
};
