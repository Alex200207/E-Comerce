import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductDetail from "./ProductDetail";
import { API_URL } from '../../constants/index.ts';
import { useAuth } from '../../utils/AuthProvider';
import { MdErrorOutline } from "react-icons/md";

interface Product {
  ID_Producto: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
}

interface ProductsProps {
  searchTerm: string;
  selectedCategoriaId: number;
}

const Products: React.FC<ProductsProps> = ({ searchTerm, selectedCategoriaId }) => {
  const [products, setProductos] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
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

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategoriaId === 0 || product.ID_Categoria === selectedCategoriaId) && 
      (product.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="productos" className="py-5">
      <Container>
        {filteredProducts.length === 0 ? (
            <h3 className="noFound"> <MdErrorOutline /> No se han encontrado resultados</h3>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.ID_Producto} className="mb-4">
                <Card
                  className="h-100 border-0 shadow"
                  style={{ cursor: "pointer", height: "100%" }}
                  onClick={() => openProductDetail(product)}
                >
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: "300px" }}
                  >
                    <Card.Img
                      variant="top"
                      src={product.ImagenUrl}
                      alt={product.Nombre}
                      className="img-fluid rounded"
                      style={{
                        objectFit: "contain",
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
        )}
      </Container>

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
