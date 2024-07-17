import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "../header/Select";
import '../../index.css'
import { MdClear } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
  onClearSearch: () => void; // Agregamos la función de limpieza
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
}) => {
  const handleSearchClick = () => {
    onSearchSubmit(); // Llama a la función de envío de búsqueda desde las props
  };

  const handleClearClick = () => {
    onClearSearch(); // Llama a la función de limpieza desde las props
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
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
        onChange={onSearchChange} // Llama directamente a la función de cambio de búsqueda desde las props
        onKeyPress={handleKeyPress} // Captura la tecla presionada
      />
      <button
        className="btn btn-outline-success btn-custom"
        type="button"
        onClick={handleSearchClick} // Usa la función local para el clic de búsqueda
      >
        <IoSearch className="btn-search"/>
      </button>
      {searchTerm && ( // Muestra el botón de limpieza solo si hay un término de búsqueda
        <button
          className="btn btn-link btn-clear-search"
          onClick={handleClearClick} // Usa la función local para el clic de limpieza
        >
         <MdClear className="icon-clear" />
        </button>
      )}
    </div>
  );
};

export default Search;
