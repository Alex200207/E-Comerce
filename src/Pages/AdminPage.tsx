import { ChangeEvent, FC } from 'react';
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import { Outlet } from 'react-router-dom'; // Importar Outlet
import SearchBar from '@components/Dashboard/SearchBar';

export interface AdminPageProps {
  children?: React.ReactNode;  // Aceptar ReactNode
}

const AdminPage: FC<AdminPageProps> = () => {
  return (
    <>
      <Sidebar />
      <nav className="header-admin">
        <SearchBar searchTerm={''} onSearchChange={function (e: ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } }/>
      </nav>
      
      <main className='main-content'>
      <div className="main-wrapper">
        
        <Outlet /> {/* Renderizar rutas hijas aquí */}
     
      </div>
      </main>

      <footer >
        <p><b>AlexStore</b> Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default AdminPage;
