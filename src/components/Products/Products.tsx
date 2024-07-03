import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <section id="productos" className="py-5">
      <div className="container">
        <div className="row" id="contenedor-productos">
          {products.map((product) => (
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
                    display: "block", // Para asegurar que la imagen se comporte como un bloque
                    margin: "20px", // Para centrar la imagen horizontalmente dentro del contenedor
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">{product.Nombre}</h4>
                  <p className="card-text">
                    Descripción: {product.Descripcion}
                  </p>
                  <p className="card-text">Categoria: {product.ID_Categoria}</p>
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
