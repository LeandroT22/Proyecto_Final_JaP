 // Example starter JavaScript for disabling form submissions if there are invalid fields
 (function () {
  'use strict'








  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')








  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }








        form.classList.add('was-validated')
      }, false);
    })
})()
















let currentTabIndex = 0;








function validateCurrentTab() {
  const currentTab = document.querySelectorAll(".tab-pane")[currentTabIndex];
  const form = currentTab.querySelector(".needs-validation");
  if (form) {
      // Validar el formulario de la pestaña actual
      if (!form.checkValidity()) {
          form.classList.add("was-validated");
          return false; // No avanzar si el formulario no es válido
      }
  }
  return true; // Avanzar si el formulario es válido o no hay formulario en la pestaña
}








function nextTab() {
  if (validateCurrentTab()) {
      const tabs = document.querySelectorAll('#myTab .nav-link');
      tabs[currentTabIndex].classList.remove('active');
      document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.remove('show', 'active');








      // Avanzar al siguiente índice de pestaña
      currentTabIndex = (currentTabIndex + 1) % tabs.length;








      // Mostrar la nueva pestaña
      tabs[currentTabIndex].classList.add('active');
      document.getElementById(tabs[currentTabIndex].getAttribute('data-bs-target').substring(1)).classList.add('show', 'active');
  }
}








function prevTab() {
  const tabs = document.querySelectorAll('#myTab .nav-link');
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








            shippingOptions.innerHTML = `<div class="container mt-5">
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
    <div class="tab-content mt-3 tabcontainer">
        <!-- TAB1 -->
        <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <br>
            <h5 class="card-title centeredElementC">Tipo de envío</h5><br>
            <form class="needs-validation" novalidate>
            <div class="form-check centeredElementR">
                <input type="radio" class="form-check-input" id="validationFormCheck1" name="radio-stacked" required>
                <label class="form-check-label" for="validationFormCheck1"  style="margin-right:11px;">Premium 2 a 5 días (15%)</label>
              </div>
              <div class="form-check centeredElementR">
                <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required>
                <label class="form-check-label" for="validationFormCheck2" style="margin-right:30px;">Express 5 a 8 días (7%)</label>
              </div>
              <div class="form-check centeredElementR">
                <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required>
                <label class="form-check-label" for="validationFormCheck3">Standard 12 a 15 días (5%)</label>
              </div>
        <br><br>
            <h5 class="card-title centeredElementC">Dirección de envío</h5>
                <div class="mb-3">
                  <label for="exampleInput1" class="form-label">Departamento:</label>
                  <input type="text" class="form-control" id="exampleInput1" required>
                  <div class="invalid-feedback">
                    Por favor, complete este campo.
                  </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInput2" class="form-label">Localidad:</label>
                    <input type="text" class="form-control" id="exampleInput2" required>
                    <div class="invalid-feedback">
                      Por favor, complete este campo.
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInput3" class="form-label">Calle:</label>
                    <input type="text" class="form-control" id="exampleInput3" required>
                    <div class="invalid-feedback">
                      Por favor, complete este campo.
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInput4" class="form-label">Número:</label>
                    <input type="text" class="form-control" id="exampleInput4" required>
                    <div class="invalid-feedback">
                      Por favor, complete este campo.
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInput5" class="form-label">Esquina:</label>
                    <input type="text" class="form-control" id="exampleInput5" required>
                    <div class="invalid-feedback">
                      Por favor, complete este campo.
                    </div>
                  </div>
              </form>
              <button type="submit" class="btn btn-primary mt-3" onclick="nextTab()">Siguiente</button>
        </div>
        <!-- TAB2 -->
        <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <br>
            <h5 class="card-title centeredElementC">Forma de pago</h5><br>
            <form class="needs-validation" novalidate>
            <div class="form-check">
                <input type="radio" class="form-check-input" id="validationFormCheck4" name="radio-stacked" required>
                <label class="form-check-label" for="validationFormCheck4">Tarjeta de crédito:</label>
              </div>
              <br>
              <div class="mb-3">
                <label for="exampleInput5" class="form-label">Número de tarjeta:</label>
                <input type="text" class="form-control" id="exampleInput5" required>
                <div class="invalid-feedback">
                  Por favor, complete este campo.
                </div>
              </div>
              <div class="mb-3">
                  <label for="exampleInput6" class="form-label">Fecha de vencimiento:</label>
                  <input type="text" class="form-control" id="exampleInput6" required>
                  <div class="invalid-feedback">
                    Por favor, complete este campo.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInput7" class="form-label">Código verificador:</label>
                  <input type="text" class="form-control" id="exampleInput7" required>
                  <div class="invalid-feedback">
                    Por favor, complete este campo.
                  </div>
                </div>
        <br>
        <div class="form-check">
            <input type="radio" class="form-check-input" id="validationFormCheck5" name="radio-stacked" required >
            <label class="form-check-label" for="validationFormCheck5">Transferencia bancaria:</label>
          </div>
          <br>
                  <div class="mb-3">
                    <label for="exampleInput8" class="form-label">Número de cuenta:</label>
                    <input type="text" class="form-control" id="exampleInput8" required>
                    <div class="invalid-feedback">
                      Por favor, complete este campo.
                    </div>
                  </div>
              </form>
              <button class="btn btn-primary mt-3" onclick="prevTab()">Volver</button>
              <button type="submit" class="btn btn-primary mt-3" onclick="nextTab()">Siguiente</button>
        </div>
      <!-- TAB3 -->
<div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
  <br>
  <h5 class="card-title">Costos</h5><br>
  <p id="subtotalTab">Subtotal: </p>
  <br>
  <p id="shippingTab">Costo de envío: </p>
  <br>
  <p id="totalTab" style="color: green;">Total: </p>
  <br><br>
  <button id="BtnFinalizarCompra" class="btn btn-primary">Finalizar compra</button>
  <br>
  <button class="btn btn-primary mt-3" onclick="prevTab()">Volver</button>
</div>


    </div>
</div>
`;


calculateTotals(); // Calcular y mostrar los totales iniciales


function updateShippingCost() {
  const selectedOption = document.querySelector('input[name="radio-stacked"]:checked');
  if (!selectedOption) return 0; // Sin opción seleccionada, costo es 0
  const shippingRates = {
    "validationFormCheck1": 0.15, // Premium
    "validationFormCheck2": 0.07, // Express
    "validationFormCheck3": 0.05, // Standard
  };
  return shippingRates[selectedOption.id] || 0;
}


function calculateTotals() {
  const currentUser = localStorage.getItem("currentUser");
  let cartProducts = JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
 
  let subtotal = 0;


  // Calcular subtotal
  cartProducts.forEach((product) => {
    const productTotal =
      product.currency === "USD"
        ? product.cost * 44 * product.cantidad
        : product.cost * product.cantidad;
    subtotal += productTotal;
  });


  // Calcular costo de envío
  const shippingCost = subtotal * updateShippingCost();


  // Calcular total
  const total = subtotal + shippingCost;


  // Mostrar en TAB3
  document.getElementById("subtotalTab").innerText = `Subtotal: UYU ${subtotal.toFixed(2)}`;
  document.getElementById("shippingTab").innerText = `Costo de envío: UYU ${shippingCost.toFixed(2)}`;
  document.getElementById("totalTab").innerText = `Total: UYU ${total.toFixed(2)}`;
}


// Agregar escucha para recalcular cuando se cambia el método de envío
document.querySelectorAll('input[name="radio-stacked"]').forEach((input) => {
  input.addEventListener('change', calculateTotals);
});


    });








      // Manejo inicial de campos en función del método de pago seleccionado
  let radio1 = document.getElementById("validationFormCheck4");
  let radio2 = document.getElementById("validationFormCheck5");
  let tarjetaInputs = document.querySelectorAll("#exampleInput5, #exampleInput6, #exampleInput7");
  let cuentaInput = document.getElementById("exampleInput8");








  function toggleFields() {
      if (radio1.checked) {
          // Habilitar campos de tarjeta y deshabilitar transferencia
          tarjetaInputs.forEach(input => input.removeAttribute("disabled"));
          cuentaInput.setAttribute("disabled", "");
          cuentaInput.value = '';
      } else if (radio2.checked) {
          // Habilitar transferencia y deshabilitar tarjeta
          tarjetaInputs.forEach(input => input.setAttribute("disabled", ""));
          cuentaInput.removeAttribute("disabled");
          tarjetaInputs.forEach(input => input.value ='');
      }
  }








  // Escuchar cambios en los radios
  radio1.addEventListener("change", toggleFields);
  radio2.addEventListener("change", toggleFields);








  // Inicializar estado al cargar la página
  toggleFields();








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
  // Validar cantidades de productos
  const cantidades = document.querySelectorAll(".product-quantity");
  for (let cantidad of cantidades) {
      if (cantidad.value <= 0 || cantidad.value === "") {
          Swal.fire({
              icon: "error",
              title: "Cantidad inválida",
              text: "Por favor, define una cantidad válida para todos los productos.",
          });
          return;
      }
  }








  // Se cumplen todas las validaciones
  const carritoUser = `carrito_${localStorage.getItem("currentUser")}`;
  Swal.fire({
      icon: "success",
      title: "¡Compra exitosa! Gracias por preferirnos.",
      showConfirmButton: false,
      timer: 1500,
  }).then(() => {
      // Limpiar el carrito y recargar la página
      localStorage.removeItem(carritoUser);
      location.reload();
  });
}
