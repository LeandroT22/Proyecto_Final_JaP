const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
document.addEventListener("DOMContentLoaded", function() {
  //nombre de usuario localStorage
  const nombreUsuario = localStorage.getItem("currentUser");
  
  // Verificar si hay un usuario autenticado
  if (nombreUsuario) {
      // Cambiar el texto del botón para mostrar el nombre del usuario
      document.getElementById("nombreUsuarioBtn").textContent = nombreUsuario;
  } 
});

// Función de cierre de sesión
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("darkMode");
  window.location.href = "login.html"; // Redirigir a la página de login
}

document.addEventListener("DOMContentLoaded", function() {
  const currentUser = localStorage.getItem('currentUser');
  let badge = document.getElementById('cartBadge');
  let cartProducts = JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
 
  const cantidadTotal = cartProducts.reduce((accum, product) => accum + product.cantidad, 0);


  badge.innerHTML = ` ${cantidadTotal}`;
});