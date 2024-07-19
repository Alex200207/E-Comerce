import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-wrapper__Log">
          AlexStore
        </div>
        <ul className="list-group list-group-flush my-3">
          <li>
            <Link
              to={"/Lista"}
              className="list-group-item list-group-item-action "
            >
              <GoHome /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to={"/Productos"}
              className="list-group-item list-group-item-action "
            >
             <MdOutlineProductionQuantityLimits /> Productos
            </Link>
          </li>
          <li>
            <Link
              to={"/Categoria"}
              className="list-group-item list-group-item-action "
            >
             <BiSolidCategory /> Categoria
            </Link>
          </li>
          <li>
            <Link
              to={"/Clientes"}
              className="list-group-item list-group-item-action"
            >
             <FaPerson /> clientes
            </Link>
          </li>
          <li>
            <Link
              to={"/Vendedores"}
              className="list-group-item list-group-item-action "
            >
             <IoPersonSharp /> Vendedores
            </Link>
          </li>
          <li>
            <Link
              to={"/Proveedores"}
              className="list-group-item list-group-item-action "
            >
             <FaPersonBreastfeeding /> Proveedores
            </Link>
          </li>
          <li>
            <Link
              to={"/Salir"}
              className="list-group-item list-group-item-action "
            >
             <CiLogout /> Salir
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
