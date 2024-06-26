import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/productos"); // Utilizamos el prefijo /api configurado en el proxy
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section id="productos" className="py-5">
      <div className="container">
        <div className="row" id="contenedor-productos">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={`https://via.placeholder.com/350x250?text=${product.Nombre}`}
                  className="card-img-top"
                  alt={product.Nombre}
                />
                <div className="card-body">
                  <h4 className="card-title">{product.Nombre}</h4>
                  <p className="card-text">
                    Descripción: {product.Descripcion}
                  </p>
                  <p className="card-text">Precio: ${product.Precio}</p>
                  <a href="#" className="btn btn-primary">
                    Ver producto
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
