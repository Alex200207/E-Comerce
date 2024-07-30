import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import backgroundImage3 from '@images/bannerlog3.png';
import backgroundImage2 from '@images/banner-rosa.png';
import backgroundImage1 from '@images/bannerlog.png';

interface HeaderProps {
  backgroundImage: string;
  height: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundImage, height }) => {
  const [index, setIndex] = useState(0);
  const images = [
    { src: backgroundImage1, title: 'Bienvenido a AlexStore', description: 'Descubre nuestras mejores ofertas en productos.', textColor: '#fff' },
    { src: backgroundImage2, title: 'Ofertas exclusivas para ti', description: 'Descubre nuestros productos exclusivos.', textColor: '#000000' },
    { src: backgroundImage3, title: 'Los mejores productos', description: 'Las mejores ofertas.', textColor: '#fff' }, 
  ];

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <header
      className='header-custom'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height,
        position: 'relative',
      }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2500}
        pause="hover"
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
            <Carousel.Caption className="present-custom" style={{ position: 'absolute', bottom: '25%', right: '50%' }}>
              <h1 className="display-4" style={{ color: image.textColor }}>{image.title}</h1>
              <p className="lead mb-5" style={{ color: image.textColor }}>{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </header>
  );
};

export default Header;
