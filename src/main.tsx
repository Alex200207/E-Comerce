import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';


import { BASENAME } from './constants';
import ProductPage from './Pages/ProductPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
