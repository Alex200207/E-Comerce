import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from '../header/Select';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const handleSearchClick = () => {
    onSearchSubmit(); // Llamar a la función de envío de búsqueda desde las props
  };

  return (
    <div className="d-flex ms-auto" role="search">
      <Select />
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar..."
        aria-label="Buscar"
        value={searchTerm}
        onChange={onSearchChange} // Llamar directamente a la función de cambio de búsqueda desde las props
      />
      <button
        className="btn btn-outline-success btn-custom"
        type="button"
        onClick={handleSearchClick} // Usar la función local para el clic de búsqueda
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
