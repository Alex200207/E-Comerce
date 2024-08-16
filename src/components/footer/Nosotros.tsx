import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Nosotros: React.FC = () => {
  return (
    <section id="about-us" className="py-5 bg-light">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h2 className="display-4 mb-4 textNosotros ">Conoce a Nuestro Equipo</h2>
            <p className="lead textNosotros">
              En nuestra empresa, estamos comprometidos con ofrecer el mejor servicio y productos de calidad. Conoce a las personas que hacen posible todo esto.
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={6}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Card.Title className="h4 ">Sobre Nosotros</Card.Title>
                <Card.Text>
                  Fundada en 2024, nuestra empresa se dedica a ofrecer productos de alta calidad con un enfoque en la satisfacción del cliente. Nuestro equipo está formado por Noprofesionales apasionados que trabajan incansablemente para cumplir con nuestras promesas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Card.Title className="h4">Nuestra Misión y Valores</Card.Title>
                <Card.Text>
                  <ul>
                    <li><strong>Misión:</strong> Proveer soluciones innovadoras que mejoren la vida de nuestros clientes.</li>
                    <li><strong>Valores:</strong> Integridad, excelencia, y compromiso con la calidad.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h3 className="h4 textNosotros">¡Únete a Nosotros!</h3>
            <p className="lead textNosotros">
              Si compartes nuestra pasión por la innovación y el servicio, no dudes en ponerte en contacto con nosotros para oportunidades de colaboración o empleo.
            </p>
            <a href="/contacto" className="btn btn-customN">Contáctanos</a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Nosotros;
