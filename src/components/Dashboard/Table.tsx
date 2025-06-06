import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Alert,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import AddProductModal from "./AddProductModal";
import Swal from "sweetalert2";

import { API_URL } from "../../constants/index.ts";
import { useAuth } from "../../utils/AuthProvider.tsx";

interface Producto {
  ID_Producto: number;
  Nombre: string;
  ID_Categoria: number;
  Stock: number;
  Precio: number;
  ImagenUrl: string;
  Descripcion?: string;
  Codigo: string;
}

interface Categoria {
  ID_Categoria: number;
  Nombre: string;
}

interface TableProps {
  searchTerm: string;
}

const Table: React.FC<TableProps> = ({ searchTerm }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [deleteSuccess, setShowSuccessMessage] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    loadProducts();
    loadCategorias();
  }, []);

  const loadProducts = () => {
    fetch(`${API_URL}/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

  const loadCategorias = () => {
    fetch(`${API_URL}/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data: Categoria[]) => setCategorias(data))
      .catch((error) => {
        console.error("Error al cargar las categorias:", error);
        alert("Error al cargar las categorías");
      });
  };

  const saveChanges = () => {
    if (selectedProduct) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres actualizar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          if (
            selectedProduct.Nombre &&
            selectedProduct.Precio >= 0 &&
            selectedProduct.Stock >= 0 &&
            selectedProduct.ImagenUrl &&
            selectedProduct.Descripcion
          ) {
            fetch(`${API_URL}/productos/${selectedProduct.ID_Producto}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(selectedProduct),
            })
              .then((response) => {
                if (!response.ok)
                  throw new Error("Error al actualizar el producto");
                return response.json();
              })
              .then(() => {
                loadProducts();
                setShowModal(false);
                setSelectedProduct(null);

                Swal.fire({
                  title: "Actualizado",
                  text: "El producto ha sido actualizado correctamente.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
              })
              .catch((error) => {
                console.error("Error al guardar cambios:", error);
                Swal.fire({
                  title: "Error",
                  text: "Hubo un error al actualizar el producto.",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 2000,
                });
              });
          } else {
            Swal.fire({
              title: "Datos inválidos",
              text: "Por favor, completa todos los campos correctamente.",
              icon: "warning",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      });
    }
  };

  const handleEditClick = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Swal.fire({
      title: " Estás seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminarlo",
      cancelButtonText: "Cancelar",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/productos/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
        })
          .then((response) => {
            if (response.ok) {
              loadProducts();
              Swal.fire(
                "Eliminado!",
                "La categoría ha sido eliminada.",
                "success"
              );
            } else {
              throw new Error("Error al eliminar la categoría");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar la categoría:", error);
            Swal.fire("Error", "Error al eliminar la categoría", "error");
          });
      }
    });
  };

  const getNombreCategoria = (idCategoria: number): string => {
    const categoria = categorias.find(
      (cat) => cat.ID_Categoria === idCategoria
    );
    return categoria ? categoria.Nombre : "Sin categoría";
  };

  const filteredProducts = productos.filter((producto) =>
    producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleViewClick = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowViewModal(true);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Producto) => row.ID_Producto,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Producto) => row.Nombre,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row: Producto) => getNombreCategoria(row.ID_Categoria),
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: Producto) => row.Stock,
      sortable: true,
    },
    {
      name: "Código",
      selector: (row: Producto) => `#${row.Codigo}`,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row: Producto) => `$${row.Precio}`,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: Producto) => (
        <>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`edit-tooltip-${row.ID_Producto}`}>Ver</Tooltip>
            }
          >
            <Button
              className="btn btn-sm btn-edit"
              onClick={() => handleViewClick(row)}
            >
              <GrFormView className="btn-modal-custom" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`edit-tooltip-${row.ID_Producto}`}>
                Editar Producto
              </Tooltip>
            }
          >
            <Button
              className="btn btn-sm btn-edit"
              onClick={() => handleEditClick(row)}
            >
              <MdModeEditOutline className="btn-modal-custom" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`delete-tooltip-${row.ID_Producto}`}>
                Eliminar Producto
              </Tooltip>
            }
          >
            <Button
              className="btn btn-sm btn-delete ms-2"
              onClick={() => handleDeleteClick(row.ID_Producto)}
            >
              <MdDelete className="btn-modal-custom" />
            </Button>
          </OverlayTrigger>
        </>
      ),
    },
  ];

  return (
    <>
      {deleteSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessMessage(false)}
          dismissible
          className="position-fixed top-0 start-50 translate-middle-x mt-2"
          style={{ zIndex: 1060, left: "50%", transform: "translateX(-50%)" }}
        >
          Producto eliminado con éxito.
        </Alert>
      )}

      <div className="contendorMain__titles">
        <h4>Administración de Productos</h4>
      </div>

      <AddProductModal onProductAdded={() => loadProducts()} />

      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          highlightOnHover
          striped
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.Nombre}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.Precio}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Precio: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formImageUrl">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  type="text"
                  value={selectedProduct.ImagenUrl}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      ImagenUrl: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formImageUrl">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  type="text"
                  value={selectedProduct.Descripcion}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.Stock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Stock: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedProduct.ID_Categoria}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      ID_Categoria: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">Seleccionar categoría</option>
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para visualizar producto */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p>
                <strong>Nombre:</strong> {selectedProduct.Nombre}
              </p>
              <p>
                <strong>Precio:</strong> ${selectedProduct.Precio}
              </p>
              <p>
                <strong>Stock:</strong> {selectedProduct.Stock}
              </p>
              <p>
                <strong>Categoría:</strong>{" "}
                {getNombreCategoria(selectedProduct.ID_Categoria)}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedProduct.Descripcion}
              </p>
              <p>
                <strong>URL de la Imagen:</strong>{" "}
                <a
                  href={selectedProduct.ImagenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedProduct.ImagenUrl}
                </a>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;
