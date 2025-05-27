import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { Button, Modal } from "react-bootstrap";
import { API_URL } from '../../constants/index.ts';
import { useAuth } from "../../utils/AuthProvider.tsx";

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

interface TableProps {
  searchTerm: string;
}

const TableVendedores: React.FC<TableProps> = ({ searchTerm }) => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showProductosModal, setShowProductosModal] = useState<boolean>(false);
  const [productosDelVendedor, setProductosDelVendedor] = useState<Producto[]>([]);
  const [selectedVendedor, setSelectedVendedor] = useState<Vendedor | null>(null);
  const [showProductoDetalleModal, setShowProductoDetalleModal] = useState<boolean>(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadProductos();
    loadVendedores();
  }, []);

  const loadProductos = async () => {
    fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
      }
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

  const loadVendedores = async () => {
    try {
      const response = await fetch("http://localhost:3000/vendedores");
      const data: Vendedor[] = await response.json();
      setVendedores(data);
    } catch (error) {
      console.error("Error al cargar los vendedores:", error);
      alert("Error al cargar los vendedores");
    }
  };

  const loadProductosVendedor = async (ID_Vendedor: number) => {
    try {
      const response = await fetch(`http://localhost:3000/productosVendedores/${ID_Vendedor}`);
      const data: Producto[] = await response.json();
      const productosDelVendedor = productos.filter((producto) =>
        data.some((pv) => pv.ID_Producto === producto.ID_Producto)
      );
      setProductosDelVendedor(productosDelVendedor);
      setSelectedVendedor(vendedores.find((v) => v.ID_Vendedor === ID_Vendedor) || null);
      setShowProductosModal(true);
    } catch (error) {
      console.error("Error al cargar los productos del vendedor:", error);
      alert("Error al cargar los productos del vendedor");
    }
  };

  const handleCloseProductosModal = () => {
    setShowProductosModal(false);
    setProductosDelVendedor([]);
    setSelectedVendedor(null);
  };

  const openProductoDetalleModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setShowProductoDetalleModal(true);
  };

  const closeProductoDetalleModal = () => {
    setShowProductoDetalleModal(false);
    setProductoSeleccionado(null);
  };

  const filteredVendedores = vendedores.filter((vendedor) =>
    vendedor.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      name: "Acciones",
      cell: (row: Producto) => (
        <Button variant="info" onClick={() => openProductoDetalleModal(row)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="main-contenedor">
        <div className="contendorMain__titles"><h4>Administración de Vendedores</h4></div>
        <div className="table-responsive">
        <DataTable
          columns={columns}
          data={filteredVendedores}
          pagination
          highlightOnHover
          striped
        /></div>

        {/* Modal para mostrar productos */}
        <Modal show={showProductosModal} onHide={handleCloseProductosModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Productos de {selectedVendedor?.Nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
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

        {/* Modal para mostrar detalle de producto */}
        <Modal show={showProductoDetalleModal} onHide={closeProductoDetalleModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4">
                <div className="imagen-container">
                  <img
                    src={productoSeleccionado?.ImagenUrl}
                    alt={productoSeleccionado?.Nombre}
                    className="producto-imagen"
                    style={{ maxWidth: "100%", cursor: "pointer" }}
                    onClick={() => window.open(productoSeleccionado?.ImagenUrl, "_blank")}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <h5>ID Producto: {productoSeleccionado?.ID_Producto}</h5>
                <p>Nombre: {productoSeleccionado?.Nombre}</p>
                <p>ID Categoría: {productoSeleccionado?.ID_Categoria}</p>
                <p>Stock: {productoSeleccionado?.Stock}</p>
                <p>Precio: {productoSeleccionado?.Precio}</p>
                <p>Descripción: {productoSeleccionado?.Descripcion || "N/A"}</p>
                <p>Código: {productoSeleccionado?.Codigo}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeProductoDetalleModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TableVendedores;
