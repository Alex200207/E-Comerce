import React, { useEffect, useState } from "react";
import { API_URL } from '../../constants';

interface Categoria {
  ID: number;
  Nombre: string;
}

const Select: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => response.json())
      .then((data: Categoria[]) => setCategorias(data))
      .catch((error) => {
        console.error("Error al cargar las categorias:", error);
        alert("Error al cargar las categorías");
      });
  };

  return (
    <select className="form-select me-26" id="select__navbar">
      <option className="option__select" value="0" selected>
        Todas las Categorias
      </option>
      {categorias.map((categoria) => (
        <option key={categoria.ID} className="option__select" value={categoria.ID}>
          {categoria.Nombre}
        </option>
      ))}
    </select>
  );
};

export default Select;
