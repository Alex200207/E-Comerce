import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { API_URL } from '../../constants/index.ts';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Categoria {
  ID_Categoria?: number;
  Nombre: string;
}

interface AddCategoriaModalProps {
  onProductAdded: () => void; // Función para recargar categorias después de agregar uno
}

const AddCategoriaModal: React.FC<AddCategoriaModalProps> = ({
  onProductAdded,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newCategoria, setNewCategoria] = useState<Categoria>({
    Nombre: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCategoria((prevCategoria) => ({
      ...prevCategoria,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres agregar esta categoría?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/categorias`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newCategoria),
        });

        if (response.ok) {
          await MySwal.fire({
            title: '¡Éxito!',
            text: 'Categoría agregada exitosamente.',
            icon: 'success',
          });

          setNewCategoria({
            Nombre: ""
          });
          setShowModal(false);

          // Recargar categorías en la tabla (llamando a la función pasada por props)
          if (typeof onProductAdded === "function") {
            onProductAdded();
          }
        } else {
          console.error("Error al agregar categoría:", response.statusText);
          await MySwal.fire({
            title: 'Error',
            text: 'No se pudo agregar la categoría.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error("Error al realizar la petición:", error);
        await MySwal.fire({
          title: 'Error',
          text: 'Error al realizar la petición.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="main-contenedor2">
      <Button
        className="btn-custom4"
        onClick={() => setShowModal(true)}
      >
        <IoIosAddCircleOutline className="icon-modal-add" />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="add-categoria-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="Nombre"
                value={newCategoria.Nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Categoría
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddCategoriaModal;
