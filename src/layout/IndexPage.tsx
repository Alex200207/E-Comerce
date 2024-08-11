import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaBox, FaTags, FaShoppingCart, FaUsers, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface SummaryData {
  totalCategories: number;
  totalOrders: number;
  totalCustomers: number;
  totalSales: number;
  totalRevenue: number;
}

const IndexPage: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    totalCategories: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/count');
        const data = await response.json();
        setTotalProducts(data.count);
      } catch (error) {
        console.error('Error al obtener el conteo de productos:', error);
      }
    };

    const fetchCategoryCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/countCa');
        const data = await response.json();
        setTotalCategories(data.count);
      } catch (error) {
        console.error('Error al obtener el conteo de categorías:', error);
      }
    };

    const fetchClientCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/countClient');
        const data = await response.json();
        setSummaryData(prevData => ({
          ...prevData,
          totalCustomers: data.count
        }));
      } catch (error) {
        console.error('Error al obtener el conteo de clientes:', error);
      }
    };

    // Valores staticos
    const fetchSummaryData = () => {
      setSummaryData({
        totalCategories: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalSales: 0,
        totalRevenue: 0,
      });
    };

    fetchProductCount();
    fetchCategoryCount();
    fetchClientCount();
    fetchSummaryData();
  }, []);

  const pieData = {
    labels: ['Productos', 'Categorías', 'Pedidos'],
    datasets: [
      {
        data: [totalProducts, totalCategories, summaryData.totalOrders],
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
              <Card.Text>{totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <FaTags size={30} className="mb-2" />
              <Card.Title>Total Categorías</Card.Title>
              <Card.Text>{totalCategories}</Card.Text>
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
