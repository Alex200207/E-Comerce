import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/ProtectedRoutes';
import Login from './components/AuthPages/Login';
import AdminPage from './Pages/AdminPage';
import TableCategorias from '@components/Dashboard/TableCategorias';
import Table from '@components/Dashboard/Table';
import TableVendedores from '@components/Dashboard/TableVendedores';
import IndexPage from './layout/IndexPage';
import ProductPage from './Pages/ProductPage';
import TableClient from '@components/Dashboard/TableClient';
import Register from '@components/AuthPages/Register';

const AppRouter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Routes>
   
      <Route path="/productPage/*" element={<ProductPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />




   
      <Route element={<PrivateRoutes searchTerm={searchTerm} onSearchChange={handleSearchChange} />}>
        <Route path="/home" element={<IndexPage />} />
        <Route path="/adminPage" element={<AdminPage searchTerm={searchTerm} onSearchChange={handleSearchChange} />} />
        <Route path="/productos" element={<Table searchTerm={searchTerm} />} />
        <Route path="/categorias" element={<TableCategorias searchTerm={searchTerm} />} />
        <Route path="/clientes" element={<TableClient searchTerm={searchTerm} />} />
        <Route path="/vendedores" element={<TableVendedores searchTerm={searchTerm} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
