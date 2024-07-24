import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import AddCategoriaModal from "./AddCategoriaModal";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { API_URL } from '../../constants/index.ts';

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

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar las categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar las categorias");
    }
  };

  const handleEditClick = (categoria: Categorias) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        const response = await fetch(`${API_URL}/categorias/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error('Error al eliminar la categoría');
        const result = await response.text();
        alert(result);
        loadCategorias();
      } catch (error) {
        console.error(error);
        alert("Error al eliminar la categoría");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (selectedCategoria) {
      try {
        const response = await fetch(`${API_URL}/categorias/${selectedCategoria.ID_Categoria}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedCategoria),
        });
        if (!response.ok) throw new Error('Error al guardar los cambios');
        await response.json();
        alert("Cambios guardados con éxito");
        setShowModal(false);
        loadCategorias();
      } catch (error) {
        console.error(error);
        alert("Error al guardar los cambios");
      }
    }
  };

  const handleCategoriaAdded = () => {
    loadCategorias(); // Recargar categorías después de agregar una
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
      <AddCategoriaModal onProductAdded={handleCategoriaAdded} />

      <div className="main-contenedor">
        <DataTable
          columns={columns}
          data={categorias.filter((categoria) =>
            categoria.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          pagination
          highlightOnHover
          striped
        />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="edit-categoria-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCategoria?.Nombre || ""}
                  onChange={(e) =>
                    setSelectedCategoria((prev) => ({
                      ...prev!,
                      Nombre: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TableCategorias;
