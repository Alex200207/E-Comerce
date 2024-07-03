import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProductModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Descripcion: "",
    ImagenUrl: "",
    Precio: 0,
    Stock: 0,
    ID_Categoria: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // aqui debo implementar la logia para enviar los datos del nuevo producto al backend
    console.log("Guardando nuevo producto:", newProduct);
    // aqui debo hacer la petición POST al endpoint  para agregar el nuevo producto

    // Una vez agregado correctamente, puedes cerrar el modal y hacer cualquier otra acción necesaria
    setShowModal(false);
  };

  return (
    <div className="main-contenedor">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Producto
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="add-product-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="Nombre"
                value={newProduct.Nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Descripcion"
                value={newProduct.Descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-imagen">
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ImagenUrl"
                value={newProduct.ImagenUrl}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="Precio"
                value={newProduct.Precio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="Stock"
                value={newProduct.Stock}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="ID_Categoria"
                value={newProduct.ID_Categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                {/* Aqui debo mapear las opciones de categorías disponibles */}
                <option value="1">Categoría 1</option>
                <option value="2">Categoría 2</option>
                <option value="3">Categoría 3</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProductModal;
