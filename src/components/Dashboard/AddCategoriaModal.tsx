import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    if (!window.confirm("¿Quieres agregar este categoria?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoria),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        console.log("Categoria agregada exitosamente:", newCategoria);
        setNewCategoria({
          Nombre: "",
        });

        // Cierra el modal después de agregar el categoria
        setShowModal(false);

        // Recargar categorias en la tabla (llamando a la función pasada por props)
        if (typeof onProductAdded === "function") {
          onProductAdded();
        }

        // Ocultar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Error al agregar categoria:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
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
          <Modal.Title>Agregar categoria</Modal.Title>
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
            Guardar Categoria
          </Button>
        </Modal.Footer>
      </Modal>

      {showSuccessMessage && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-2"
          style={{ zIndex: 1060, left: "50%", transform: "translateX(-50%)" }}
        >
          Categoria agregada exitosamente.
        </Alert>
      )}
    </div>
  );
};

export default AddCategoriaModal;
