import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Aside from "@components/header/Aside";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Nav from "@components/header/Nav";
import Products from "@components/Products/Products";
import ProductCategorias from "@components/Products/ProductCategorias";
import "../index.css";


const ProductPage: React.FC = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Nav toggleAside={toggleAside} onSearch={handleSearch} />
      <div className="d-flex">
        <Aside isOpen={isAsideOpen} />
        <div className={`content ${isAsideOpen ? "aside-open" : ""}`}>
          <Header
            backgroundImage="path/to/image.jpg"
            height="600px"
          />
          <main>
            <Routes>
              <Route path="inicio" element={<Products searchTerm={searchTerm} />} />
              <Route path="productos" element={<Products searchTerm={searchTerm} />} />
              <Route path="ofertas" element={<p>Oferta</p>} />
              <Route path="categorias" element={<ProductCategorias />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
