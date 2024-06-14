const express = require("express");
const router = express.Router();
const { getCategorias } = require("../models/categorias"); // Asegúrate de tener la función getCategorias en tu modelo

router.get("/", async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoria = await getCategoriaById(req.params.id); // Implementa esta función en tu modelo si necesitas obtener una categoría específica por ID
    res.json(categoria);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
