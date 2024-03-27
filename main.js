// Simulación de productos (puedes reemplazar con una base de datos real)
const products = [
    // Laptops
    { id: 1, name: 'Laptop Acer Aspire 5', price: 649, category: 'laptops' },
    { id: 2, name: 'Laptop HP Pavilion 15', price: 799, category: 'laptops' },
    { id: 3, name: 'Laptop Dell Inspiron 15', price: 899, category: 'laptops' },
    { id: 4, name: 'Laptop ASUS VivoBook 15', price: 749, category: 'laptops' },
    { id: 5, name: 'Laptop Lenovo IdeaPad 3', price: 679, category: 'laptops' },
    { id: 6, name: 'Laptop Apple MacBook Air', price: 999, category: 'laptops' },
    // PCs de escritorio
    { id: 7, name: 'PC Lenovo IdeaCentre 3', price: 499, category: 'desktops' },
    { id: 8, name: 'PC Dell Inspiron 3671', price: 679, category: 'desktops' },
    { id: 9, name: 'PC HP Pavilion Desktop', price: 749, category: 'desktops' },
    { id: 10, name: 'PC Acer Aspire TC', price: 599, category: 'desktops' },
    { id: 11, name: 'PC ASUS VivoMini', price: 699, category: 'desktops' },
    { id: 12, name: 'PC Apple Mac Mini', price: 1099, category: 'desktops' },
    // Otros productos ...
];

// Lista de productos en el carrito
let cart = [];

// Función para mostrar productos por categoría
function displayProducts(category) {
    const container = document.getElementById(`${category}-container`);
    container.innerHTML = '';

    products.filter(product => product.category === category).forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
      `;
        container.appendChild(productElement);
    });
}

// Función para buscar productos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    const results = products.filter(product => product.name.toLowerCase().includes(searchTerm));

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
        results.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Precio: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
            searchResultsContainer.appendChild(productElement);
        });
    }
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        cart.push(productToAdd);
        updateCartCount();
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cart.length;
}

// Función para mostrar los productos en el carrito
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
      `;
        cartContainer.appendChild(productElement);
    });

    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total: $${totalPrice}`;
    cartContainer.appendChild(totalPriceElement);
}

// Función para finalizar la compra
function checkout() {
    alert('Gracias por tu compra!');
    cart = [];
    updateCartCount();
    displayCart();
}

// Mostrar productos al cargar la página
window.onload = function () {
    displayProducts('laptops');
    displayProducts('desktops');
};
