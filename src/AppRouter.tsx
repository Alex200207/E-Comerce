import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoutes";
import Login from "./components/AuthPages/Login";
import AdminPage from "./Pages/AdminPage";
import TableCategorias from "@components/Dashboard/TableCategorias";
import Table from "@components/Dashboard/Table";
import { useState } from "react";


const AppRouter = () => {
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<p>Inicio</p>}></Route>
        <Route path="/adminPage" element={<AdminPage />}></Route>
        <Route path="/Productos" element={<Table searchTerm={searchTerm} />}></Route>
        <Route path="/categorias" element={<TableCategorias searchTerm={""}/>}></Route>
        <Route path="/clientes" element={<span>Clientes</span>}></Route>
        <Route path="/vendedores" element={<span>Vendedores</span>}></Route>
        <Route path="/proveedores" element={<span>Proveedores</span>}></Route>
      </Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}> </Route>
    </Routes>
  );
};

export default AppRouter;
