import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { MdAddShoppingCart, MdOutlinePayment } from "react-icons/md";
import { API_URL } from "../../constants"; // Asegúrate de que la URL de la API esté correctamente importada
import { useAuth } from '../../utils/AuthProvider';

interface Product {
  ID_Producto: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
}




interface ProductDetailProps {
  show: boolean;
  onHide: () => void;
  product: Product;

}

const ProductDetail: React.FC<ProductDetailProps> = ({ show, onHide, product }) => {
  const [cantidad, setCantidad] = useState(1);
  const { token} = useAuth(); // Asegúrate de obtener `userId` también

  const agregarAlCarrito = async () => {
    try {
      const response = await fetch(`${API_URL}/carrito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_producto: product.ID_Producto,
          cantidad,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al agregar el producto al carrito");
      }
  
      alert("Producto agregado al carrito con éxito");
      onHide(); 
  
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header
        className="title-pro"
        closeButton
        style={{ paddingLeft: "unset", paddingRight: "1rem", background: '#29a4f0' }}
      >
        <Modal.Title
          className="title-detail"
          style={{ marginLeft: "auto", marginRight: "10px" }}
        >
          {product.Nombre}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ overflowY: "auto" }}>
        <Container>
          <Row>
            <Col md={5} className="text-center">
              <Zoom>
                <img
                  src={product.ImagenUrl}
                  alt={product.Nombre}
                  className="img-fluid"
                  style={{
                    maxHeight: "400px",
                    objectFit: "contain",
                    cursor: "zoom-in",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Zoom>
            </Col>
            <Col md={7}>
              <div style={{ padding: "20px" }}>
                <Row className="row-custom">
                  <Col xs={12} className="mb-3 title-products">
                    <h5>Descripción del producto</h5>
                    <p style={{ fontSize: "16px", color: "#555" }}>
                      {product.Descripcion}
                    </p>
                    <hr />
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Precio</h5>
                    <p style={{ color: "#28a745" }}>${product.Precio}</p>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Cantidad</h5>
                    <Form.Control
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                      placeholder="Cantidad"
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-add`}>Agregar al carrito</Tooltip>
                    }
                  >
                    <Button
                      className="add-custom"
                      onClick={agregarAlCarrito}
                      style={{ marginRight: "10px" }}
                    >
                      <MdAddShoppingCart className="icon-add" />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-buy`}>Comprar</Tooltip>}
                  >
                    <Button
                      className="add-custom"
                      onClick={() => alert(`En desarrollo: ${product.ID_Producto}`)}
                    >
                      <MdOutlinePayment className="icon-add" />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <footer className="footer-detail"></footer>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;
