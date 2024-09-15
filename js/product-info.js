let productoID = localStorage.getItem("ProdID");
let listaDeProductos = document.getElementById("PRODUCTO");
let nombreCategoria = document.getElementById("NOMBRE_CAT_PROD");

function Mostrar_Producto(product) {
  PRODUCTO.innerHTML = `
<div class="container-fluid" style="width:90%;">
    <div class="row">
        <!-- Columna de las imágenes -->
        <div class="col-md-8 col-sm-12 d-flex flex-column align-items-center">
            <img id="imagenPrincipal" src="${product.images[0]}" class="img-fluid mb-3" alt="${product.name}" style="max-width: 80%; margin-top:30px;">
            <div class="row mt-3 justify-content-center" style="width:90%;">
                <div class="col-3 col-md-3 d-flex justify-content-center">
                    <img src="${product.images[1]}" class="img-fluid small-imageM" alt="${product.name}" data-index="1">
                </div>
                <div class="col-3 col-md-3 d-flex justify-content-center">
                    <img src="${product.images[2]}" class="img-fluid small-imageM" alt="${product.name}" data-index="2">
                </div>
                <div class="col-3 col-md-3 d-flex justify-content-center">
                    <img src="${product.images[3]}" class="img-fluid small-imageM" alt="${product.name}" data-index="3">
                </div>
                 <div class="col-3 col-md-3 d-flex justify-content-center">
                    <img src="${product.images[0]}" class="img-fluid small-imageM" alt="${product.name}" data-index="3">
                </div>
            </div>
        </div>

        <!-- Columna del texto -->
        <div id="contenedorInfo" class="col-md-4 col-sm-12 product-info d-flex flex-column justify-content-center text-center" style="margin-top:10px; font-size: 20px;">
            <h5 id="n">${product.name}</h5>
            <p>Vendidos: ${product.soldCount}</p>
            <p id="p">Precio: ${product.currency} ${product.cost}</p>
            <h5 class="mt-4">Descripción del artículo:</h5>
            <p class="mx-auto" style="width: 80%; font-style: italic; color: dimgray;">${product.description}</p>
        </div>
    </div>
</div>

    `;
}

// getJSONData(PRODUCT_URL) devuelve los productos.
getJSONData(PRODUCT_INFO_URL + productoID + ".json").then((result) => {
  if (result.status === "ok") {
    // Dado que solo tienes un producto, se pasa directamente al renderizador
    Mostrar_Producto(result.data);
    nombreCategoria.innerHTML =
      `<a href="products.html">Volver</a> | <a href="categories.html">Categorías</a>  >  <a href="products.html">Productos</a>  > ` +
      result.data.category;
    // Obtener el elemento de la imagen principal y todas las imágenes pequeñas
    const imagenPrincipal = document.getElementById("imagenPrincipal");
    const smallImages = document.querySelectorAll(".small-imageM");

    // Agregar el evento de clic a cada imagen pequeña
    smallImages.forEach((image) => {
      image.addEventListener("mouseover", function () {
        // Cambiar la imagen principal por la imagen bajo el cursor
        imagenPrincipal.src = this.src;
      });
    });
  } else {
    console.error("No se pudieron obtener los datos:", result.data);
  }
});
