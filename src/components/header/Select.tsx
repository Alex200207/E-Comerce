import React from "react";
import { useEffect, useState } from "react";

interface Categorias {
  Nombre: string;
}

const Select: React.FC = () => {
  const [categorias, setcategorias] = useState<Categorias[]>([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data: Categorias[]) => {
        setcategorias(data);
      })
      .catch((error) => {
        console.error("Error al cargar Categorias:", error);
        alert("Error al cargar los Categorias");
      });
  };

  return (
    <select className="form-select me-2" id="select__navbar">
      <option value="0" selected>
        Todas las Categorias
      </option>
      {categorias.map((categorias) => (
        <option className="option__select">{categorias.Nombre}</option>
      ))}
    </select>
  );
};

export default Select;
