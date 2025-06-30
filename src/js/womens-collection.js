// Women's Collection Data
const womensCollection = [
    {
        id: 1,
        name: "Nike Air Max DN8",
        price: 129.99,
        image: "../assets/images/W+AIR+MAX+DN8.jpeg",
    },
    {
        id: 2,
        name: "Nike Air Force",
        price: 99.99,
        image: "../assets/images/nike-airForce.png",
    },
    {
        id: 3,
        name: "Nike Air Max",
        price: 119.99,
        image: "../assets/images/Nike Air max.png",
    },
    {
        id: 4,
        name: "Nike Jordan",
        price: 149.99,
        image: "../assets/images/jordan.png",
    }
];

// Function to render Women's Collection
function renderWomensCollection() {
    const productsContainer = document.getElementById('womens-products');
    if (!productsContainer) return;

    womensCollection.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/nike-white-logo.png'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = womensCollection.find(p => p.id === productId);
    if (!product) return;

    // Get existing cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new item
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
    });
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Initialize the collection when the DOM is loaded
document.addEventListener('DOMContentLoaded', renderWomensCollection); 