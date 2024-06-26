import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "@components/header/Search"; // Asegúrate de que la ruta sea correcta

interface NavProps {
  toggleAside: () => void;
}

const Nav: React.FC<NavProps> = ({ toggleAside }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light  navbar-custom">
      <div className="container-fluid">
        <button className="btn  me-2" onClick={toggleAside}>
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
              <a className="nav-link active" aria-current="page" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Facturas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Precios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" aria-disabled="true">
                Disponible
              </a>
            </li>
          </ul>
          {/* Aquí se incluye el componente Search */}
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
