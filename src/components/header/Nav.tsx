import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "@components/header/Search";
import ShoppingCartModal from "@components/Products/ShoppingCartModal";
import Select from "./Select";
import DropdownUser from "@components/Dashboard/DropdownUser";
import { Link } from "react-router-dom";



interface NavProps {
  toggleAside: () => void;
  onSearch: (term: string) => void;
  onSelectCategoria: (categoriaId: number) => void;
}

const Nav: React.FC<NavProps> = ({ toggleAside, onSearch ,onSelectCategoria}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(""); 
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
            <Link to="/productPage/Inicio" className="nav-link" >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productPage/Nosotros" className="nav-link" >
                Nosotros
              </Link>
            </li>
          </ul>
          
          <ShoppingCartModal />
          <Select onSelectCategoria={onSelectCategoria} />
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


