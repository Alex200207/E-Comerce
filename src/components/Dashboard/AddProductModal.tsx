import React, { useState, useEffect } from "react";
import { Modal, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { API_URL } from '../../constants/index.ts';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Producto {
  ID_Producto?: number; 
  Nombre: string;
  ID_Categoria: number;
  Stock: number;
  Precio: number;
  ImagenUrl: string;
  Codigo: string;
  Descripcion?: string;
}

interface Categoria {
  ID_Categoria: number;
  Nombre: string;
}

interface AddProductModalProps {
  onProductAdded: () => void; // Función para recargar productos después de agregar uno
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onProductAdded,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Producto>({
    Nombre: "",
    ID_Categoria: 0,
    Stock: 0,
    Precio: 0,
    ImagenUrl: "",
    Codigo: "",
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => response.json())
      .then((data: Categoria[]) => setCategorias(data))
      .catch((error) => {
        console.error("Error al cargar las categorias:", error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las categorías.',
          icon: 'error'
        });
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const result = await MySwal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres agregar este producto?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        const response = await fetch(`${API_URL}/productos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          await MySwal.fire({
            title: '¡Éxito!',
            text: 'Producto agregado exitosamente.',
            icon: 'success',
            showConfirmButton:false,
            timer:2000,
          });

          setNewProduct({
            Nombre: "",
            ID_Categoria: 0,
            Stock: 0,
            Precio: 0,
            Codigo: "",
            ImagenUrl: "", // Limpiar ImagenUrl después de agregar
          });
          loadCategorias(); // Recargar categorías si es necesario
          setShowModal(false);

          if (typeof onProductAdded === "function") {
            onProductAdded();
          }
        } else {
          console.error("Error al agregar producto:", response.statusText);
          await MySwal.fire({
            title: 'Error',
            text: 'No se pudo agregar el producto.',
            icon: 'error',
          });
        }
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      await MySwal.fire({
        title: 'Error',
        text: 'Error al realizar la petición.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="main-contenedor2">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-add-product">Agregar producto</Tooltip>}
      >
        <Button
          className="btn-custom4"
          onClick={() => setShowModal(true)}
        >
          <IoIosAddCircleOutline className="icon-modal-add" />
        </Button>
      </OverlayTrigger>
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

            <Form.Group controlId="add-product-Codigo">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                name="Codigo"
                value={newProduct.Codigo}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="add-product-descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="Descripcion"
                value={newProduct.Descripcion || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="add-product-imagen">
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                type="text"
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
                value={newProduct.ID_Categoria}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    ID_Categoria: parseInt(e.target.value),
                  }))
                }
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.ID_Categoria}
                    value={categoria.ID_Categoria}
                  >
                    {categoria.Nombre}
                  </option>
                ))}
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
