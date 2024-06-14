const express = require("express");
const router = express.Router();
const {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
} = require("../models/pedidos");

router.get("/", async (req, res) => {
  try {
    const pedidos = await getPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pedido = await getPedidoById(req.params.id);
    res.json(pedido);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createPedido(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await updatePedido(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deletePedido(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
