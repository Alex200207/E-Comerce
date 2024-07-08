
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from '../../assets/images/ecommerceM.jpg';

interface HeaderProps {
  title: string;
  backgroundImage: string;
  height: string;
}


const Header: React.FC<HeaderProps> = ({ height }) => {
  return (
    
    <header className='header-custom'
    
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        height ,
        position: 'relative', 
  
      }}
    >
        <div className="container h-100 background-custom">
          <div className="row h-100 align-items-center container-custom">
            <div className="col-lg-12 present-custom">
              <h1 className="display-4  mt-5 ">
                Bienvenido a AlexStore
              </h1>
              <p className="lead mb-5 text-dark">
                Descubre nuestras mejores ofertas en productos.
              </p>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
