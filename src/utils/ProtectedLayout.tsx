import React from 'react';
import Navbar from '@components/Dashboard/Navbar';
import { Outlet } from 'react-router-dom';

interface ProtectedLayoutProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
