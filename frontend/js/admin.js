document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCategories();
});

// Función para cargar productos
function loadProducts() {
  fetch("http://localhost:3000/productos")
    .then((response) => response.json())
    .then((productos) => {
      const productosList = document.getElementById("productos-list");
      productosList.innerHTML = "";

      productos.forEach((producto) => {
        const productoItem = createProductItem(producto);
        productosList.appendChild(productoItem);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al cargar los productos");
    });
}

// Función para crear un elemento de producto
function createProductItem(producto) {
  const productoItem = document.createElement("div");
  productoItem.className = "list-group-item";
  productoItem.innerHTML = `
        <h5 class="mb-1">${producto.Nombre}</h5>
        <p class="mb-1">${producto.Descripcion}</p>
        <small>Precio: $${producto.Precio} | Stock: ${producto.Stock}</small>
        <div class="mt-2">
            <button class="btn btn-primary btn-sm btn-edit" data-id="${producto.ID_Producto}">Editar</button>
            <button class="btn btn-danger btn-sm btn-delete" data-id="${producto.ID_Producto}">Eliminar</button>
        </div>
      `;

  // Agregar eventos para editar y eliminar
  productoItem.querySelector(".btn-edit").addEventListener("click", () => {
    editProduct(producto);
  });

  productoItem.querySelector(".btn-delete").addEventListener("click", () => {
    deleteProduct(producto.ID_Producto);
  });

  return productoItem;
}

// Función para editar un producto
function editProduct(producto) {
  // Mostrar el modal de edición de productos
  $("#editProductModal").modal("show");

  // Inicializar los campos del formulario de edición
  document.getElementById("edit-product-id").value = producto.ID_Producto;
  document.getElementById("edit-product-nombre").value = producto.Nombre;
  document.getElementById("edit-product-descripcion").value =
    producto.Descripcion;
  document.getElementById("edit-product-precio").value = producto.Precio;
  document.getElementById("edit-product-stock").value = producto.Stock;

  // Selección de categoría actual del producto
  document.getElementById("edit-product-categoria").value =
    producto.ID_Categoria;
}

// Función para guardar cambios en un producto
function saveChanges() {
  const id = document.getElementById("edit-product-id").value;
  const nombre = document.getElementById("edit-product-nombre").value;
  const descripcion = document.getElementById("edit-product-descripcion").value;
  const precio = document.getElementById("edit-product-precio").value;
  const stock = document.getElementById("edit-product-stock").value;
  const categoria = document.getElementById("edit-product-categoria").value;

  const data = {
    Nombre: nombre,
    Descripcion: descripcion,
    Precio: parseFloat(precio),
    ID_Categoria: parseInt(categoria),
    Stock: parseInt(stock),
  };

  fetch(`http://localhost:3000/producto/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
      return response.text();
    })
    .then((result) => {
      alert(result);
      $("#editProductModal").modal("hide");
      loadProducts(); // Actualizar la lista de productos después de editar
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al actualizar el producto");
    });
}

// Función para eliminar un producto
function deleteProduct(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
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
        loadProducts(); // Actualizar la lista de productos después de eliminar
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el producto");
      });
  }
}

// Función para cargar categorías
function loadCategories() {
  fetch("http://localhost:3000/categorias")
    .then((response) => response.json())
    .then((categorias) => {
      const selectCategoria = document.getElementById("edit-product-categoria");
      selectCategoria.innerHTML = "";

      categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.ID_Categoria;
        option.textContent = categoria.Nombre;
        selectCategoria.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al cargar las categorías");
    });
}

// Buscar productos
document.getElementById("search-product").addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();
  const productosItems = document.querySelectorAll(
    "#productos-list .list-group-item"
  );

  productosItems.forEach((item) => {
    const productName = item.querySelector("h5").textContent.toLowerCase();
    if (productName.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
