const express = require("express");
const router = express.Router();
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../models/productos");

router.get("/", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await getProductoById(req.params.id);
    res.json(producto);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createProducto(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await updateProducto(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteProducto(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
