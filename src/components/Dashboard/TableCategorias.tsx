import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import AddCategoriaModal from "./AddCategoriaModal";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { API_URL } from '../../constants/index.ts';
import Swal from 'sweetalert2';
import { useAuth } from "../../utils/AuthProvider.tsx";

interface Categorias {
  ID_Categoria: number;
  Nombre: string;
}

interface TableProps {
  searchTerm: string;
}

const TableCategorias: React.FC<TableProps> = ({ searchTerm }) => {
  const [selectedCategoria, setSelectedCategoria] = useState<Categorias | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar las categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al cargar las categorías', 'error');
    }
  };

  const handleEditClick = (categoria: Categorias) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/categorias/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
        })
          .then((response) => {
            if (response.ok) {
              loadCategorias();
              Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
            } else {
              throw new Error("Error al eliminar la categoría");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar la categoría:", error);
            Swal.fire('Error', 'Error al eliminar la categoría', 'error');
          });
      }
    });
  };

  const saveChanges = () => {
    if (selectedCategoria) {
      Swal.fire({
        title: '¿Guardar cambios?',
        text: "Se actualizarán los datos de la categoría.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar!'
      }).then((result) => {
        if (result.isConfirmed) {
          if (selectedCategoria.Nombre) {
            fetch(`${API_URL}/categorias/${selectedCategoria.ID_Categoria}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(selectedCategoria),
            })
              .then((response) => {
                if (!response.ok) throw new Error("Error al actualizar la categoría");
                return response.json();
              })
              .then(() => {
                loadCategorias();
                setShowModal(false);
                setSelectedCategoria(null);
                Swal.fire('Guardado!', 'La categoría ha sido actualizada.', 'success');
              })
              .catch((error) => {
                console.error("Error al guardar cambios:", error);
                Swal.fire('Error', 'Error al guardar los cambios de la categoría', 'error');
              });
          } else {
            Swal.fire('Error', 'Datos de la categoría no válidos.', 'error');
          }
        }
      });
    }
  };

  const handleCategoriaAdded = () => {
    loadCategorias(); 
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Categorias) => row.ID_Categoria,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Categorias) => row.Nombre,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: Categorias) => (
        <>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Editar</Tooltip>}
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
            overlay={<Tooltip>Eliminar</Tooltip>}
          >
            <Button
              className="btn btn-sm btn-delete"
              onClick={() => handleDeleteClick(row.ID_Categoria)}
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
      <div className="main-contenedor">
        <div className="contendorMain__titles"><h4>Administración de Categorias</h4></div>
      
      <AddCategoriaModal onProductAdded={handleCategoriaAdded} />
        <div className="table-responsive">
        <DataTable
          columns={columns}
          data={categorias.filter((categoria) =>
            categoria.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          pagination
          highlightOnHover
          striped
        /></div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCategoria && (
              <Form>
                <Form.Group controlId="edit-categoria-nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedCategoria.Nombre}
                    onChange={(e) =>
                      setSelectedCategoria({
                        ...selectedCategoria,
                        Nombre: e.target.value,
                      })
                    }
                  />
                </Form.Group>       
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TableCategorias;
