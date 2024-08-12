import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { API_URL } from "../../constants";

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
    loadProducts();
  }, []);

  const fetchCarrito = async () => {
    try {
      const response = await fetch(`${API_URL}/carrito`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

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
    if (window.confirm("¿Seguro quieres eliminar esto del carrito de compras?")) {
      try {
        const response = await fetch(`${API_URL}/carrito/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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
      const response = await fetch(`${API_URL}/carrito/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ cantidad }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la cantidad del producto en el carrito");
      }

      await fetchCarrito();
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto en el carrito:", error);
    }
  };

  const loadProducts = () => {
    fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

  const getNombreProducto = (idProducto: number): string => {
    const producto = productos.find((prod) => prod.ID_Producto === idProducto);
    return producto ? producto.Nombre : "Sin Nombre";
  };

  const getPrecioProducto = (idProducto: number): number => {
    const producto = productos.find((prod) => prod.ID_Producto === idProducto);
    return producto ? producto.Precio : 0;
  };

  const getTotalPrice = () => {
    return carrito.reduce(
      (total, cartItem) => total + getPrecioProducto(cartItem.id_producto) * cartItem.cantidad,
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
                                handleQuantityChange(cart.id, parseInt(e.target.value))
                              }
                              min="1"
                            />
                          </td>
                          <td>
                            <Button onClick={() => handleRemove(cart.id)}>
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
