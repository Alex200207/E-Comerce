import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import SearchBar from "./SearchBar";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  
  return (
    <nav className="header-admin">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </nav>
  );
};

export default Navbar;
