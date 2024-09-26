
// Add to Cart Function
function addToCart(button, productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(productName);

    // Save cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartCount();
    alert(productName + ' successfully added to cart');
}

// Update Cart Count
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cartItems.length;
}

// Newsletter Subscription
function subscribe(event) {
    event.preventDefault();
    alert('Thank you for subscribing!');
}

// Reset Cart Function
function resetCart() {
    localStorage.removeItem('cartItems');
    updateCartCount();
    alert('Cart has been reset.');
}

// Call updateCartCount on page load to persist cart count
document.addEventListener('DOMContentLoaded', updateCartCount);

// Register functionality
function register(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // Store user details in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert('Username already exists! Please choose another.');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        // Close the register modal
        let modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
    }
}

// Login functionality
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify({ username }));
        alert('Login successful');
        updateUserUI();
        // Close the login modal
        let modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    } else {
        alert('Invalid username or password');
    }
}

// Update the UI for logged-in users
function updateUserUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginButton = document.querySelector('.navBar .nav-link[data-bs-target="#loginModal"]');
    if (user) {
        loginButton.textContent = `Welcome, ${user.username}`;
        loginButton.removeAttribute('data-bs-toggle');
        loginButton.removeAttribute('data-bs-target');
    }
}

// Event listeners for registration and login
document.getElementById('registerForm').addEventListener('submit', register);
document.getElementById('loginForm').addEventListener('submit', login);
document.addEventListener('DOMContentLoaded', updateUserUI);


// Search functionality
function searchProducts(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('.desc h5').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Attach search event
document.getElementById('searchForm').addEventListener('submit', searchProducts);

