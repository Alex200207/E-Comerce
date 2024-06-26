import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface AsideProps {
  isOpen: boolean;
}

const Aside: React.FC<AsideProps> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className=" sidebar">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to={"/Inicio"} className="nav-link " aria-current="page">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Cuenta"} className="nav-link">
                Cuenta
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/productos"} className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contactos"} className="nav-link">
                Contactos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Aside;
