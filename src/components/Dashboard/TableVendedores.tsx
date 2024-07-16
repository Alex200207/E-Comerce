import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import SearchBar from "../Dashboard/SearchBar";
import { Button, Modal } from "react-bootstrap";

interface Vendedor {
  ID_Vendedor: number;
  Nombre: string;
}

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

const TableVendedores: React.FC = () => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showProductosModal, setShowProductosModal] = useState<boolean>(false);
  const [productosDelVendedor, setProductosDelVendedor] = useState<Producto[]>([]);
  const [selectedVendedor, setSelectedVendedor] = useState<Vendedor | null>(null);

  useEffect(() => {
    loadProductos();
    loadVendedores();
  }, []);

  const loadProductos = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data: Producto[]) => {
        console.log("Datos de productos:", data);
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

  const loadVendedores = () => {
    fetch("http://localhost:3000/vendedores")
      .then((response) => response.json())
      .then((data: Vendedor[]) => {
        console.log("Datos de vendedores:", data);
        setVendedores(data);
      })
      .catch((error) => {
        console.error("Error al cargar los vendedores:", error);
        alert("Error al cargar los vendedores");
      });
  };

  const loadProductosVendedor = (ID_Vendedor: number) => {
    fetch(`http://localhost:3000/productosVendedores/${ID_Vendedor}`)
      .then((response) => response.json())
      .then((data: Producto[]) => {
        console.log("Datos de productos del vendedor:", data);
        // Filtrar los productos que pertenecen al vendedor seleccionado
        const productosDelVendedor = productos.filter((producto) =>
          data.some((pv) => pv.ID_Producto === producto.ID_Producto)
        );
        setProductosDelVendedor(productosDelVendedor);
        setSelectedVendedor(vendedores.find((v) => v.ID_Vendedor === ID_Vendedor) || null);
        setShowProductosModal(true);
      })
      .catch((error) => {
        console.error("Error al cargar los productos del vendedor:", error);
        alert("Error al cargar los productos del vendedor");
      });
  };

  const handleCloseProductosModal = () => {
    setShowProductosModal(false);
    setProductosDelVendedor([]);
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
        <Button variant="primary" onClick={() => loadProductosVendedor(row.ID_Vendedor)}>
          Ver Productos
        </Button>
      ),
    },
  ];

  const productosColumns = [
    {
      name: "ID Producto",
      selector: (row: Producto) => row.ID_Producto,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Producto) => row.Nombre,
      sortable: true,
    },
    {
      name: "ID Categoría",
      selector: (row: Producto) => row.ID_Categoria,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: Producto) => row.Stock,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row: Producto) => row.Precio,
      sortable: true,
    },
    {
      name: "Imagen",
      cell: (row: Producto) => (
        <div className="zoom-image">
          <img
            src={row.ImagenUrl}
            alt={row.Nombre}
            style={{ maxWidth: "50px", cursor: "zoom-in" }}
            onClick={() => window.open(row.ImagenUrl, "_blank")}
          />
        </div>
      ),
    },
    {
      name: "Descripción",
      selector: (row: Producto) => row.Descripcion || "N/A",
    },
    {
      name: "Código",
      selector: (row: Producto) => row.Codigo,
      sortable: true,
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

        {/* Modal para mostrar productos */}
        <Modal show={showProductosModal} onHide={handleCloseProductosModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Productos de {selectedVendedor?.Nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "500px", overflowY: "auto" }}>
            <DataTable
              columns={productosColumns}
              data={productosDelVendedor}
              pagination
              highlightOnHover
              striped
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductosModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TableVendedores;
