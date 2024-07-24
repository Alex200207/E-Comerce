import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoutes";
import Login from "./components/AuthPages/Login";
import AdminPage from "./Pages/AdminPage";
import TableCategorias from "@components/Dashboard/TableCategorias";
import Table from "@components/Dashboard/Table";
import { useState } from "react";
import Navbar from "@components/Dashboard/Navbar";
import TableVendedores from "@components/Dashboard/TableVendedores";

const AppRouter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<p>Inicio</p>}></Route>
          <Route path="/adminPage" element={<AdminPage />}></Route>
          <Route path="/productos" element={<Table searchTerm={searchTerm} />}></Route>
          <Route path="/categorias" element={<TableCategorias searchTerm={searchTerm} />}></Route>
          <Route path="/clientes" element={<span>Clientes</span>}></Route>
          <Route path="/vendedores" element={<TableVendedores searchTerm={searchTerm}/>}></Route>
          <Route path="/proveedores" element={<span>Proveedores</span>}></Route>
        </Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
