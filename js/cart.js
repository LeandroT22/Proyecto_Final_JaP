// Mstrar el producto en el carrito
function displayCartProduct() {
    const cartProduct = JSON.parse(localStorage.getItem('productoComprado'));
    const cartContainer = document.getElementById('cart-container');

    // Verificar si hay un producto en el carrito
    if (!cartProduct) {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        cartContainer.innerHTML = `
            <div class="row align-items-center mt-4">
                <div class="col-2">
                    <img src="${cartProduct.image}" class="img-fluid rounded" alt="${cartProduct.name}">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fw-bold mb-0">${cartProduct.name}</h4>
                            <p class="text-success mb-0"  style="font-size: large; font-weight: bolder;">${cartProduct.currency} ${cartProduct.cost}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="me-2">Cantidad: 1</span>
                            <div class="btn-group" role="group" aria-label="Quantity controls">
                                <button type="button" class="bn btn-outline-secondary">+</button>
                                <button type="button" class="btn btn-outline-secondary">-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div style="text-align: center; margin-top: 10%; font-size: xx-large;">
                <h4 class="fw-bold">Subtotal: <span class="text-success" id="subtotal"> ${cartProduct.currency} ${cartProduct.cost}</span></h4>
            </div>
        `;
    }
}

// Mostrar el producto en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', displayCartProduct);