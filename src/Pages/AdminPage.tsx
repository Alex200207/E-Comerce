import React, { FC, useState } from "react";
import Sidebar from "@components/Dashboard/Sidebar";
import "../components/Style/Dashboard.css";
import Navbar from "@components/Dashboard/Navbar";

export interface AdminPageProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const AdminPage: FC<AdminPageProps> = ({ searchTerm, onSearchChange, children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`d-flex ${isSidebarVisible ? "" : "toggled"}`}>
      <Sidebar isVisible={isSidebarVisible} />
      <div className="flex-grow-1">
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          toggleSidebar={toggleSidebar}
        />
        <main className="main-content">
          <div className="main-wrapper">
            {children}
          </div>
        </main>
        <footer className="footer-admin">
          <p className="footer-admin__p">
            <b>AlexStore</b> Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminPage;
