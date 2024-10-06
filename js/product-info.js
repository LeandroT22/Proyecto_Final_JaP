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
       //Llamar a la función
       mostrarProductosRelacionados(product.relatedProducts);
}

// URL de la API
let Comentarios_URL = (PRODUCT_INFO_COMMENTS_URL + productoID + ".json");

// Función para crear estrellas de calificación con FontAwesome
function crearEstrellas(rating) {
    let estrellas = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            estrellas += '<i class="fas fa-star"></i>'; // Estrella completa
        } else {
            estrellas += '<i class="far fa-star"></i>'; // Estrella vacía
        }
    }
    return estrellas;
}

// Función para cargar los comentarios desde la API
function cargarComentarios() {
    fetch(Comentarios_URL)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('comentarios');
            container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos comentarios
            data.forEach(comentario => {
                let comentarioCard = document.createElement('div');
                comentarioCard.classList.add('comentario-card');

                comentarioCard.innerHTML = `
                    <div class="comentario-header"> 
                        <span class="usuario">@${comentario.user}</span>
                        <div class="fecha">${comentario.dateTime}</div>
                    </div>
                    <div class="comentario-texto">${comentario.description}</div>
                    <span class="estrellas">${crearEstrellas(comentario.score)}</span>
                    </div>
                `;

                container.appendChild(comentarioCard);
            });
        })
        .catch(error => console.error('Error al cargar los comentarios:', error));
}
// Redirige a la página de información del producto
function setProdID(id) {
    localStorage.setItem("ProdID", id);  
    window.location = "product-info.html";  
  }

//Función producto relacionado
function mostrarProductosRelacionados(relatedProducts) {
    const relatedContainer = document.getElementById("PRODUCTO_RELACIONADO");
    PRODUCTO_RELACIONADO.innerHTML = "";
      relatedProducts.forEach((relatedProduct) => {
        relatedContainer.innerHTML += `
          <div class="col-12 col-md-4 mb-3">
            <div onclick="setProdID(${relatedProduct.id})" class="card cursor-active">
            <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
              <div class="card-body">
                <h5 class="card-title">${relatedProduct.name}</h5>
            </div>
          </div>
        </div>
            `;
    });
  }

  // Manejo de estrellas
  let stars = document.querySelectorAll('#product-star-rating i');
  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          calificacionSeleccionada = index + 1; // Guarda la calificación seleccionada
          stars.forEach((s, i) => {
              if (i <= index) {
                  s.classList.replace('far', 'fas'); // Estrella llena
              } else {
                  s.classList.replace('fas', 'far'); // Estrella vacía
              }
          });
      });
  });

  // Variables para almacenar la calificación y comentario
let calificacionSeleccionada = 0;
let comentarioUsuario = '';
let usuario = localStorage.getItem("user") ;

document.getElementById("botonEnviar").addEventListener("click", function() {
    comentarioUsuario = document.getElementById("calificacionCliente").value; // Obtener el comentario del usuario

    if(calificacionSeleccionada > 0 && comentarioUsuario !== '') {
        // Crear el nuevo comentario en el contenedor
        let nuevoComentario = {
            user: usuario, // Aquí puedes poner el nombre del usuario si está disponible
            dateTime: new Date().toLocaleString(),
            description: comentarioUsuario,
            score: calificacionSeleccionada
        };

        // Llamar a la función que crea el HTML del comentario y lo añade al contenedor
        agregarComentario(nuevoComentario);

        // Limpiar el campo de texto y las estrellas
        document.getElementById("calificacionCliente").value = ''; 
        resetEstrellas();
    } else {
        alert('Por favor, ingresa una calificación y un comentario.');
    }
});

// Función para agregar el comentario al contenedor
function agregarComentario(comentario) {
    let container = document.getElementById('comentarios');
    let comentarioCard = document.createElement('div');
    comentarioCard.classList.add('comentario-card');

    comentarioCard.innerHTML = `
        <div class="comentario-header">
            <span class="usuario">@${comentario.user}</span>
            <div class="fecha">${comentario.dateTime}</div>
        </div>
        <div class="comentario-texto">${comentario.description}</div>
        <span class="estrellas">${crearEstrellas(comentario.score)}</span>
    `;

    container.appendChild(comentarioCard);
}

// Función para resetear las estrellas después de enviar el comentario
function resetEstrellas() {
    let stars = document.querySelectorAll('#product-star-rating i');
    stars.forEach(star => {
        star.classList.replace('fas', 'far'); // Volver a estrellas vacías
    });
    calificacionSeleccionada = 0; // Resetear la calificación seleccionada
}


// getJSONData(PRODUCT_URL) devuelve los productos.
getJSONData(PRODUCT_INFO_URL + productoID + ".json").then((result) => {
  if (result.status === "ok") {
    // Dado que solo tienes un producto, se pasa directamente al renderizador
    Mostrar_Producto(result.data);
    nombreCategoria.innerHTML =
      `<a href="products.html">Volver</a> | <a href="categories.html">Categorías</a>  >  ` +
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
      cargarComentarios();
   
    });

  } else {
    console.error("No se pudieron obtener los datos:", result.data);
  }
});
