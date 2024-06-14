const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../models/usuarios");

router.get("/", async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    res.json(usuario);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createUsuario(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await updateUsuario(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUsuario(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
