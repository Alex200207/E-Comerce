import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoutes";
import Login from "./components/AuthPages/Login";
import AdminPage from "./Pages/AdminPage";
import TableCategorias from "@components/Dashboard/TableCategorias";
import Table from "@components/Dashboard/Table";
import TableVendedores from "@components/Dashboard/TableVendedores";
import Navbar from "@components/Dashboard/Navbar";
import { useState } from "react";

const AppRouter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

 
  const isProtectedRoute = location.pathname !== '/' && location.pathname !== '/login';//uso de operador ternario 
  //para resolver el problema del navbar en el login 

  return (
    <>
      {isProtectedRoute && <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<p>Inicio</p>} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/productos" element={<Table searchTerm={searchTerm} />} />
          <Route path="/categorias" element={<TableCategorias searchTerm={searchTerm} />} />
          <Route path="/clientes" element={<span>Clientes</span>} />
          <Route path="/vendedores" element={<TableVendedores searchTerm={searchTerm} />} />
          <Route path="/proveedores" element={<span>Proveedores</span>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
