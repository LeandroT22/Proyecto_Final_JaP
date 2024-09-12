 let categoria=localStorage.getItem("catID");
 let PRODUCT_URL =
"https://japceibal.github.io/emercado-api/cats_products/"+categoria+".json";
let listaDeProductos = document.getElementById("PRODUCTOS");
let nombreCategoria = document.getElementById("NOMBRE_CAT");

function Mostrar_Productos(products) {
PRODUCTOS.innerHTML = "";
  products.forEach((product) => {
    PRODUCTOS.innerHTML += `
            <div class="col-md-4 cursor-active">
                <div class="card h-100" style="width: 100%;">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title title" id="n">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
    <li class="list-group-item" id="p" >Precio: ${product.currency} ${product.cost}</li>
    <li class="list-group-item">Vendidos: ${product.soldCount}</li>
  </ul>
                </div>
            </div>
        `;
  });
}

getJSONData(PRODUCT_URL).then((result) => {
  if (result.status === "ok") {
    let sortedProducts = result.data.products.sort((a, b) => a.cost - b.cost); //Ordena los productos por su costo de menor a mayor//
    Mostrar_Productos(result.data.products);
    nombreCategoria.innerText = result.data.catName;
  } else {
    console.error("No se pudieron obtener los datos:", result.data);
  }
});
