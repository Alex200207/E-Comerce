import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
interface Producto {
  ID_Producto?: number; // Puede ser opcional si no se tiene ID al agregar
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
    Codigo:"",
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data: Categoria[]) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
        alert("Error al cargar las categorías");
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
    if (!window.confirm("¿Quieres agregar este producto?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        console.log("Producto agregado exitosamente:", newProduct);
        setNewProduct({
          Nombre: "",
          ID_Categoria: 0,
          Stock: 0,
          Precio: 0,
          Codigo:"",
          ImagenUrl: "", // Limpiar ImagenUrl después de agregar
        });
        loadCategorias(); // Recargar categorías si es necesario
        // Cierra el modal después de agregar el producto
        setShowModal(false);

        // Recargar productos en la tabla (llamando a la función pasada por props)
        if (typeof onProductAdded === "function") {
          onProductAdded();
        }

        // Ocultar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Error al agregar producto:", response.statusText);
        // Aquí podrías manejar el error de la petición, mostrar un mensaje al usuario, etc.
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      // Aquí maneja cualquier error de red u otros errores inesperados
    }
  };

  return (
    <div className="main-contenedor2">
      <Button
        variant="btn-custom"
        className="btn-custom"
        onClick={() => setShowModal(true)}
      >
        <IoIosAddCircleOutline className="icon-modal-add" />
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

      {showSuccessMessage && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-2"
          style={{ zIndex: 1060, left: "50%", transform: "translateX(-50%)" }}
        >
          Producto agregado exitosamente.
        </Alert>
      )}
    </div>
  );
};

export default AddProductModal;
