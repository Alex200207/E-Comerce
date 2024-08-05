import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import SearchBar from "./SearchBar";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../../utils/AuthProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AiOutlineMenu } from "react-icons/ai";
import User from '@images/user.jpeg'
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";

interface UserDataToken extends JwtPayload {
  email: string;
  iat: number;
  id: number;
  name: string;
}
interface NavbarProps {
  toggleSidebar: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  searchTerm,
  onSearchChange,
}) => {
  const { token } = useAuth();

  const user = jwtDecode<UserDataToken>(token);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="header-admin">
      <div className="container-menu">
        <button className="container-menu__button" onClick={toggleSidebar}>
        <AiOutlineMenu className="btn-menu" />
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

      <Dropdown className="item-drop">
        <Dropdown.Toggle
          id="dropdown-custom-components"
          variant="link"
          className="p-0"
        >
          <i className="bi bi-person-circle"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className="menu-custom ">
          <div className="text-container">
            <img src={User} alt="" className="text-container__img" />
          <h5 className="user-name">Hola, {user?.name}</h5>
          </div>
          
          <hr></hr>
          <Dropdown.Item href="#/profile" className="item-menu" ><FaUser className="menu-icons" /> Perfil</Dropdown.Item>
          <Dropdown.Item href="#/settings" className="item-menu"><IoMdSettings className="menu-icons" /> Configuraciones</Dropdown.Item>
          <hr />
          <Dropdown.Item href="/" onClick={handleLogout} className="item-menu">
          <CiLogout className="menu-icons"/> Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
