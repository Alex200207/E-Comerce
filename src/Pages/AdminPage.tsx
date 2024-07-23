import { FC } from "react";
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import { Outlet } from "react-router-dom"; // Importar Outlet
import SearchBar from "@components/Dashboard/SearchBar";
import React, { useState } from "react";

export interface AdminPageProps {
  children?: React.ReactNode; // Aceptar ReactNode
}

const AdminPage: FC<AdminPageProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Sidebar />
      <nav className="header-admin" >
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </nav>

      <main className="main-content">
        <div className="main-wrapper">
          <Outlet /> {/* Renderizar rutas hijas aquí */}
        </div>
      </main>

      <footer>
        <p>
          <b>AlexStore</b> Todos los derechos reservados
        </p>
      </footer>
    </>
  );
};

export default AdminPage;
