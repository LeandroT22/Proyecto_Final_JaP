let categoria=localStorage.getItem("catID");
let PRODUCT_URL =
"https://japceibal.github.io/emercado-api/cats_products/"+ categoria +".json";
let listaDeProductos = document.getElementById("PRODUCTOS");
let nombreCategoria = document.getElementById("NOMBRE_CAT");
let minPrice = undefined;
let maxPrice = undefined;
let currentProductsArray = [];

function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}

function Mostrar_Productos(products) {
PRODUCTOS.innerHTML = "";
  products.forEach((product) => {
     // Verifica si el producto está dentro del rango
     if (((minPrice == undefined) || (minPrice != undefined && product.cost >= minPrice)) &&
     ((maxPrice == undefined) || (maxPrice != undefined && product.cost <= maxPrice))) {
    PRODUCTOS.innerHTML += `
            <div class="col-md-4 cursor-active">
                <div onclick="setProdID(${product.id})" class="card h-100" style="width: 100%;">
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
      }
  });
}

//Funcion para ordenar
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === "asc") {
    result = array.sort((a, b) => a.cost - b.cost);
  } else if (criteria === "desc") {
    result = array.sort((a, b) => b.cost - a.cost);
  } else if (criteria === "soldCount") {
    result = array.sort((a, b) => b.soldCount - a.soldCount);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function() {
getJSONData(PRODUCT_URL).then((result) => {
  if (result.status === "ok") {
    currentProductsArray = result.data.products;
    Mostrar_Productos(currentProductsArray);
    nombreCategoria.innerText = result.data.catName;
  } else {
    console.error("No se pudieron obtener los datos:", result.data);
  }
});

// Ascendente por precio
document.getElementById("sortAsc").addEventListener("click", function() {
  let sortedProducts = sortProducts("asc", currentProductsArray);
  Mostrar_Productos(sortedProducts);
});

// Descendente por precio
document.getElementById("sortDesc").addEventListener("click", function() {
  let sortedProducts = sortProducts("desc", currentProductsArray);
  Mostrar_Productos(sortedProducts);
});

// Relevancia 
document.getElementById("sortByCount").addEventListener("click", function() {
  let sortedProducts = sortProducts("soldCount", currentProductsArray);
  Mostrar_Productos(sortedProducts);
});

// Filtro por precio
document.getElementById("rangeFilterCount").addEventListener("click", function() {
  minPrice = document.getElementById("rangeFilterCountMin").value;
  maxPrice = document.getElementById("rangeFilterCountMax").value;

  if (minPrice != undefined && minPrice != "" && parseInt(minPrice) >= 0) {
    minPrice = parseInt(minPrice);
  } else {
    minPrice = undefined;
  }

  if (maxPrice != undefined && maxPrice != "" && parseInt(maxPrice) >= 0) {
    maxPrice = parseInt(maxPrice);
  } else {
    maxPrice = undefined;
  }

  Mostrar_Productos(currentProductsArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function() {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
  minPrice = undefined;
  maxPrice = undefined;

  Mostrar_Productos(currentProductsArray);
});
});