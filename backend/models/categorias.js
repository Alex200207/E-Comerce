const pool = require("../config/db");

const getCategorias = async () => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM categoria");
  conn.release();
  return rows;
};

const getCategoriaById = async (id) => {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM categoria WHERE ID_Categoria = ?",
    [id]
  );
  conn.release();
  return rows[0];
};

const createCategoria = async (categoria) => {
  const conn = await pool.getConnection();
  const result = await conn.query("INSERT INTO categoria (Nombre) VALUES (?)", [
    categoria.Nombre,
  ]);
  conn.release();
  return result;
};

const updateCategoria = async (id, categoria) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "UPDATE categoria SET Nombre = ? WHERE ID_Categoria = ?",
    [categoria.Nombre, id]
  );
  conn.release();
  return result;
};

const deleteCategoria = async (id) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "DELETE FROM categoria WHERE ID_Categoria = ?",
    [id]
  );
  conn.release();
  return result;
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
