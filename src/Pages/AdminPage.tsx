// Importaciones necesarias
import Table from "@components/Dashboard/Table"
import { Route, Routes } from "react-router-dom";
import Nav from "@components/Dashboard/Nav"
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css"; // Importa tus estilos CSS si los tienes

import TableClient from "@components/Dashboard/TableClient";


// Función principal del componente App
function AdminPage() {
  return (
    <>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Nav/>
          
          <div className="container-fluid px-4">
            <Routes>
              <Route>
              <Route path="/Incio" element={'/'} />
              <Route path="/Productos" element={<Table />} />
              <Route path="/Categoria" element={<p>Categorias</p>} />
              <Route path="/Clientes" element={<TableClient/>} />
              <Route path="/Vendedores" element={<p>Vendedores</p>} />
              <Route path="/Proveedores" element={<p>Proveedores</p>} />

              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
