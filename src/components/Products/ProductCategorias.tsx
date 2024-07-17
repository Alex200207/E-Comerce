
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  description: string;
}

const ProductCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    // Simulacion de las cargas de categorias las pondre dinamicas a futuro
    const mockCategorias: Category[] = [
      { id: 1, name: "Electrónica", description: "Descubre nuestra selección de productos electrónicos." },
      { id: 2, name: "Ropa", description: "Explora las últimas tendencias en moda para hombres y mujeres." },
      { id: 3, name: "Hogar", description: "Decora tu hogar con nuestros muebles y accesorios." },

    ];

    setCategorias(mockCategorias);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Categorías</h2>
      <div className="row">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm rounded-3 border-0">
              <div className="card-body">
                <h5 className="card-title">{categoria.name}</h5>
                <p className="card-text">{categoria.description}</p>
                <Link to={`/categoria/${categoria.id}`} className="btn btn-outline-primary">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategorias;
