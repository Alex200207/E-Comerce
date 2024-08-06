import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaBox, FaTags, FaShoppingCart, FaDollarSign, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface SummaryData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalSales: number;
  totalCustomers: number;
  totalRevenue: number;
}

const IndexPage: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalSales: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // debo usar fetch con mi api
    // ejemplo de muestra
    const fetchData = async () => {
      const data = {
        totalProducts: 120,
        totalCategories: 10,
        totalOrders: 300,
        totalSales: 15000,
        totalCustomers: 200,
        totalRevenue: 50000,
      };
      setSummaryData(data);
    };
    fetchData();
  }, []);

  const pieData = {
    labels: ['Productos', 'Categorías', 'Pedidos'],
    datasets: [
      {
        data: [summaryData.totalProducts, summaryData.totalCategories, summaryData.totalOrders],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Ventas'],
    datasets: [
      {
        label: 'Total Ventas',
        data: [summaryData.totalSales],
        backgroundColor: ['#4BC0C0'],
        hoverBackgroundColor: ['#4BC0C0'],
      },
    ],
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaBox size={30} className="mb-2" />
              <Card.Title>Total Productos</Card.Title>
              <Card.Text>{summaryData.totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaTags size={30} className="mb-2" />
              <Card.Title>Total Categorías</Card.Title>
              <Card.Text>{summaryData.totalCategories}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaShoppingCart size={30} className="mb-2" />
              <Card.Title>Total Pedidos</Card.Title>
              <Card.Text>{summaryData.totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaUsers size={30} className="mb-2" />
              <Card.Title>Total Clientes</Card.Title>
              <Card.Text>{summaryData.totalCustomers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4 text-center" style={{ height: '300px' }}>
            <Card.Body>
              <FaDollarSign size={30} className="mb-2" />
              <Card.Title>Total Ventas</Card.Title>
              <div style={{ height: '200px' }}>
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4 text-center" style={{ height: '300px' }}>
            <Card.Body>
              <FaMoneyBillWave size={30} className="mb-2" />
              <Card.Title>Resumen de la Tienda</Card.Title>
              <div style={{ height: '200px' }}>
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaMoneyBillWave size={30} className="mb-2" />
              <Card.Title>Ingresos Totales</Card.Title>
              <Card.Text>${summaryData.totalRevenue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default IndexPage;
