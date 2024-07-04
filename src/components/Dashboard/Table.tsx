import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import SearchBar from "../Dashboard/SearchBar";
import AddProductModal from "./AddProductModal";

interface Producto {
  ID_Producto: number;
  Nombre: string;
  ID_Categoria: number;
  Stock: number;
  Precio: number;
  ImagenUrl: string;
  Descripcion?: string;
  Codigo:string;
}

interface Categoria {
  ID_Categoria: number;
  Nombre: string;
}

const Table: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategorias();
  }, []);

  const loadProducts = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data: Producto[]) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

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
            if (!response.ok) {
              throw new Error("Error al actualizar el producto");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
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
          if (!response.ok) {
            throw new Error("Error al eliminar el producto");
          }
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productos.filter((producto) =>
    producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductAdded = () => {
    loadProducts(); // Recargar productos después de agregar uno
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
      name: "Codigo",
      selector: (row: Producto) => row.Codigo,
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
          <button
            className="btn btn-primary btn-sm btn-edit"
            onClick={() => handleEditClick(row)}
          >
            Ver
          </button>
          <button
            className="btn btn-danger btn-sm btn-delete"
            onClick={() => handleDeleteClick(row.ID_Producto)}
          >
            Eliminar
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <AddProductModal onProductAdded={handleProductAdded} />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="main-contenedor">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          highlightOnHover
          striped
        />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="edit-product-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.Nombre || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      Nombre: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="edit-product-Codigo">
                <Form.Label>Codigo</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.Codigo || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      Codigo: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="edit-product-descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.Descripcion || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      Descripcion: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="edit-product-Imagen">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct?.ImagenUrl|| ""}
                    onChange={(e) =>
                      setSelectedProduct((prev) => ({
                        ...prev!,
                        ImagenUrl: e.target.value,
                      }))
                    }
                  />
                </Form.Group>

              <Form.Group controlId="edit-product-precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct?.Precio || 0}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      Precio: parseFloat(e.target.value),
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="edit-product-stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct?.Stock || 0}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      Stock: parseInt(e.target.value, 10),
                    }))
                  }
                />

               
              </Form.Group>
              <Form.Group controlId="edit-product-categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedProduct?.ID_Categoria || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
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
            <Button variant="primary" onClick={saveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Table;
