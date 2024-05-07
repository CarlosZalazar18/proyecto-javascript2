document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos-container");
    const carritoIcono = document.getElementById("carrito-icono");
    const carritoLista = document.getElementById("carrito-lista");
    const totalElement = document.getElementById("total");

    let carrito = [];

    const mostrarProductos = (productos) => {
        productosContainer.innerHTML = "";
        productos.forEach((producto) => {
            const productoElement = document.createElement("div");
            productoElement.classList.add("producto");
            productoElement.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="btn-comprar" data-id="${producto.id}">Comprar</button>
            `;
            productosContainer.appendChild(productoElement);
        });
    };

    const agregarAlCarrito = (producto) => {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        
        producto.stock--;

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    };

    const mostrarCarrito = () => {
        if (!carritoLista) {
            console.error("El elemento carritoLista es nulo.");
            return;
        }
        carritoLista.innerHTML = "";
        carrito.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}`;
            carritoLista.appendChild(li);
        });

        
        const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const cantidadTotalElement = document.createElement("p");
        cantidadTotalElement.textContent = `Cantidad total en el carrito: ${cantidadTotal}`;
        carritoLista.appendChild(cantidadTotalElement);

        calcularTotal();
    };

    const calcularTotal = () => {
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    carritoIcono.addEventListener("click", () => {
        window.location.href = "carrito.html";
    });

    productosContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-comprar")) {
            const productoId = parseInt(event.target.dataset.id);
            const productoSeleccionado = productos.find(producto => producto.id === productoId);
            if (productoSeleccionado.stock > 0) {
                agregarAlCarrito(productoSeleccionado);
                mostrarProductos(productos);
            } else {
                alert("¡Lo sentimos, este producto está agotado!");
            }
        }
    });

    let productos = []; 

    const cargarProductos = async () => {
        try {
            const response = await fetch("js/productos.json");
            const data = await response.json();
            productos = data.productos; 
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };
    
    const obtenerCarritoLocalStorage = () => {
        const carritoJSON = localStorage.getItem("carrito");
        if (carritoJSON) {
            carrito = JSON.parse(carritoJSON);
            mostrarCarrito();
        }
    };

    cargarProductos();
    obtenerCarritoLocalStorage();
});


