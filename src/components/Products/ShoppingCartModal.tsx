import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

interface Cart {
  id: number;
  id_producto: number;
  cantidad: number;
}
interface Producto {
  ID_Producto: number;
  Nombre: string;
  Precio: number;
}

const ShoppingCartModal: React.FC = () => {
  const [carrito, setCarrito] = useState<Cart[]>([]);
  const [show, setShow] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetchCarrito();
    fetchProductos();
  }, []);

  const fetchCarrito = async () => {
    try {
      const response = await fetch("/api/carrito");
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }
      const data = await response.json();
      console.log("Datos del carrito:", data); // Añadir esta línea para depuración
      setCarrito(data);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = async (id: number) => {
    if (window.confirm("Seguro queres elminar esto del carrito de compras?")) {
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
      await fetchCarrito();
    } catch (error) {
      console.error(
        "Error al actualizar la cantidad del producto en el carrito:",
        error
      );
    }
  };

  const fetchProductos = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data: Producto[]) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
        alert("Error al cargar las categorías");
      });
  };

  const getNombreProducto = (idProducto: number): string => {
    const producto = productos.find((cat) => cat.ID_Producto === idProducto);
    return producto ? producto.Nombre : "Sin Nombre";
  };
  const getPrecioProducto = (idProducto: number): number => {
    const producto = productos.find((cat) => cat.ID_Producto === idProducto);
    return producto ? producto.Precio : 0;
  };

  const getTotalPrice = () => {
    return carrito.reduce(
      (total, Precio) => total + getPrecioProducto(Precio.id_producto || 0) * Precio.cantidad,
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
                    {carrito.length > 0 ? (
                      carrito.map((cart) => (
                        <tr key={cart.id}>
                          <td>{getNombreProducto(cart.id_producto)}</td>
                          <td>${getPrecioProducto(cart.id_producto)}</td>
                          <td>
                            <input
                              type="number"
                              value={cart.cantidad}
                              onChange={(e) =>
                                handleQuantityChange(
                                  cart.id,
                                  parseInt(e.target.value)
                                )
                              }
                              min="1"
                            />
                          </td>
                          <td>
                            <Button
                              onClick={() => handleRemove(cart.id)}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>No hay productos en el carrito.</td>
                      </tr>
                    )}
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
