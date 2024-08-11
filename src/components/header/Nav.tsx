import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "@components/header/Search";
import ShoppingCartModal from "@components/Products/ShoppingCartModal";
import Select from "./Select";
import DropdownUser from "@components/Dashboard/DropdownUser";



interface NavProps {
  toggleAside: () => void;
  onSearch: (term: string) => void;
}

const Nav: React.FC<NavProps> = ({ toggleAside, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(""); // Llama a la función de búsqueda con una cadena vacía para borrar la búsqueda
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <button className="btn me-22" onClick={toggleAside}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
        <a className="navbar-brand" href="#">
          AlexStore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a  href="#" className="nav-link" aria-current="page">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nosotros
              </a>
            </li>
          </ul>
          <ShoppingCartModal />
          <Select />
          <Search
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch} // Pasa la función de limpieza al componente Search
          />

          
        </div>
        <DropdownUser />
      </div>
    </nav>
  );
};

export default Nav;
