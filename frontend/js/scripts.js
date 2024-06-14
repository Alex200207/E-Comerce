document.addEventListener("DOMContentLoaded", () => {
  let categorias = {};

  // Obtener las categorías desde el servidor
  fetch("http://localhost:3000/api/categorias")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((categoria) => {
        categorias[categoria.ID_Categoria] = categoria.Nombre;
      });

      // Después de obtener las categorías, obtener los productos
      fetch("http://localhost:3000/api/productos")
        .then((response) => response.json())
        .then((data) => {
          const productosDiv = document.getElementById("productos");

          // Mostrar productos por categoría
          for (const idCategoria in categorias) {
            const nombreCategoria = categorias[idCategoria];
            const categoriaProductos = data.filter(
              (producto) => producto.ID_Categoria == idCategoria
            );

            if (categoriaProductos.length > 0) {
              const categoriaDiv = document.createElement("div");
              categoriaDiv.className = "categoria";
              categoriaDiv.innerHTML = `<h2>${nombreCategoria}</h2>`;

              categoriaProductos.forEach((producto) => {
                const productoDiv = document.createElement("div");
                productoDiv.className = "producto";
                productoDiv.innerHTML = `
                  <h3>${producto.Nombre}</h3>
                  <p>${producto.Descripcion}</p>
                  <p>Precio: $${producto.Precio}</p>
                  <p>Stock: ${producto.Stock}</p>
                `;
                categoriaDiv.appendChild(productoDiv);
              });

              productosDiv.appendChild(categoriaDiv);
            }
          }
        })
        .catch((error) => console.error("Error:", error));
    })
    .catch((error) => console.error("Error:", error));
});
