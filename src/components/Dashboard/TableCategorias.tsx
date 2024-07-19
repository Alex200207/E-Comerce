import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import DataTable from "react-data-table-component";
import { Modal, Button, Form } from "react-bootstrap";
import AddCategoriaModal from "./AddCategoriaModal";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Categorias {
  ID_Categoria: number;
  Nombre: string;
}
interface TableProps {
    searchTerm: string;
  }

const TableCategorias: React.FC<TableProps> = ({searchTerm}) => {
  const [selectedCategoria, setSelectedCategoria] = useState<Categorias | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<Categorias[]>([]);


  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((categorias: Categorias[]) => {
        setCategorias(categorias);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
        alert("Error al cargar las categorías");
      });
  };

  const handleEditClick = (categoria: Categorias) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      fetch(`http://localhost:3000/categorias/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar la categoría");
          }
          return response.text();
        })
        .then((result) => {
          alert(result);
          loadCategorias();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al eliminar la categoría");
        });
    }
  };


  const filteredCategorias = categorias.filter((categoria) =>
    categoria.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveChanges = () => {
    if (selectedCategoria) {
      fetch(
        `http://localhost:3000/categorias/${selectedCategoria.ID_Categoria}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedCategoria),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al guardar los cambios");
          }
          return response.json();
        })
        .then(() => {
          alert("Cambios guardados con éxito");
          setShowModal(false);
          loadCategorias();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al guardar los cambios");
        });
    }
  };
  const handleCategoriaAdded = () => {
    loadCategorias(); // Recargar productos después de agregar uno
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
          <button
            className="btn  btn-sm btn-edit"
            onClick={() => handleEditClick(row)}
          >
            <MdModeEditOutline className="btn-modal-custom" />
          </button>
          <button
            className="btn btn-sm btn-delete"
            onClick={() => handleDeleteClick(row.ID_Categoria)}
          >
            <MdDelete className="btn-modal-custom" />
          </button>
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
          data={filteredCategorias}
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
