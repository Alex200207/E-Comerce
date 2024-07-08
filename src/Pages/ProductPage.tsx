// src/Pages/ProductPage.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Aside from "@components/header/Aside";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Nav from "@components/header/Nav";
import Products from "@components/Products/Products";
import "../index.css"; // Asegúrate de tener un archivo CSS para los estilos

const ProductPage: React.FC = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Nav toggleAside={toggleAside} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="d-flex">
        <Aside isOpen={isAsideOpen} />
        <div className={`content ${isAsideOpen ? "aside-open" : ""}`}>
          <main>
            <Header
              title="Bienvenido a AlexStore"
              backgroundImage="path/to/image.jpg"
              height="600px"
            />
            <Routes>
              <Route path="/inicio" element={<Products searchTerm={searchTerm} />} />
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

export default ProductPage;
