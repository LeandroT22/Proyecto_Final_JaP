let currentTabIndex = 0;

function nextTab() {
    // Obtener todos los elementos de pestañas
    const tabs = document.querySelectorAll('#myTab .nav-link');
    // Ocultar la pestaña actual
    tabs[currentTabIndex].classList.remove('active');
    document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.remove('show', 'active');


    // Avanzar al siguiente índice de pestaña
    currentTabIndex = (currentTabIndex + 1) % tabs.length;


    // Mostrar la nueva pestaña
    tabs[currentTabIndex].classList.add('active');
    document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.add('show', 'active');
}

function prevTab() {
    // Obtener todos los elementos de pestañas
    const tabs = document.querySelectorAll('#myTab .nav-link');
    // Ocultar la pestaña actual
    tabs[currentTabIndex].classList.remove('active');
    document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.remove('show', 'active');

    // Retroceder al índice de la pestaña anterior
    currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;

    // Mostrar la nueva pestaña
    tabs[currentTabIndex].classList.add('active');
    document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.add('show', 'active');
}

// Mostrar el producto en el carrito
function displayCartProduct() {
  const currentUser = localStorage.getItem("currentUser");
  let cartProducts =
    JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
  let cartContainer = document.getElementById("cart-container");
  let shippingOptions = document.getElementById("shipping");

  // Verificar si hay productos en el carrito
  if (cartProducts.length === 0) {
    shippingOptions.innerHTML = "";
    cartContainer.innerHTML = `
            <div class="textoCarrito">
                <p style="font-size: 160%;">Carrito vacío</p>
                <a href="categories.html" style="color: cornflowerblue;">Agrega productos a tu carrito aquí</a>
            </div>
        `;
  } else {
    cartContainer.innerHTML = "";
    cartProducts.forEach((cartProduct, index) => {
      const productSubtotal = cartProduct.cost * cartProduct.cantidad; // Sin multiplicar por 44
      cartContainer.innerHTML += `
            <div class="row align-items-center mt-4">
                <div class="col-2">
                    <img src="${
                      cartProduct.image
                    }" class="img-fluid rounded" alt="${cartProduct.name}">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fw-bold mb-0">${cartProduct.name}</h4>
                            <p class="text-success mb-0" style="font-size: large; font-weight: bolder;">${
                              cartProduct.currency
                            } ${cartProduct.cost}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="me-2">Cantidad: <span id="cantidad_${index}">${
        cartProduct.cantidad
      }</span></span>
                            <div class="btn-group" role="group" aria-label="Quantity controls">
                                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                            </div>
                        </div>
                        <div>
                            <p class="fw-bold" style="text-align: center; margin-top: 10%; font-size: large;">Subtotal: <span id="productSubtotal_${index}" class="fw-bold text-success" style="font-size: large;">${
        cartProduct.currency
      } ${productSubtotal.toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            `;

            shippingOptions.innerHTML = `
<div class="d-flex justify-content-center align-items-center" style="text-align: center;border: solid lightgrey; padding:10px;">
    <div class="container mt-5" style="max-width: 600px;">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist" hidden>
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Método de envío</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Forma de pago</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">Costos</button>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                <br>
                <h5 class="card-title text-center">Tipo de envío</h5><br>
                <div id="inputradio">
                    <form>
                        <input type="radio" id="envio-premium" name="forma-envio" value="premium">
                        <label for="option1">Premium 2 a 5 días (15%)</label><br>
                        <input type="radio" id="envio-express" name="forma-envio" value="express">
                        <label for="option2">Express 5 a 8 días (7%)</label><br>
                        <input type="radio" id="envio-standar" name="forma-envio" value="standar">
                        <label for="option3">Standard 12 a 15 días (5%)</label>
                    </form><br>
                </div>
                <h5 class="card-title text-center">Dirección de envío</h5><br>
                    <form>
                      <label for="dp">Departamento:</label>
                      <input type="text" id="dp" name="dp"><br><br>
                      <label for="local">Localidad:</label>
                      <input type="text" id="local" name="local"><br><br>
                      <label for="st">Calle:</label>
                      <input type="text" id="st" name="st"><br><br>
                      <label for="n">Número:</label>
                      <input type="text" id="n" name="n"><br><br>
                      <label for="corner">Esquina:</label>
                      <input type="text" id="corner" name="corner"><br><br>
                    </form>
                    <button class="btn btn-primary mt-3" onclick="nextTab()">Siguiente</button>
            </div>
            <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <form>
                    <br>
                    <input type="radio" id="tarjeta" name="forma-pago" value="tarjeta">
                    <label for="html">Tarjeta de crédito</label><br><br>
                    <label for="numero-tarjeta">Número de tarjeta:</label>
                    <input type="text" id="numero-tarjeta" name="numero-tarjeta"><br><br>
                    <label for="vencimiento">Fecha de vencimiento:</label>
                    <input type="text" id="vencimiento" name="vencimiento"><br><br>
                    <label for="codigo-verificador">Código verificador:</label>
                    <input type="text" id="codigo-verificador" name="codigo-verificador"><br><br>
                    <br>
                    <input type="radio" id="transferencia" name="forma-pago" value="transferencia">
                    <label for="html">Transferencia bancaria</label><br><br>
                    <label for="cuenta-bancaria">Número de cuenta:</label>
                    <input type="text" id="cuenta-bancaria" name="cuenta-bancaria"><br><br>
                </form>
                <button class="btn btn-primary mt-3" onclick="prevTab()">Volver</button>
                <button class="btn btn-primary mt-3" onclick="nextTab()">Siguiente</button>
            </div>
            <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                <br>
                <p>Subtotal: $$$</p>
                <br>
                <p>Costo de envío: $$$</p>
                <br>
                <p>Total: $$$</p>
                <br><br>
                <button class="btn btn-primary" id="BtnFinalizarCompra">Finalizar compra</button>
                <br>
                <button class="btn btn-primary mt-3" onclick="prevTab()">Volver</button>
            </div>
        </div>
    </div>
</div>
`;

            

    });

    // Agregar el total general al final del carrito
    cartContainer.innerHTML += `
            <div style="text-align: center; margin-top: 10%; font-size: xx-large;">
                <h4 class="fw-bold">Total: <span class="text-success" id="total"></span></h4>
            </div>
        `;

    // Calcular y mostrar el total inicial
    updateTotal();
  }

    //Funcionalidad botón Finalizar compra
  if (document.getElementById("BtnFinalizarCompra")) {
   document.getElementById("BtnFinalizarCompra").addEventListener("click", finalizarCompra);
  }
  
}

// Función para actualizar la cantidad de productos
function updateQuantity(index, change) {
  const currentUser = localStorage.getItem("currentUser");
  let cartProducts =
    JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];

  // Actualizar la cantidad del producto seleccionado
  if (change < 0 && cartProducts[index].cantidad === 1) {
    // Si la cantidad es 1 y se intenta restar, eliminar el producto del carrito
    cartProducts.splice(index, 1);
  } else {
    cartProducts[index].cantidad = Math.max(
      1,
      cartProducts[index].cantidad + change
    ); // Evita que la cantidad sea menor a 1
  }

  // Guardar los cambios en el localStorage
  localStorage.setItem(`carrito_${currentUser}`, JSON.stringify(cartProducts));

  // Actualizar la interfaz
  displayCartProduct(); // Volver a mostrar el carrito
}

// Función para calcular y mostrar el total de todos los productos
function updateTotal() {
  const currentUser = localStorage.getItem("currentUser");
  let cartProducts =
    JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
  let total = 0;

  // Calcular el total sumando el subtotal de cada producto, multiplicando por 44 si es USD
  cartProducts.forEach((product) => {
    const productTotal =
      product.currency === "USD"
        ? product.cost * 44 * product.cantidad
        : product.cost * product.cantidad;
    total += productTotal;
  });

  // Mostrar el total en el elemento correspondiente
  const totalElement = document.getElementById("total");
  if (totalElement && cartProducts.length > 0) {
    totalElement.textContent = `UYU ${total.toFixed(2)}`;
  }
}

// Mostrar el producto en el carrito al cargar la página
document.addEventListener("DOMContentLoaded", displayCartProduct);

//Validar los campos y mostrar mensaje de compra exitosa

function finalizarCompra() {

  //Validar dirección
  const departamento = document.getElementById("dp").value.trim();
  const localidad = document.getElementById("local").value.trim();
  const calle = document.getElementById("st").value.trim();
  const numero = document.getElementById("n").value.trim();
  const esquina = document.getElementById("corner").value.trim();

  if (!departamento || !localidad || !calle || !numero || !esquina) {
    alert("Por favor, completa todos los campos de la dirección.");
    return;
}

// Validar forma de envío
const formaEnvio = document.querySelector('input[name="forma-envio"]:checked');
if (!formaEnvio) {
    alert("Por favor, selecciona una forma de envío.");
    return;
}

// Validar cantidad de productos
const cantidades = document.querySelectorAll(".product-quantity");
for (let cantidad of cantidades) {
    if (cantidad.value <= 0 || cantidad.value === "") {
        alert("Por favor, define una cantidad válida para todos los productos.");
        return;
    }
}

 // Validar forma de pago
 const formaPago = document.querySelector('input[name="forma-pago"]:checked');
 if (!formaPago) {
     alert("Por favor, selecciona una forma de pago.");
     return;
 }

  // Validar campos asociados a la forma de pago
  if (formaPago.value === "tarjeta") {
    const numeroTarjeta = document.getElementById("numero-tarjeta").value.trim();
    const vencimiento = document.getElementById("vencimiento").value.trim();
    const codigoVerificador = document.getElementById("codigo-verificador").value.trim();
    if (!numeroTarjeta || !vencimiento || !codigoVerificador) {
      alert("Por favor, completa todos los campos de la tarjeta de crédito.");
      return;
  }
} else if (formaPago.value === "transferencia") {
  const numeroCuenta = document.getElementById("cuenta-bancaria").value.trim();
  if (!numeroCuenta) {
      alert("Por favor, completa el campo del número de cuenta bancaria.");
      return;
  }
}

// Se cumplen todas las validaciones
const carritoUser = `carrito_${localStorage.getItem("currentUser")}`;
alert("¡Compra exitosa! Gracias por tu compra.");
localStorage.removeItem(carritoUser);
location.reload();
};

