import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Dashboard.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AddProductModal from "./AddProductModal";

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
 

  useEffect(() => {
    loadProducts();
    loadCategorias();
  }, []);

  const loadProducts = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data: Producto[]) => setProductos(data))
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

  const loadCategorias = () => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data: Categoria[]) => setCategorias(data))
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
        alert("Error al cargar las categorías");
      });
  };

  const saveChanges = () => {
    if (selectedProduct) {
      if (window.confirm("¿Quieres actualizar este producto?")) {
        fetch(
          `http://localhost:3000/productos/${selectedProduct.ID_Producto}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedProduct),
          }
        )
          .then((response) => {
            if (!response.ok)
              throw new Error("Error al actualizar el producto");
            return response.json();
          })
          .then(() => {
            loadProducts();
            setShowModal(false);
            setSelectedProduct(null);
          })
          .catch((error) => {
            console.error("Error al guardar cambios:", error);
            alert("Error al guardar los cambios del producto");
          });
      }
    }
  };

  const handleEditClick = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al eliminar el producto");
          return response.text();
        })
        .then((result) => {
          alert(result);
          loadProducts();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al eliminar el producto");
        });
    }
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
            overlay={<Tooltip id={`edit-tooltip-${row.ID_Producto}`}>Editar Producto</Tooltip>}
          >
            <Button
              className="btn btn-sm btn-edit"
              onClick={() => handleEditClick(row)}
            >
              <MdModeEditOutline className="btn-modal-custom"/>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`delete-tooltip-${row.ID_Producto}`}>Eliminar Producto</Tooltip>}
          >
            <Button
              className="btn btn-sm  btn-delete ms-2"
              onClick={() => handleDeleteClick(row.ID_Producto)}
            >
              <MdDelete className="btn-modal-custom"/>
            </Button>
          </OverlayTrigger>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="contendorMain__titles">
        <h4>Administración de Productos</h4>
      </div>
      <AddProductModal onProductAdded={() => loadProducts()} />
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        highlightOnHover
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group controlId="formProductName">
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
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.Stock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Stock: +e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.Precio}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Precio: +e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedProduct.Descripcion || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      Descripcion: e.target.value,
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
    </>
  );
};

export default Table;
