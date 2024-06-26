import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Aside from "@components/header/Aside";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Nav from "@components/header/Nav";
import Products from "@components/Products/Products";
import "./App.css"; // Asegúrate de tener un archivo CSS para los estilos


const App: React.FC = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      <Nav toggleAside={toggleAside} >
        </Nav>
  
      <div className="d-flex">
        <Aside isOpen={isAsideOpen} />
        <div className={`content ${isAsideOpen ? "" : ""}`}>
          
          <main>
          <Header
            title="Bienvenido a AlexStore"
            backgroundImage="path/to/image.jpg"
            height="600px"
          />
            <Routes>
              <Route path="/inicio" element={<Products />} />
              <Route path="/cuenta" element={<p>Cuenta</p>} />
              <Route path="/productos" element={<p>Producto</p>} />
              <Route path="/ofertas" element={<p>Oferta</p>} />
              <Route path="/contactos" element={<p>Contactos</p>} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
