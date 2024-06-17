// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchProductos(), fetchCategorias()])
    .then(([productos, categorias]) => {
      actualizarProductosHTML(productos, categorias);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Función para obtener productos del servidor
async function fetchProductos() {
  const response = await fetch("http://localhost:3000/producto");
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  return response.json();
}

// Función para obtener categorías del servidor
async function fetchCategorias() {
  const response = await fetch("http://localhost:3000/categorias");
  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }
  return response.json();
}

// Función para actualizar el HTML con productos y categorías recibidos
function actualizarProductosHTML(productos, categorias) {
  const contenedorProductos = document.getElementById("contenedor-productos");

  productos.forEach((producto) => {
    // Encontrar la categoría correspondiente al producto
    const categoria = categorias.find(
      (cat) => cat.ID_Categoria === producto.ID_Categoria
    );

    // Crear elemento de columna Bootstrap
    const columna = document.createElement("div");
    columna.classList.add("col-md-4", "col-sm-6", "mb-4");

    // Crear tarjeta de producto
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");
    tarjeta.innerHTML = `
        <img class="card-img-top" src="https://via.placeholder.com/350x250" alt="${
          producto.Nombre
        }">
        <div class="card-body">
          <h4 class="card-title">${producto.Nombre}</h4>
          <p class="card-text">Descripción: ${producto.Descripcion}</p>
          <p class="card-text">Categoría: ${
            categoria ? categoria.Nombre : "Sin categoría"
          }</p>
          <p class="card-text">Precio: ${producto.Precio}</p>
          <a href="#" class="btn btn-primary">Ver producto</a>
        </div>
      `;

    // Agregar tarjeta al contenedor de productos
    columna.appendChild(tarjeta);
    contenedorProductos.appendChild(columna);
  });
}
