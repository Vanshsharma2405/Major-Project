/**
 * Cart functionality for StepStyle website
 * This file contains all cart-related functions that are shared across pages
 * This cart implementation works across all pages (index, men, women, kids)
 */

import { findProductById } from './shared-products';

// Initialize cart from localStorage or as empty array
let cart = [];

/**
 * Initialize the cart functionality
 * This should be called when the DOM is loaded and when navigating between pages
 */
export function initCart() {
  // Load cart from localStorage
  syncCartFromStorage();

  // Set up event listeners for cart icon and modal
  setupCartEventListeners();

  // Update cart UI
  updateCartCount();
  updateCartModal();

  // Add a special event listener for page visibility changes
  // This helps update the cart when returning to a page after visiting another page
  if (!window.cartVisibilityListenerAdded) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // Page is now visible, update cart from localStorage
        syncCartFromStorage();
        updateCartCount();
        updateCartModal();

      }
    });
    window.cartVisibilityListenerAdded = true;
  }


}

/**
 * Set up event listeners for cart functionality
 */
function setupCartEventListeners() {
  // Check which page we're on
  const path = window.location.pathname;
  const isIndexPage = path.includes('index.html') || path === '/' || path.endsWith('/');
  const isMensPage = path.includes('men.html');
  const isWomensPage = path.includes('women.html');
  const isKidsPage = path.includes('kids.html');

  let currentPage = 'Unknown Page';
  if (isIndexPage) currentPage = 'Index Page';
  if (isMensPage) currentPage = 'Men\'s Page';
  if (isWomensPage) currentPage = 'Women\'s Page';
  if (isKidsPage) currentPage = 'Kids\'s Page';



  // Get cart elements
  const cartIcon = document.querySelector('.cart-icon-container') || document.querySelector('.cart').parentElement;
  const cartModal = document.querySelector('.cart-modal');
  const closeCartBtn = document.querySelector('.close-cart-btn');

  // If cart icon doesn't have a container, create one
  if (!document.querySelector('.cart-icon-container')) {
    const cartElement = document.querySelector('.cart');
    if (cartElement) {


      // Create container
      const container = document.createElement('div');
      container.className = 'cart-icon-container';

      // Create badge counter
      const badge = document.createElement('span');
      badge.className = 'cart-count';
      badge.textContent = '0';

      // Replace cart icon with container
      const parent = cartElement.parentElement;
      parent.replaceChild(container, cartElement);
      container.appendChild(cartElement);
      container.appendChild(badge);
    }
  }

  // Get cart overlay
  const cartOverlay = document.querySelector('.cart-overlay');

  // Open cart modal when cart icon is clicked
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.add('open');
        if (cartOverlay) {
          cartOverlay.classList.add('open');
        }
      }
    });
  }

  // Close cart modal when close button is clicked
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.remove('open');
        if (cartOverlay) {
          cartOverlay.classList.remove('open');
        }
      }
    });
  }

  // Close cart modal when clicking on overlay
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.remove('open');
        cartOverlay.classList.remove('open');
      }
    });
  }

  // Close cart modal when clicking outside
  if (cartModal) {
    document.addEventListener('click', (e) => {
      if (cartModal.classList.contains('open') &&
          !cartModal.contains(e.target) &&
          !cartIcon.contains(e.target) &&
          !cartOverlay.contains(e.target)) {
        cartModal.classList.remove('open');
        if (cartOverlay) {
          cartOverlay.classList.remove('open');
        }
      }
    });
  }

  // Initialize checkout button
  updateCheckoutButton();
}

/**
 * Update checkout button event listener
 * This function ensures the checkout button always has the correct event listener
 */
function updateCheckoutButton() {
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (!checkoutBtn) return;

  // Remove any existing event listeners by cloning the button
  const newCheckoutBtn = checkoutBtn.cloneNode(true);
  checkoutBtn.parentNode.replaceChild(newCheckoutBtn, checkoutBtn);

  // Add fresh event listener
  newCheckoutBtn.addEventListener('click', () => {


    // Only proceed with checkout if cart is not empty
    if (cart.length > 0) {
      // Redirect to checkout page instead of calling checkout()
      window.location.href = window.location.pathname.includes('/Pages/')
        ? 'checkout.html'
        : './Pages/checkout.html';
    } else {
      alert('Your cart is empty. Please add some items before checking out.');
    }
  });
}

/**
 * Add product to cart
 * @param {string|object} productOrId - Product object or product ID
 * @param {boolean} openCart - Whether to open the cart after adding the product
 */
export function addToCart(productOrId, openCart = false) {
  // Get product object
  let product;
  if (typeof productOrId === 'string') {
    product = findProductById(productOrId);
  } else {
    product = productOrId;
  }

  if (!product) {
    console.error('Product not found');
    return;
  }

  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // Increase quantity if product already in cart
    cart[existingProductIndex].quantity += 1;
  } else {
    // Add new product to cart
    cart.push({
      ...product,
      quantity: 1
    });
  }

  // Update cart UI
  updateCartCount();
  updateCartModal();

  // Save cart to localStorage
  saveCartToStorage();

  // Show toast notification with success icon (green checkmark)
  showToast('Item added to cart!', 'success');

  // Animate cart icon
  animateCartIcon();

  // Open cart modal if requested (for product details page)
  if (openCart) {
    const cartModal = document.querySelector('.cart-modal');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartModal) {
      cartModal.classList.add('open');
      if (cartOverlay) {
        cartOverlay.classList.add('open');
      }
    }
  }
}

/**
 * Remove product from cart
 * @param {string} productId - Product ID to remove
 */
export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);

  // Update cart UI
  updateCartCount();
  updateCartModal();

  // Save cart to localStorage
  saveCartToStorage();
}

/**
 * Update product quantity in cart
 * @param {string} productId - Product ID to update
 * @param {number} change - Quantity change (positive or negative)
 */
export function updateQuantity(productId, change) {
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity += change;

    // Remove product if quantity becomes 0
    if (cart[productIndex].quantity <= 0) {
      removeFromCart(productId);
    } else {
      // Update cart UI
      updateCartModal();
      updateCartCount();

      // Save cart to localStorage
      saveCartToStorage();
    }
  }
}

/**
 * Update cart count badge
 * This function is more robust and will try multiple selectors to find the cart count element
 */
export function updateCartCount() {
  // Try multiple selectors to find the cart count element
  const cartCount = document.querySelector('.cart-count');

  if (cartCount) {
    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart count text
    cartCount.textContent = totalItems;

    // Add a visual indicator if there are items in the cart
    if (totalItems > 0) {
      cartCount.classList.add('has-items');
    } else {
      cartCount.classList.remove('has-items');
    }

  }
}

/**
 * Update cart modal content
 */
export function updateCartModal() {
  const cartItems = document.querySelector('.cart-items');
  const totalAmount = document.querySelector('.total-amount');

  if (!cartItems || !totalAmount) return;

  // Clear cart items
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    // Show empty cart message without SVG
    cartItems.innerHTML = `
      <div class="empty-cart-message">
        <p>Your cart is empty</p>
        <div class="empty-cart-divider"></div>
      </div>
    `;
    totalAmount.textContent = '₹0';
  } else {
    // Calculate total amount
    const total = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);

    // Update total amount
    totalAmount.textContent = `₹${total}`;

    // Add cart items
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.images ? item.images[0] : item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.currentPrice}</div>
          <div class="cart-item-controls">
            <div class="quantity-control">
              <button class="decrease-quantity" data-product-id="${item.id}">−</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase-quantity" data-product-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
      `;

      cartItems.appendChild(cartItem);
    });

    // Add event listeners to quantity controls and remove buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.productId;
        updateQuantity(productId, -1);
      });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.productId;
        updateQuantity(productId, 1);
      });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.productId;
        removeFromCart(productId);
      });
    });
  }

  // Always update the checkout button event listener
  updateCheckoutButton();
}

/**
 * Show toast notification
 * @param {string} message - Message to display in toast
 * @param {string} type - Type of toast (default, success, error)
 */
export function showToast(message, type = 'default') {
  const toast = document.querySelector('.toast-notification');
  const toastMessage = document.querySelector('.toast-message');
  const toastIcon = document.querySelector('.toast-icon');

  if (!toast || !toastMessage) return;

  // Set message
  toastMessage.textContent = message;

  // Reset classes
  toast.classList.remove('success', 'error');



  // Set type-specific styles
  if (type === 'success') {
    toast.classList.add('success');
    if (toastIcon) {
      toastIcon.className = 'ri-check-line toast-icon';
    }
  } else if (type === 'error') {
    toast.classList.add('error');
    if (toastIcon) {
      toastIcon.className = 'ri-error-warning-line toast-icon';
    }
  } else {
    // Default
    if (toastIcon) {
      toastIcon.className = 'ri-information-line toast-icon';
    }
  }

  // Show toast
  toast.classList.add('show');

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Animate cart icon
 */
export function animateCartIcon() {
  const cartIcon = document.querySelector('.cart-icon-container');
  if (!cartIcon) return;

  // Add animation class to badge
  cartIcon.classList.add('animate');

  // Remove animation class after animation completes
  setTimeout(() => {
    cartIcon.classList.remove('animate');
  }, 500);
}

/**
 * Save cart to localStorage
 */
function saveCartToStorage() {
  try {
    localStorage.setItem('stepstyle-cart', JSON.stringify(cart));

  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Load cart from localStorage
 */
export function syncCartFromStorage() {
  const storedCart = localStorage.getItem('stepstyle-cart');
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);

    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      cart = [];
      localStorage.removeItem('stepstyle-cart');
    }
  } else {

    cart = [];
  }
}

/**
 * Get the current cart
 * @returns {Array} - Current cart array
 */
export function getCart() {
  return cart;
}

/**
 * Process checkout
 * In a real application, this would send the cart data to a server
 * For now, we'll just show a confirmation message and clear the cart
 */
export function checkout() {


  // Verify cart is not empty
  if (cart.length === 0) {
    console.error('Attempted to checkout with empty cart');
    alert('Your cart is empty. Please add some items before checking out.');
    return;
  }

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);


  // Create order summary
  let orderSummary = 'Order Summary:\n\n';
  cart.forEach(item => {
    orderSummary += `${item.name} x ${item.quantity} = ₹${item.currentPrice * item.quantity}\n`;
  });
  orderSummary += `\nTotal: ₹${totalPrice}`;

  // Show confirmation
  alert(`Thank you for your order!\n\n${orderSummary}`);

  // Clear cart
  const oldCartLength = cart.length;
  cart = [];


  // Update storage and UI
  saveCartToStorage();
  updateCartCount();
  updateCartModal();

  // Close cart modal
  const cartModal = document.querySelector('.cart-modal');
  const cartOverlay = document.querySelector('.cart-overlay');
  if (cartModal) {
    cartModal.classList.remove('open');
    if (cartOverlay) {
      cartOverlay.classList.remove('open');
    }
  }

  // Show success message with green color
  showToast('Order placed successfully!', 'success');
}
