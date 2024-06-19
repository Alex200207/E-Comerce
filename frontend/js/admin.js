
document.addEventListener("DOMContentLoaded", () => {
  // Cargar categorías y productos
  fetch("http://localhost:3000/categorias")
    .then((response) => response.json())
    .then((categorias) => {
      const categoriaSelect = document.getElementById("ID_Categoria");
      const categoriasList = document.getElementById("categorias-list");

      categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.ID_Categoria;
        option.textContent = categoria.Nombre;
        categoriaSelect.appendChild(option);

        const categoriaItem = document.createElement("div");
        categoriaItem.className = "category-item";
        categoriaItem.innerHTML = `
                      <p>${categoria.Nombre}</p>
                      <button class="btn btn-secondary btn-edit" data-id="${categoria.ID_Categoria}">Editar</button>
                      <button class="btn btn-danger btn-delete" data-id="${categoria.ID_Categoria}">Eliminar</button>
                  `;
        categoriasList.appendChild(categoriaItem);
      });
    });

  fetch("http://localhost:3000/productos")
    .then((response) => response.json())
    .then((productos) => {
      const productosList = document.getElementById("productos-list");

      productos.forEach((producto) => {
        const productoItem = document.createElement("div");
        productoItem.className = "product-item";
        productoItem.innerHTML = `
                      <p>${producto.Nombre}</p>
                      <p>${producto.Descripcion}</p>
                      <p>${producto.Precio}</p>
                      <p>${producto.ID_Categoria}</p>
                      <p>${producto.Stock}</p>
                      <button class="btn btn-secondary btn-edit" data-id="${producto.ID_Producto}">Editar</button>
                      <button class="btn btn-danger btn-delete" data-id="${producto.ID_Producto}">Eliminar</button>
                  `;
        productosList.appendChild(productoItem);
      });
    });

  // Agregar nueva categoría
  document
    .getElementById("categoria-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      fetch("http://localhost:3000/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar la categoría");
          }
          return response.text();
        })
        .then((result) => {
          alert(result);
          event.target.reset();
          location.reload(); 
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al agregar la categoría");
        });
    });

  // Agregar nuevo producto
  document
    .getElementById("producto-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar el producto");
          }
          return response.text();
        })
        .then((result) => {
          alert(result);
          event.target.reset();
          location.reload(); // Recargar la página para ver los cambios
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al agregar el producto");
        });
    });

  // Eliminar categoría
  document
    .getElementById("categorias-list")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-delete")) {
        const id = event.target.getAttribute("data-id");
        fetch(`http://localhost:3000/categoria/${id}`, {
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
            location.reload(); // Recargar la página para ver los cambios
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error al eliminar la categoría");
          });
      }
    });

  // Eliminar producto
  document
    .getElementById("productos-list")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-delete")) {
        const id = event.target.getAttribute("data-id");
        fetch(`http://localhost:3000/producto/${id}`, {
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
            location.reload(); // Recargar la página para ver los cambios
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error al eliminar el producto");
          });
      }
    });

  // Editar categoría
  document
    .getElementById("categorias-list")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-edit")) {
        const id = event.target.getAttribute("data-id");
        const newName = prompt(
          "Ingrese el nuevo nombre de la categoría:"
        );
        if (newName) {
          fetch(`http://localhost:3000/categoria/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Nombre: newName }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al actualizar la categoría");
              }
              return response.text();
            })
            .then((result) => {
              alert(result);
              location.reload(); // Recargar la página para ver los cambios
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error al actualizar la categoría");
            });
        }
      }
    });

  // Editar producto
  document
    .getElementById("productos-list")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-edit")) {
        const id = event.target.getAttribute("data-id");
        const newName = prompt("Ingrese el nuevo nombre del producto:");
        const newDescription = prompt(
          "Ingrese la nueva descripción del producto:"
        );
        const newPrice = prompt("Ingrese el nuevo precio del producto:");
        const newCategory = prompt(
          "Ingrese la nueva categoría del producto:"
        );
        const newStock = prompt("Ingrese el nuevo stock del producto:");
        if (
          newName &&
          newDescription &&
          newPrice &&
          newCategory &&
          newStock
        ) {
          fetch(`http://localhost:3000/producto/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Nombre: newName,
              Descripcion: newDescription,
              Precio: newPrice,
              ID_Categoria: newCategory,
              Stock: newStock,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al actualizar el producto");
              }
              return response.text();
            })
            .then((result) => {
              alert(result);
              location.reload(); // Recargar la página para ver los cambios
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error al actualizar el producto");
            });
        }
      }
    });
});
