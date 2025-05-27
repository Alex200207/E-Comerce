import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { useAuth } from "../../utils/AuthProvider";

interface Category {
  ID_Categoria: number;
  Nombre: string;
}

const ProductCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {token} = useAuth();

  const loadCategorias = () => {
    fetch(`${API_URL}/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Category[]) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las categorias:", error);
        setError("Error al cargar las categorías");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  if (loading) {
    return <p>Cargando categorías...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Categorías</h2>
      <div className="row">
        {categorias.map((categoria) => (
          <div key={categoria.ID_Categoria} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm rounded-3 border-0">
              <div className="card-body">
                <h5 className="card-title">{categoria.Nombre}</h5>
                <Link
                  to={`/categoria/${categoria.ID_Categoria}`}
                  className="btn btn-outline-primary"
                >
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
