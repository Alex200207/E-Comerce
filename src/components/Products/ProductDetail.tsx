import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  ID_Categoria: number;
  ImagenUrl: string;
  Precio: number;
}

interface ProductDetailProps {
  show: boolean;
  onHide: () => void;
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ show, onHide, product }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg"> 
      <Modal.Header closeButton>
        <Modal.Title>{product.Nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img src={product.ImagenUrl} alt={product.Nombre} className="img-fluid mb-3" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        </div>
        <p>{product.Descripcion}</p>
        <p>Precio: ${product.Precio}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => alert(`Agregado al carrito: ${product.id}`)}>
          Agregar al carrito
        </Button>
        <Button variant="primary" onClick={() => alert(`Producto Comprado: ${product.id}`)}>
          Comprar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;
