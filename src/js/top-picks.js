/**
 * Top Picks functionality
 * This file handles the click events for the Top Picks section in index.html
 */

// Import cart functionality
import { addToCart } from './cart.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add product IDs and click handlers to Top Picks cards
  setupTopPicksCards();
});

/**
 * Sets up the Top Picks cards with product IDs and click handlers
 */
function setupTopPicksCards() {
  // Map the Top Picks cards to the shared products
  const topPicksMapping = [
    { cardClass: 'card1', productId: 'p1' }, // Nike Cortez Leather
    { cardClass: 'card2', productId: 'p2' }, // Nike Dunk Low Retro
    { cardClass: 'card3', productId: 'p3' }, // Nike Cortez
    { cardClass: 'card4', productId: 'p4' }, // Sabrina 2 'Stronger Than Gold' EP
    { cardClass: 'card5', productId: 'p5' }  // Sabrina 2 EP
  ];

  // Add click handlers to each Top Picks card
  topPicksMapping.forEach(({ cardClass, productId }) => {
    const card = document.querySelector(`.swiper-slide.${cardClass}`);
    if (card) {
      // Add data attribute for product ID
      card.dataset.productId = productId;

      // Add click event listener to the card
      card.addEventListener('click', () => {
        // Navigate to men.html with the product ID as a URL parameter
        window.location.href = `./Pages/men.html?product=${productId}`;
      });

      // Add hover effect to indicate clickability
      card.style.cursor = 'pointer';

      // Add visual cue that the card is clickable
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });

      // Add click event to entire card to add product to cart
      card.addEventListener('click', (e) => {
        e.preventDefault();

        // Create a product object based on the card data
        const cardLower = card.querySelector('.card-lower');
        const productName = cardLower.querySelector('h3:not(.gender):not(.price)').textContent;
        const gender = cardLower.querySelector('.gender').textContent;
        const priceText = cardLower.querySelector('.price').textContent;
        const price = parseInt(priceText.replace('₹', '').replace(',', ''));
        const image = card.querySelector('.card-upper img').src;

        const product = {
          id: productId,
          name: productName,
          gender: gender,
          currentPrice: price,
          originalPrice: price,
          image: image
        };

        // Add to cart without opening the cart
        addToCart(product, false);
      });
    }
  });
}
