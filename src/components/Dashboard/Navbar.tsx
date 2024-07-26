import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import SearchBar from "./SearchBar";
import { Dropdown } from "react-bootstrap";
import { useAuth } from '../../utils/AuthProvider';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserDataToken extends JwtPayload {
  email: string;
  iat: number;
  id: number;
  name: string;
}
interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {

    const { token } = useAuth();

    const user = jwtDecode<UserDataToken>(token);
  
    const { logout } = useAuth();
  
    const handleLogout = () => {
      logout();
    };
  return (
    
    <nav  className="header-admin">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        
        <Dropdown className="item-drop">
          <Dropdown.Toggle
            id="dropdown-custom-components"
            variant="link"
            className="p-0"
          >
            <i className="bi bi-person-circle"></i> 
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <h5 className="user-name">Hola, {user?.name}</h5>
            <Dropdown.Divider />
            <Dropdown.Item href="#/profile">Perfil</Dropdown.Item>
            <Dropdown.Item href="#/settings">Configuraciones</Dropdown.Item>
            
            <Dropdown.Item href="/" onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </nav>
  );
};

export default Navbar;
