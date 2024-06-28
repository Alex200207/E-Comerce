import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Table: React.FC = () => {
  const saveChanges = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del producto
    console.log("Guardando cambios...");
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
            {/* Aquí puedes mostrar la lista de productos */}
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
