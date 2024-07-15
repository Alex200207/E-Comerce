import React from "react";
import { Modal, Button, Container, Row, Col, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { MdAddShoppingCart, MdOutlinePayment } from "react-icons/md";

interface Product {
  id: number;
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

const ProductDetail: React.FC<ProductDetailProps> = ({
  show,
  onHide,
  product,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.Nombre}</Modal.Title>
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
                    <h5>Vendedor</h5>
                    <p>Esta en desarrollo</p>
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
                      placeholder="Cantidad"
                    />
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Método de Pago</h5>
                    <Form.Select>
                      <option>Selecciona método de pago...</option>
                      <option>En Desarrollo</option>
                      <option>1</option>
                      <option>2</option>
                    </Form.Select>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-add`}>Agregar al carrito</Tooltip>}
                  >
                    <Button
                      className="add-custom"
                      onClick={() => alert(`en desarrollo: ${product.id}`)}
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
                      onClick={() => alert(`en desarrollo: ${product.id}`)}
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
