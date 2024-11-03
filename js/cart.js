// Mostrar el producto en el carrito
function displayCartProduct() {
    const currentUser = localStorage.getItem('currentUser');
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
    let cartContainer = document.getElementById('cart-container');


    // Verificar si hay productos en el carrito
    if (cartProducts.length === 0) {
        cartContainer.innerHTML = `
            <div class="textoCarrito">
                <p style="font-size: 160%;">Carrito vacío</p>
                <a href="categories.html" style="color: cornflowerblue;">Agrega productos a tu carrito aquí</a>
            </div>
        `;
    } else {
        cartContainer.innerHTML = '';
        cartProducts.forEach((cartProduct, index) => {
            const productSubtotal = cartProduct.cost * cartProduct.cantidad; // Sin multiplicar por 44
            cartContainer.innerHTML += `
            <div class="row align-items-center mt-4">
                <div class="col-2">
                    <img src="${cartProduct.image}" class="img-fluid rounded" alt="${cartProduct.name}">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fw-bold mb-0">${cartProduct.name}</h4>
                            <p class="text-success mb-0" style="font-size: large; font-weight: bolder;">${cartProduct.currency} ${cartProduct.cost}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="me-2">Cantidad: <span id="cantidad_${index}">${cartProduct.cantidad}</span></span>
                            <div class="btn-group" role="group" aria-label="Quantity controls">
                                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                            </div>
                        </div>
                        <div>
                            <p class="fw-bold" style="text-align: center; margin-top: 10%; font-size: large;">Subtotal: <span id="productSubtotal_${index}" class="fw-bold text-success" style="font-size: large;">${cartProduct.currency} ${productSubtotal.toFixed(2)}</span></p>
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
    const currentUser = localStorage.getItem('currentUser');
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];


    // Actualizar la cantidad del producto seleccionado
    if (change < 0 && cartProducts[index].cantidad === 1) {
        // Si la cantidad es 1 y se intenta restar, eliminar el producto del carrito
        cartProducts.splice(index, 1);
    } else {
        cartProducts[index].cantidad = Math.max(1, cartProducts[index].cantidad + change); // Evita que la cantidad sea menor a 1
    }


    // Guardar los cambios en el localStorage
    localStorage.setItem(`carrito_${currentUser}`, JSON.stringify(cartProducts));


    // Actualizar la interfaz
    displayCartProduct(); // Volver a mostrar el carrito
}


// Función para calcular y mostrar el total de todos los productos
function updateTotal() {
    const currentUser = localStorage.getItem('currentUser');
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${currentUser}`)) || [];
    let total = 0;


    // Calcular el total sumando el subtotal de cada producto, multiplicando por 44 si es USD
    cartProducts.forEach(product => {
        const productTotal = product.currency === 'USD' ? product.cost * 44 * product.cantidad : product.cost * product.cantidad;
        total += productTotal;
    });


    // Mostrar el total en el elemento correspondiente
    const totalElement = document.getElementById('total');
    if (totalElement && cartProducts.length > 0) {
        totalElement.textContent = `UYU ${total.toFixed(2)}`;
    }
}


// Mostrar el producto en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', displayCartProduct);