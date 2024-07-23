import { FC } from 'react';
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import { Outlet } from 'react-router-dom'; // Importar Outlet

export interface AdminPageProps {
  children?: React.ReactNode;  // Aceptar ReactNode
}

const AdminPage: FC<AdminPageProps> = () => {
  return (
    <>
      <Sidebar />
      <nav className="header-admin">
        <div className="search-bar-wrapper">
        </div>
      </nav>
      
      <main className='main-content'>
      <div className="main-wrapper">
        
        <Outlet /> {/* Renderizar rutas hijas aquí */}
     
      </div>
      </main>
    </>
  );
};

export default AdminPage;
