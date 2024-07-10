import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import backgroundImage1 from '@images/ecommerceM.jpg';
import backgroundImage2 from '@images/ecommerce.jpg'; // Ejemplo de otra imagen de fondo

interface HeaderProps {
  backgroundImage: string;
  height: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundImage, height }) => {
  const [index, setIndex] = useState(0);
  const images = [
    { src: backgroundImage1, title: 'Bienvenido a AlexStore', description: 'Descubre nuestras mejores ofertas en productos.' },
    { src: backgroundImage2, title: 'Ofertas exclusivas para ti', description: 'Descubre nuestros productos exclusivos.' },
  ];

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <header
      className='header-custom'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        height,
        position: 'relative',
      }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000} // Intervalo en milisegundos para el movimiento automático
        pause="hover" // Se pausa al pasar el mouse sobre él
      >
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 block-custom"
              src={image.src}
              alt={`Slide ${idx + 1}`}
              style={{
                height,
              }}
            />
            <Carousel.Caption className=" present-custom" style={{ position: 'absolute', bottom: '25%', right: '50%' }}>
              <h1 className="display-4">{image.title}</h1>
              <p className="lead mb-5">{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </header>
  );
};

export default Header;
