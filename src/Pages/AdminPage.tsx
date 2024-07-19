import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import TableClient from "@components/Dashboard/TableClient";
import TableVendedores from "@components/Dashboard/TableVendedores";
import TableCategorias from "@components/Dashboard/TableCategorias";
import SearchBar from "../components/Dashboard/SearchBar";
import Table from "@components/Dashboard/Table"; 

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <nav className="header-admin">  
          <div className="search-bar-wrapper">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          
          
        </div>
      </nav>
      <main className="contenedorMain">
          <Routes>
            <Route path="/Inicio" element={<p>Inicio</p>} />
            <Route path="/Productos" element={<Table searchTerm={searchTerm} />} />
            <Route path="/Categoria" element={<TableCategorias searchTerm={searchTerm} />} />
            <Route path="/Clientes" element={<TableClient searchTerm={searchTerm}/>} />
            <Route path="/Vendedores" element={<TableVendedores searchTerm={searchTerm}/>} />
            <Route path="/Proveedores" element={<p>Proveedores</p>} />
          </Routes>
       
      </main>
    </>
  );
};

export default AdminPage;
