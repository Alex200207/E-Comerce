import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

interface Product {
  id: number;
  id_usuario: number;
  id_producto: number;
  Cantidad: number;
  fecha_agregado: Date;
  name: string;
  precio?: number; 
}

const ShoppingCartModal: React.FC = () => {
  const [carrito, setCarrito] = useState<Product[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const response = await fetch("/api/carrito");
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }
      const data = await response.json();
      setCarrito(data);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = async (id: number) => {
    try {
      const response = await fetch(`/api/carrito/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el producto del carrito");
      }
      await fetchCarrito();
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const handleQuantityChange = async (id: number, cantidad: number) => {
    try {
      const response = await fetch(`/api/carrito/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad }),
      });
      if (!response.ok) {
        throw new Error(
          "Error al actualizar la cantidad del producto en el carrito"
        );
      }
      // Actualizar el carrito después de cambiar la cantidad
      await fetchCarrito();
    } catch (error) {
      console.error(
        "Error al actualizar la cantidad del producto en el carrito:",
        error
      );
    }
  };

  const getTotalPrice = () => {
    return carrito.reduce(
      (total, item) => total + (item.precio || 0) * item.Cantidad,
      0
    );
  };

  return (
    <>
      <Button className="btn_Shop" onClick={handleShow}>
        <FaShoppingCart className="icon__shop" />
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>
                          ${product.precio ? product.precio.toFixed(2) : "N/A"}
                        </td>
                        <td>
                          <input
                            type="number"
                            value={product.Cantidad}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                            min="1"
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemove(product.id)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;
