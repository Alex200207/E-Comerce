import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Producto {
  ID_Producto: number;
  Nombre: string;
  Categoria: string;
  Stock: number;
  Precio: number;
}

const Table: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]); 

  useEffect(() => {
    loadProducts();
  }, []); 

 
  const loadProducts = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data: Producto[]) => {
        setProductos(data); // Actualizar estado con los productos obtenidos
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar los productos");
      });
  };

  
  const saveChanges = () => {
    console.log("Guardando cambios...");
    // aqui implentar logica para guardar producto
  };

  return (
    <>
      <div className="main-contenedor">
        <section id="productos" className="card">
          <div className="search-bar mb-3">
            <input
              type="text"
              id="search-product"
              className="form-control"
              placeholder="Buscar producto..."
            />
          </div>

          <div className="list-group-item list-group-header">
            <div className="row">
              <div className="col-md-1">
                <strong>ID</strong>
              </div>
              <div className="col-md-3">
                <strong>Nombre</strong>
              </div>
              <div className="col-md-2">
                <strong>Categoría</strong>
              </div>
              <div className="col-md-2">
                <strong>Stock</strong>
              </div>
              <div className="col-md-2">
                <strong>Precio</strong>
              </div>
              <div className="col-md-2">
                <strong>Acciones</strong>
              </div>
            </div>
          </div>

          <div id="productos-list" className="list-group">
            {productos.map((producto) => (
              <div key={producto.ID_Producto} className="list-group-item">
                <div className="row">
                  <div className="col-md-1">{producto.ID_Producto}</div>
                  <div className="col-md-3">{producto.Nombre}</div>
                  <div className="col-md-2">{producto.Categoria}</div>
                  <div className="col-md-2">{producto.Stock}</div>
                  <div className="col-md-2">${producto.Precio}</div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary btn-sm btn-edit"
                      data-id={producto.ID_Producto}
                      onClick={() => {
                        //  la lógica para editar el producto
                        console.log(`Editar producto ${producto.ID_Producto}`);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm btn-delete"
                      data-id={producto.ID_Producto}
                      onClick={() => {
                        //  la lógica para eliminar el producto
                        console.log(
                          `Eliminar producto ${producto.ID_Producto}`
                        );
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div
          className="modal fade modal-custom"
          id="editProductModal"
          tabIndex={-1}
          aria-labelledby="editProductModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProductModalLabel">
                  Editar Producto
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="edit-product-form">
                  <input type="hidden" id="edit-product-id" />
                  <div className="form-group">
                    <label htmlFor="edit-product-nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit-product-nombre"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-product-descripcion">
                      Descripción
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit-product-descripcion"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-product-precio">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="edit-product-precio"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-product-stock">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      id="edit-product-stock"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-product-categoria">Categoría</label>
                    <select
                      className="form-control"
                      id="edit-product-categoria"
                      required
                    >
                      {/* Aquí puedes mostrar las opciones de categoría */}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveChanges}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
