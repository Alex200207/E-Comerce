import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaPersonBreastfeeding } from "react-icons/fa6";


const Sidebar: React.FC = () => {
  return (
    <>
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-wrapper__Log">AlexStore <hr /></div>
        
        <ul className="list-group list-group-flush my-3">
          <li>
            <Link
              to="/home"
              className="list-group-item list-group-item-action "
            >
              <GoHome /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to="productos"
              className="list-group-item list-group-item-action"
            >
              <MdOutlineProductionQuantityLimits /> Productos
            </Link>
          </li>
          <li>
            <Link
              to="categorias"
              className="list-group-item list-group-item-action "
            >
              <BiSolidCategory /> Categorías
            </Link>
          </li>
          <li>
            <Link
              to="clientes"
              className="list-group-item list-group-item-action"
            >
              <FaPerson /> Clientes
            </Link>
          </li>
          <li>
            <Link
              to="vendedores"
              className="list-group-item list-group-item-action "
            >
              <IoPersonSharp /> Vendedores
            </Link>
          </li>
          <li>
            <Link
              to="proveedores"
              className="list-group-item list-group-item-action "
            >
              <FaPersonBreastfeeding /> Proveedores
            </Link>
          </li>
        
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
