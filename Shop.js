function addToCart(button, productName) {
    alert(productName + ' successfully added to cart');
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
}
function resetCart() {
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = 0;
    localStorage.removeItem('cartItems');
    alert('Cart has been reset.');
}

function sortProducts() {
    let sortOption = document.getElementById('sortOptions').value;
    let products = Array.from(document.querySelectorAll('.product'));

    products.sort((a, b) => {
        let priceA = parseInt(a.querySelector('h4').innerText.replace(' FCFA', '').replace(',', ''));
        let priceB = parseInt(b.querySelector('h4').innerText.replace(' FCFA', '').replace(',', ''));
        
        if (sortOption === 'priceLowToHigh') {
            return priceA - priceB;
        } else if (sortOption === 'priceHighToLow') {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    let container = document.querySelector('.row.g-5');
    products.forEach(product => container.appendChild(product));
}

function searchProducts() {
    let input = document.getElementById('productSearch').value.toLowerCase();
    let products = document.querySelectorAll('.product');

    products.forEach(product => {
        let productName = product.querySelector('h5').innerText.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
