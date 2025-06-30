// Import shared functionality with error handling
import { initCart, addToCart } from './cart.js';
import { sharedProducts, findProductById } from './shared-products.js';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import 'remixicon/fonts/remixicon.css';

const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize smooth scrolling and animations with error handling

// Filter kids products from shared products
const kidsProducts = sharedProducts.filter(product => product.id.startsWith('k'));

// Use the shared products for kids
// We already added the kids products to shared-products.js, so we don't need fallback data

// Initialize cart immediately to ensure it works when navigating between pages
initCart();

// Function to populate kids products
function populateKidsProducts() {
  try {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
      console.error('❌ Products grid not found');
      return;
    }



    // Clear existing products
    productsGrid.innerHTML = '';

    // Generate product cards for all kids products
    kidsProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.id;

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badge">${product.discount}% OFF</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="original-price">₹${product.originalPrice}</span>
          <span class="current-price">₹${product.currentPrice}</span>
        </div>
      </div>
    `;

    // Add double click event to entire card to show product details
    productCard.addEventListener('dblclick', (e) => {
      // Prevent default behavior
      e.preventDefault();


      showProductDetails(product.id);
    }, { passive: false });



    productsGrid.appendChild(productCard);
  });
  } catch (error) {
    console.error('❌ Error populating kids products:', error);
  }
}

// Initialize the page
function initializePage() {
  try {
    // Initialize cart functionality
    if (typeof initCart === 'function') {
      initCart();
    }

    // Populate the products grid with kids products
    populateKidsProducts();
  } catch (error) {
    console.error('❌ Error initializing page:', error);
  }

  // Add event listeners to product cards

  // Product card double click handler for showing product details (for existing static cards)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('dblclick', (e) => {
      // Prevent default behavior
      e.preventDefault();

      const productId = card.dataset.productId;
      if (productId) {
        showProductDetails(productId);
      }
    }, { passive: false });
  });

  // Add event listener for "Back to Collection" button
  const backToCollectionBtn = document.querySelector('.back-to-collection-btn');
  if (backToCollectionBtn) {
    backToCollectionBtn.addEventListener('click', () => {
      // Hide product details
      const productDetails = document.getElementById('product-details');
      productDetails.classList.remove('active');
      productDetails.style.display = 'none';

      // Show collection section
      const collectionSection = document.getElementById('kids-collection');
      if (collectionSection) {
        collectionSection.style.display = 'block';
        collectionSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Setup review carousel
  setupReviewCarousel();

  // Setup size selection
  setupSizeSelection();

  // Check URL parameters for product ID
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');
  if (productId) {
    showProductDetails(productId);
  }

  // Setup "Shop Now" button in hero section
  const shopNowBtn = document.querySelector('.shop-now-btn');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
      const kidsCollectionSection = document.getElementById('kids-collection');
      kidsCollectionSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Function to show product details
function showProductDetails(productId) {
  // Get the product details section
  const productDetails = document.getElementById('product-details');

  if (!productDetails) {
    return;
  }

  // First try to find the product in our shared products
  const product = findProductById(productId);

  // For our manually added product cards, we'll use a simpler approach
  // Get the product card that was clicked
  const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (!productCard && !product) {
    console.error('Product card or product not found for ID:', productId);
    return;
  }

  // Get elements (productDetails already declared above)
  const mainImage = document.getElementById('main-product-image');
  const productTitle = document.querySelector('#product-details .product-title');
  const originalPrice = document.querySelector('#product-details .original-price');
  const currentPrice = document.querySelector('#product-details .current-price');
  const discountBadge = document.querySelector('#product-details .discount-badge');
  const addToCartBtn = document.querySelector('#product-details .add-to-cart-btn');

  // Get data from the product card
  const cardImage = productCard.querySelector('.product-image img');
  const cardName = productCard.querySelector('.product-name');
  const cardOriginalPrice = productCard.querySelector('.original-price');
  const cardCurrentPrice = productCard.querySelector('.current-price');
  const cardBadge = productCard.querySelector('.product-badge');

  // Update product details
  if (cardImage) {
    mainImage.src = cardImage.src;
    mainImage.alt = cardImage.alt;
  }

  if (cardName) {
    productTitle.textContent = cardName.textContent;
  }

  if (cardOriginalPrice) {
    originalPrice.textContent = cardOriginalPrice.textContent;
  }

  if (cardCurrentPrice) {
    currentPrice.textContent = cardCurrentPrice.textContent;
  }

  if (cardBadge) {
    // Extract the percentage from the badge (e.g., "18% OFF" -> "-18%")
    const percentage = cardBadge.textContent.match(/\d+/);
    if (percentage) {
      discountBadge.textContent = `-${percentage[0]}%`;
    }
  }

  // Update "Add to Cart" button
  addToCartBtn.dataset.productId = productId;

  // Update thumbnails - use the same image for all thumbnails for now
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, index) => {
    // Remove existing event listeners by cloning and replacing
    const newThumbnail = thumbnail.cloneNode(true);
    thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);

    if (index === 0 && cardImage) {
      newThumbnail.src = cardImage.src;
      newThumbnail.classList.add('active');
    }

    // Add click event to thumbnail
    newThumbnail.addEventListener('click', () => {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));

      // Add active class to clicked thumbnail
      newThumbnail.classList.add('active');

      // Update main image
      mainImage.src = newThumbnail.src;
    });
  });

  // Show product details section
  // Hide collection section first
  const collectionSection = document.getElementById('kids-collection');
  if (collectionSection) {
    collectionSection.style.display = 'none';
  }

  // Show product details with multiple methods to ensure visibility
  productDetails.classList.add('active');
  productDetails.style.display = 'block !important';
  productDetails.style.visibility = 'visible';
  productDetails.style.opacity = '1';
  productDetails.style.position = 'relative';
  productDetails.style.zIndex = '10';

  // Scroll to product details
  setTimeout(() => {
    productDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  // Update URL with product ID without reloading the page
  const url = new URL(window.location);
  url.searchParams.set('product', productId);
  window.history.pushState({}, '', url);
}

// Function to handle review carousel
function setupReviewCarousel() {
  const slides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!slides.length || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show the current slide and activate the corresponding dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    // Update current slide index
    currentSlide = index;
  }

  // Event listener for previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = totalSlides - 1;
      }
      showSlide(newIndex);
    });
  }

  // Event listener for next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= totalSlides) {
        newIndex = 0;
      }
      showSlide(newIndex);
    });
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= totalSlides) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }, 5000);
}

// Function to handle size selection in product details
function setupSizeSelection() {
  const sizeButtons = document.querySelectorAll('.size-btn');

  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all size buttons
      sizeButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');
    });
  });
}

// Add animation to product cards
function animateProductCards() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate');
  });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Ensure product details section is hidden by default
    const productDetails = document.getElementById('product-details');
    if (productDetails) {
      productDetails.classList.remove('active');
      productDetails.style.display = 'none';
    }

  initializePage();
  animateProductCards();
  setupSizeSelection();

  // Check if there's a product ID in the URL and show that product
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');
  if (productId) {
    showProductDetails(productId);
  }

  // Add event delegation for product card double clicks (backup method)
  document.addEventListener('dblclick', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      e.preventDefault();
      const productId = productCard.dataset.productId;
      if (productId) {
        showProductDetails(productId);
      }
    }
  });

  // Setup comment form
  setupCommentForm();

  // Note: User icon click event is now handled in auth-ui.js
  } catch (error) {
    console.error('❌ Error in DOMContentLoaded:', error);
  }
});

// Function to setup comment form functionality
function setupCommentForm() {
  const commentForm = document.getElementById('comment-form');
  const starsInput = document.querySelectorAll('.stars-input i');
  const ratingValue = document.getElementById('rating-value');
  const ratingText = document.querySelector('.rating-text');

  if (!commentForm) return;

  // Handle star rating clicks
  starsInput.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      ratingValue.value = rating;

      // Update star display
      starsInput.forEach((s, i) => {
        if (i < rating) {
          s.classList.remove('ri-star-line');
          s.classList.add('ri-star-fill', 'active');
        } else {
          s.classList.remove('ri-star-fill', 'active');
          s.classList.add('ri-star-line');
        }
      });

      // Update rating text
      const ratingTexts = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
      ratingText.textContent = ratingTexts[rating - 1];
    });

    // Handle star hover effects
    star.addEventListener('mouseenter', () => {
      const hoverRating = index + 1;
      starsInput.forEach((s, i) => {
        if (i < hoverRating) {
          s.style.color = '#ffc107';
        } else {
          s.style.color = '#ddd';
        }
      });
    });
  });

  // Reset stars on mouse leave
  document.querySelector('.stars-input').addEventListener('mouseleave', () => {
    const currentRating = parseInt(ratingValue.value);
    starsInput.forEach((s, i) => {
      if (i < currentRating) {
        s.style.color = '#ffc107';
      } else {
        s.style.color = '#ddd';
      }
    });
  });

  // Handle form submission
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);
    const parentName = formData.get('parentName');
    const rating = parseInt(formData.get('rating'));
    const comment = formData.get('comment');

    // Validate form
    if (!parentName || !rating || !comment) {
      showNotification('Please fill in all fields and select a rating.', 'error');
      return;
    }

    if (rating < 1 || rating > 5) {
      showNotification('Please select a valid rating.', 'error');
      return;
    }

    // Save comment to localStorage
    saveComment({ parentName, rating, comment });

    // Add comment to carousel
    addCommentToCarousel({ parentName, rating, comment });

    // Reset form
    commentForm.reset();
    ratingValue.value = '0';
    starsInput.forEach(s => {
      s.classList.remove('ri-star-fill', 'active');
      s.classList.add('ri-star-line');
      s.style.color = '#ddd';
    });
    ratingText.textContent = 'Click to rate';

    // Show success message
    showNotification('Thank you for your review! It has been added to our testimonials.', 'success');

    // Scroll to reviews section to show the new comment
    document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
  });
}

// Function to save comment to localStorage
function saveComment(commentData) {
  const comments = JSON.parse(localStorage.getItem('stepstyle-kids-comments') || '[]');
  const newComment = {
    ...commentData,
    date: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    id: Date.now()
  };

  comments.push(newComment);
  localStorage.setItem('stepstyle-kids-comments', JSON.stringify(comments));

  // Update review stats
  updateReviewStats(comments);
}

// Function to add comment to carousel
function addCommentToCarousel(commentData) {
  const reviewCarousel = document.querySelector('.review-carousel');
  const carouselDots = document.querySelector('.carousel-dots');

  if (!reviewCarousel || !carouselDots) return;

  // Create new review slide
  const newSlide = document.createElement('div');
  newSlide.className = 'review-slide';

  // Generate stars HTML
  const starsHtml = Array.from({ length: 5 }, (_, i) => {
    const starClass = i < commentData.rating ? 'ri-star-fill' : 'ri-star-line';
    return `<i class="${starClass}"></i>`;
  }).join('');

  newSlide.innerHTML = `
    <div class="review-content">
      <div class="reviewer-info">
        <div class="reviewer-name">${commentData.parentName}</div>
        <div class="review-date">${new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</div>
      </div>
      <div class="stars">
        ${starsHtml}
      </div>
      <p class="review-text">"${commentData.comment}"</p>
    </div>
  `;

  // Add to carousel
  reviewCarousel.appendChild(newSlide);

  // Add new dot
  const newDot = document.createElement('span');
  newDot.className = 'dot';
  carouselDots.appendChild(newDot);

  // Re-setup carousel functionality
  setupReviewCarousel();
}

// Function to update review stats
function updateReviewStats(comments) {
  const ratingNumber = document.querySelector('.rating-number');
  const totalReviews = document.querySelector('.total-reviews');

  if (!ratingNumber || !totalReviews || comments.length === 0) return;

  // Calculate average rating (including existing reviews)
  const existingRating = 4.9;
  const existingCount = 256;

  const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
  const newAverage = ((existingRating * existingCount) + totalRating) / (existingCount + comments.length);

  ratingNumber.textContent = newAverage.toFixed(1);
  totalReviews.textContent = `Based on ${existingCount + comments.length} happy parents`;
}

// Function to load saved comments on page load
function loadSavedComments() {
  const comments = JSON.parse(localStorage.getItem('stepstyle-kids-comments') || '[]');

  comments.forEach(comment => {
    addCommentToCarousel(comment);
  });

  if (comments.length > 0) {
    updateReviewStats(comments);
  }
}

// Function to show notification
function showNotification(message, type = 'success') {
  // Remove existing notification
  const existingNotification = document.querySelector('.comment-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `comment-notification ${type}`;
  notification.innerHTML = `
    <i class="${type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'}"></i>
    <span>${message}</span>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Hide notification after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Load saved comments when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadSavedComments, 500); // Small delay to ensure carousel is set up
});

// Navbar scroll feature
function navBarScrollAnimation() {
  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      navbar.style.top = "-90px"; // Hide navbar
    } else {
      navbar.style.top = "0"; // Show navbar
    }
    lastScrollTop = currentScroll;
  });
}
navBarScrollAnimation();