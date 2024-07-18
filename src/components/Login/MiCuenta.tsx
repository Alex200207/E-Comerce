import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const MiCuenta: React.FC = () => {
  return (
    <Container className="py-4">
      <p>Este apartado esta en desarrollo.....</p>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Información del Usuario "<b>En desarrollo</b>"</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Nombre:</strong> John Doe
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> johndoe@example.com
                </ListGroup.Item>
              </ListGroup>
              <div className="mt-4 text-center">
                <Button variant="outline-info" className="mx-2">
                  Cambiar Contraseña
                </Button>
                <Button variant="outline-secondary" className="mx-2">
                  Actualizar Información
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Historial de Pedidos <b>En desarrollo</b></Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Pedido #1</strong> - 05/07/2024
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pedido #2</strong> - 10/07/2024
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pedido #3</strong> - 15/07/2024
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MiCuenta;
