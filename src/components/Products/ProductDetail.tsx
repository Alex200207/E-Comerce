import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
  Vendedor: string;
}

interface ProductDetailProps {
  show: boolean;
  onHide: () => void;
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ show, onHide, product }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.Nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowY: 'auto' }}>
        <Container>
          <Row>
            <Col md={5} className="text-center">
              <Zoom>
                <img
                  src={product.ImagenUrl}
                  alt={product.Nombre}
                  className="img-fluid"
                  style={{ maxHeight: '300px', objectFit: 'contain', cursor: 'zoom-in', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
              </Zoom>
            </Col>
            <Col md={7}>
              <div style={{ padding: '20px' }}>
                <Row>
                  <Col xs={12} className="mb-3">
                    <h5>Descripción del producto</h5>
                    <p style={{ fontSize: '16px', color: '#555' }}>{product.Descripcion}</p>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Vendedor</h5>
                    <p>{product.Vendedor}</p>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Precio</h5>
                    <p style={{ color: '#28a745' }}>${product.Precio}</p>
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Cantidad</h5>
                    <Form.Control type="number" min="1" placeholder="Cantidad" />
                  </Col>
                  <Col xs={6} className="mb-3">
                    <h5>Método de Pago</h5>
                    <Form.Select>
                      <option>Selecciona método de pago...</option>
                      <option>Efectivo</option>
                      <option>Tarjeta de crédito</option>
                      <option>Transferencia bancaria</option>
                    </Form.Select>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={() => alert(`Agregado al carrito: ${product.id}`)} style={{ marginRight: '10px' }}>
                    Agregar al carrito
                  </Button>
                  <Button variant="success" onClick={() => alert(`Producto Comprado: ${product.id}`)}>
                    Comprar
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;
