import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import SearchBar from "../Dashboard/SearchBar";

interface Vendedor {
  ID_Vendedor: number;
  Nombre: string;
  Productos: {
    ID_Producto: number;
    Nombre: string;
  }[];
}

const TableVendedores: React.FC = () => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [selectedVendedor, setSelectedVendedor] = useState<Vendedor | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadVendedores();
  }, []);

  const loadVendedores = () => {
    fetch("http://localhost:3000/vendedores")
      .then((response) => response.json())
      .then((data: Vendedor[]) => {
        console.log("Datos de vendedores:", data); // Depurar datos recibidos
        setVendedores(data);
      })
      .catch((error) => {
        console.error("Error al cargar los vendedores:", error);
        alert("Error al cargar los vendedores");
      });
  };

  const handleVendedorClick = (vendedor: Vendedor) => {
    console.log("Vendedor seleccionado:", vendedor); // Depurar vendedor seleccionado
    setSelectedVendedor(vendedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendedor(null);
  };

  const columns = [
    {
      name: "ID Vendedor",
      selector: (row: Vendedor) => row.ID_Vendedor,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Vendedor) => row.Nombre,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: Vendedor) => (
        <button
          className="btn btn-primary btn-sm btn-view"
          onClick={() => handleVendedorClick(row)}
        >
          Ver Productos
        </button>
      ),
    },
  ];

  return (
    <>
      <SearchBar searchTerm={""} onSearchChange={() => {}} />
      <div className="main-contenedor">
        <DataTable
          columns={columns}
          data={vendedores}
          pagination
          highlightOnHover
          striped
        />
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedVendedor?.Nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVendedor ? (
              <>
                <h5>Productos de {selectedVendedor.Nombre}</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID Producto</th>
                      <th>Nombre Producto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedVendedor.Productos.map((producto) => (
                      <tr key={producto.ID_Producto}>
                        <td>{producto.ID_Producto}</td>
                        <td>{producto.Nombre}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <p>No se ha seleccionado ningún vendedor</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TableVendedores;
