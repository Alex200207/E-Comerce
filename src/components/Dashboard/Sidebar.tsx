import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const Sidebar: React.FC = () => {
  return (
    <>
    <div className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                    className="fas fa-user-secret me-2"></i>AlexStore</div>
            <div className="list-group list-group-flush my-3">
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                        className="fas fa-tachometer-alt me-2"></i>Gestion</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-project-diagram me-2"></i>Productos</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-chart-line me-2"></i>Categorias</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-paperclip me-2"></i>clientes</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-shopping-cart me-2"></i>Vendedores</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-gift me-2"></i>Proveedores</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-comment-dots me-2"></i>Chat</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-map-marker-alt me-2"></i>Outlet</a>
                <a href="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                        className="fas fa-power-off me-2"></i>Salir</a>
            </div>
        </div>
        </>
  );
};

export default Sidebar;
