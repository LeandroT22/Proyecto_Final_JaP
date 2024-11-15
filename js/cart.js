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
<div class="centered-container">
        <div class="form-content">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="envio-tab" data-bs-toggle="tab" data-bs-target="#envio-tab-pane" type="button" role="tab" aria-controls="envio-tab-pane" aria-selected="true">Método de envío</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pago-tab" data-bs-toggle="tab" data-bs-target="#pago-tab-pane" type="button" role="tab" aria-controls="pago-tab-pane" aria-selected="false">Forma de pago</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="costos-tab" data-bs-toggle="tab" data-bs-target="#costos-tab-pane" type="button" role="tab" aria-controls="costos-tab-pane" aria-selected="false">Costos</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="envio-tab-pane" role="tabpanel" aria-labelledby="envio-tab" tabindex="0">
            <br>
            <h5 class="card-title">Tipo de envío</h5><br>
            <div id= "inputradio">  
            <form>
            <input type="radio" id="html" name="option" value="HTML">
            <label for="html">Premium 2 a 5 días (15%)</label><br>
            <input type="radio" id="css" name="option" value="CSS">
            <label for="css">Express 5 a 8 días (7%)</label><br>
            <input type="radio" id="javascript" name="option" value="JavaScript">
            <label for="javascript">Standard 12 a 15 días (5%)</label>
        </form><br>
    </div>
            <h5 class="card-title">Dirección de envío</h5><br>
        <form >
            <label for="fname">Departamento:</label>
            <input type="text" id="fname" name="fname"><br><br>
            <label for="lname">Localidad:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <label for="lname">Calle:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <label for="lname">Número:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <label for="lname">Esquina:</label>
            <input type="text" id="lname" name="lname"><br><br>
        </form>
        <div class="nav-item" role="presentation">
        <button class="btn btn-primary" id="pago-tab2" data-bs-toggle="tab" data-bs-target="#pago-tab-pane" type="button" role="tab" aria-controls="pago-tab-pane" aria-selected="true">Siguiente</button>
    </div>
    </div>

        <div class="tab-pane fade" id="pago-tab-pane" role="tabpanel" aria-labelledby="pago-tab" tabindex="0">
            <form>
                <br>
                <input type="radio" id="html" name="option" value="HTML">
            <label for="html">Tarjeta de crédito</label><br><br>
            <label for="fname">Número:</label>
            <input type="text" id="fname" name="fname"><br><br>
            <label for="lname">Fecha de vencimiento:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <label for="lname">Código verificador:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <br>
            <input type="radio" id="html" name="option" value="HTML">
            <label for="html">Transferencia bancaria</label><br><br>
            <label for="fname">Número de cuenta:</label>
            <input type="text" id="fname" name="fname"><br><br>
            </form>
            <button class="btn btn-primary">Siguiente</button>
        </div>

        <div class="tab-pane fade" id="costos-tab-pane" role="tabpanel" aria-labelledby="costos-tab" tabindex="0">
            <br>
            <p>Subtotal: $$$</p>
            <br>
            <p>Costo de envío: $$$</p>
            <br>
            <p>Total: $$$</p>
            <br><br>
            <button class="btn btn-primary">Finalizar compra</button>
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

