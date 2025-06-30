/**
 * Search functionality for StepStyle website
 * Shows search suggestions with product images when users search for items
 */

import { sharedProducts } from './shared-products.js';

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

/**
 * Initialize search functionality
 */
function initSearch() {
  // Get search input element
  const searchInput = document.getElementById('nav-search');
  if (!searchInput) return;

  // Create search results container if it doesn't exist
  let searchResults = document.getElementById('search-results');
  if (!searchResults) {
    searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchResults.className = 'search-results';
    
    // Insert after search bar
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.parentNode.insertBefore(searchResults, searchBar.nextSibling);
    }
  }

  // Add event listeners
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('focus', handleSearchInput);
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  });
}

/**
 * Handle search input
 * @param {Event} e - Input event
 */
function handleSearchInput(e) {
  const searchTerm = e.target.value.trim().toLowerCase();
  const searchResults = document.getElementById('search-results');
  
  // Clear previous results
  searchResults.innerHTML = '';
  
  // If search term is empty, hide results
  if (searchTerm.length === 0) {
    searchResults.classList.remove('show');
    return;
  }
  
  // Filter products based on search term
  const filteredProducts = filterProducts(searchTerm);
  
  // Display results
  if (filteredProducts.length > 0) {
    displaySearchResults(filteredProducts, searchResults);
    searchResults.classList.add('show');
  } else {
    searchResults.innerHTML = '<div class="no-results">No products found</div>';
    searchResults.classList.add('show');
  }
}

/**
 * Filter products based on search term
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered products
 */
function filterProducts(searchTerm) {
  return sharedProducts.filter(product => {
    // Search in name, gender, and description
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.gender.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }).slice(0, 5); // Limit to 5 results
}

/**
 * Display search results
 * @param {Array} products - Products to display
 * @param {HTMLElement} container - Container element
 */
function displaySearchResults(products, container) {
  // Create results HTML
  products.forEach(product => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    
    // Determine the correct product page
    let productPage = '';
    if (product.gender.toLowerCase().includes('men')) {
      productPage = '/Pages/men.html';
    } else if (product.gender.toLowerCase().includes('women')) {
      productPage = '/Pages/women.html';
    } else if (product.gender.toLowerCase().includes('kid')) {
      productPage = '/Pages/kids.html';
    } else {
      productPage = '/Pages/men.html'; // Default to men's page
    }
    
    // Create result item HTML
    resultItem.innerHTML = `
      <a href="${productPage}?product=${product.id}" class="search-result-link">
        <div class="search-result-image">
          <img src="${product.image || (product.images ? product.images[0] : '')}" alt="${product.name}">
        </div>
        <div class="search-result-info">
          <h4 class="search-result-name">${product.name}</h4>
          <p class="search-result-gender">${product.gender}</p>
          <p class="search-result-price">₹${product.currentPrice.toLocaleString()}</p>
        </div>
      </a>
    `;
    
    // Add click event to navigate to product page
    resultItem.addEventListener('click', () => {
      window.location.href = `${productPage}?product=${product.id}`;
    });
    
    container.appendChild(resultItem);
  });
}

// Export functions for use in other files
export { initSearch };
