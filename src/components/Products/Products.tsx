import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductDetail from "./ProductDetail";

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
}

interface ProductsProps {
  searchTerm: string;
}

const Products: React.FC<ProductsProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/productos");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (product: Product) => {
    openProductDetail(product);
  };

  return (
    <section id="productos" className="py-5">
      <Container>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id} className="mb-4">
              <Card
                className="h-100 border-0 shadow"
                style={{ cursor: "pointer", height: "100%" }}
                onClick={() => handleCardClick(product)}
              >
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "300px" }} // Altura fija del contenedor
                >
                  <Card.Img
                    variant="top"
                    src={product.ImagenUrl}
                    alt={product.Nombre}
                    className="img-fluid rounded"
                    style={{
                      objectFit: "contain", // Ajuste para mostrar toda la imagen sin recortes
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div
                    className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      opacity: 0,
                      transition: "opacity 0.2s ease-in-out",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="fw-bold btn-buy"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductDetail(product);
                      }}
                    >
                      Ver producto
                    </Button>
                  </div>
                </div>
                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                  <Card.Title className="h6 mb-0">{product.Nombre}</Card.Title>
                  <Card.Text className="text-muted">
                    Precio: ${product.Precio}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal para mostrar detalles del producto */}
      {selectedProduct && (
        <ProductDetail
          show={true}
          onHide={closeProductDetail}
          product={selectedProduct}
        />
      )}
    </section>
  );
};

export default Products;
