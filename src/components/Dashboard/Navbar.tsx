import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import SearchBar from "./SearchBar";

import { AiOutlineMenu } from "react-icons/ai";
import DropdownUser from "./DropdownUser";


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
  


  return (
    <nav className="header-admin">
      <div className="container-menu">
        <button className="container-menu__button" onClick={toggleSidebar}>
        <AiOutlineMenu className="btn-menu" />
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

      <DropdownUser/>
    </nav>
  );
};

export default Navbar;
