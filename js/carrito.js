document.addEventListener("DOMContentLoaded", () => {
    const carritoLista = document.getElementById("carrito-lista");
    const totalElement = document.getElementById("total");
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

    let carrito = [];

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

    btnVaciarCarrito.addEventListener("click", () => {
        carrito = [];
        mostrarCarrito();
        localStorage.removeItem("carrito");
    });

    const obtenerCarritoLocalStorage = () => {
        const carritoJSON = localStorage.getItem("carrito");
        if (carritoJSON) {
            carrito = JSON.parse(carritoJSON);
            mostrarCarrito();
        }
    };

    obtenerCarritoLocalStorage();
});
