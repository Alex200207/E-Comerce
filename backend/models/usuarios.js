const pool = require("../config/db");

const getUsuarios = async () => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM usuario");
  conn.release();
  return rows;
};

const getUsuarioById = async (id) => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM usuario WHERE ID_Usuario = ?", [
    id,
  ]);
  conn.release();
  return rows[0];
};

const createUsuario = async (usuario) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "INSERT INTO usuario (Nombre, Email, Clave) VALUES (?, ?, ?)",
    [usuario.Nombre, usuario.Email, usuario.Clave]
  );
  conn.release();
  return result;
};

const updateUsuario = async (id, usuario) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    "UPDATE usuario SET Nombre = ?, Email = ?, Clave = ? WHERE ID_Usuario = ?",
    [usuario.Nombre, usuario.Email, usuario.Clave, id]
  );
  conn.release();
  return result;
};

const deleteUsuario = async (id) => {
  const conn = await pool.getConnection();
  const result = await conn.query("DELETE FROM usuario WHERE ID_Usuario = ?", [
    id,
  ]);
  conn.release();
  return result;
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
