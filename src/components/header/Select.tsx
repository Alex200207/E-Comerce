import React, { useEffect, useState } from "react";
import { API_URL } from '../../constants';
import { useAuth } from "../../utils/AuthProvider";

interface Categoria {
  ID_Categoria: number;
  Nombre: string;
}

interface SelectProps {
  onSelectCategoria: (categoriaId: number) => void;
}

const Select: React.FC<SelectProps> = ({ onSelectCategoria }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data: Categoria[]) => setCategorias(data))
      .catch((error) => {
        console.error("Error al cargar las categorias:", error);
        alert("Error al cargar las categorías");
      });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    onSelectCategoria(selectedValue);
  };

  return (
    <select className="form-select me-26" id="select__navbar" onChange={handleSelectChange}>
      <option className="option__select" value="0" selected>
        Todas las Categorias
      </option>
      {categorias.map((categoria) => (
        <option key={categoria.ID_Categoria} className="option__select" value={categoria.ID_Categoria}>
          {categoria.Nombre}
        </option>
      ))}
    </select>
  );
};

export default Select;
