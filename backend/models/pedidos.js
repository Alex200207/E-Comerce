const pool = require("../config/db");

const getPedidos = async () => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM pedido");
  conn.release();
  return rows;
};

const getPedidoById = async (id) => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM pedido WHERE ID_Pedido = ?", [
    id,
  ]);
  conn.release();
  return rows[0];
};

const createPedido = async (pedido) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "INSERT INTO pedido (ID_Usuario, Fecha_Pedido, Total) VALUES (?, ?, ?)",
    [pedido.ID_Usuario, pedido.Fecha_Pedido, pedido.Total]
  );
  conn.release();
  return result;
};

const updatePedido = async (id, pedido) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "UPDATE pedido SET ID_Usuario = ?, Fecha_Pedido = ?, Total = ? WHERE ID_Pedido = ?",
    [pedido.ID_Usuario, pedido.Fecha_Pedido, pedido.Total, id]
  );
  conn.release();
  return result;
};

const deletePedido = async (id) => {
  const conn = await pool.getConnection();
  const result = await conn.query("DELETE FROM pedido WHERE ID_Pedido = ?", [
    id,
  ]);
  conn.release();
  return result;
};

module.exports = {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
