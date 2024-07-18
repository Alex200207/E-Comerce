import Table from "@components/Dashboard/Table";
import { Route, Routes } from "react-router-dom";
import Nav from "@components/Dashboard/Nav";
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import TableClient from "@components/Dashboard/TableClient";
import TableVendedores from "@components/Dashboard/TableVendedores";
import TableCategorias from "@components/Dashboard/TableCategorias";

function AdminPage() {
  return (
    <>
    <Nav />
    <Sidebar />
      <main className="contenedorMain" >

        <div className="contendorMain__div">                 
              <Routes>
                <Route>
                  <Route path="/Incio" element={"/"} />
                  <Route path="/Productos" element={<Table />} />
                  <Route path="/Categoria" element={<TableCategorias />} />
                  <Route path="/Clientes" element={<TableClient />} />
                  <Route path="/Vendedores" element={<TableVendedores />} />
                  <Route path="/Proveedores" element={<p>Proveedores</p>} />
                </Route>
              </Routes>
            </div>
      </main>
      <footer><p className="footer__p">&copy; 2024 - Todos los derechos reservados</p></footer>
    </>
  );
}

export default AdminPage;
