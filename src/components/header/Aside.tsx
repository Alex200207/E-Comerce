import React from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdProductionQuantityLimits } from "react-icons/md";

interface AsideProps {
  isOpen: boolean;
}

const Aside: React.FC<AsideProps> = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/productPage/inicio" className="nav-link" aria-current="page">
            <IoMdHome /> Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productPage/cuenta" className="nav-link">
            <MdAccountCircle /> MIcuenta
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productPage/productos" className="nav-link">
            <MdProductionQuantityLimits /> Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productPage/categorias" className="nav-link">
            <BiSolidCategory /> Categorias
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Aside;
