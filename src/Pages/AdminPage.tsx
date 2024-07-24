import React, { FC } from "react";
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import { Outlet } from "react-router-dom";


export interface AdminPageProps {
  
  children?: React.ReactNode; // Aceptar ReactNode
}

const AdminPage: FC<AdminPageProps> = () => {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="main-wrapper">
          <Outlet /> 
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
