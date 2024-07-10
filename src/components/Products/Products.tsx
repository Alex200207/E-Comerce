import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

  return (
    <section id="productos" className="py-5">
      <div className="container">
        <div className="row" id="contenedor-productos">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={product.ImagenUrl}
                  className="card-img-top"
                  alt={product.Nombre}
                  style={{
                    width: "350px",
                    height: "250px",
                    objectFit: "contain",
                    display: "block",
                    margin: "20px",
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">{product.Nombre}</h4>

                  <p className="card-text">Precio: ${product.Precio}</p>
                  <hr />
                  <Button
                    className="btn-buy"
                    onClick={() => openProductDetail(product)}
                  >
                    Ver producto
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
