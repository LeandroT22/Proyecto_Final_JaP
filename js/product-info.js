let productoID = localStorage.getItem("ProdID")
let listaDeProductos = document.getElementById("PRODUCTO");
let nombreCategoria = document.getElementById("NOMBRE_CAT_PROD");

// Cambié el nombre de la función para adaptarla a un solo producto
function Mostrar_Producto(product) {
PRODUCTO.innerHTML = ` 
        <div class="col-md-12">
            <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${product.images[0]}" class="img-fluid" alt="${product.name}">
                    </div>
                    <div class="col-md-6 product-info" style="text-align:center; padding-top: 100px;">
                        <h5 id="n">${product.name}</h5>
                        <p>Vendidos: ${product.soldCount}</p>
                        <p id="p">Precio: ${product.currency} ${product.cost}</p>
                    </div>
                </div>

                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <img src="${product.images[1]}" class="col-md-2" alt="${product.name}">
                <img src="${product.images[2]}" class="col-md-2" alt="${product.name}">
                <img src="${product.images[3]}" class="col-md-2" alt="${product.name}">
                </div>
                <br>
                <p class="col-md-12" style="width: 100%; text-align:center;">Descripción del artículo: ${product.description}</p>
            </div>
        </div>
    `;
}

// Suponiendo que getJSONData(PRODUCT_URL) devuelve un JSON con un único producto.
getJSONData(PRODUCT_INFO_URL + productoID + ".json").then((result) => {
if (result.status === "ok") {
    // Dado que solo tienes un producto, se pasa directamente al renderizador
    Mostrar_Producto(result.data);
    nombreCategoria.innerText = result.data.category;
} else {
    console.error("No se pudieron obtener los datos:", result.data);
}
});