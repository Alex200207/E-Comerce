// Importaciones necesarias
import Table from "@components/Dashboard/Table"
import Nav from "@components/Dashboard/Nav"
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css"; // Importa tus estilos CSS si los tienes

// Función principal del componente App
function AdminPage() {
  return (
    <>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Nav/>
          <div className="container-fluid px-4">
            <Table/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
