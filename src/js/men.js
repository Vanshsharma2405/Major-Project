import '../styles/men.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { sharedProducts, findProductById } from './shared-products';
import { initCart, addToCart, showToast } from './cart';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Use the shared products data
const products = sharedProducts;

const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize cart immediately to ensure it works when navigating between pages
initCart();

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', () => {

  // Populate products grid
  const productsGrid = document.querySelector('.products-grid');
  const galleryPriceSection = document.getElementById('gallery-price');

  // Check for product ID in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  // Check for hash in URL to scroll to specific section
  const hash = window.location.hash;
  if (hash === '#mens-collection') {
    // Delay scroll to ensure page is fully loaded
    setTimeout(() => {
      document.getElementById('mens-collection').scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }

  // Filter products to show only men's shoes and the Top Picks products
  const mensProducts = products.filter(product =>
    product.gender === 'Men\'s shoe' ||
    product.id === 'p2' || // Nike Dunk Low Retro (already a men's shoe)
    product.id === 'p4' || // Sabrina 2 'Stronger Than Gold' EP (basketball shoe)
    product.id === 'p5'    // Sabrina 2 EP (basketball shoe)
  );



  // Generate product cards
  mensProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.id;

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="original-price">₹${product.originalPrice}</span>
          <span class="current-price">₹${product.currentPrice}</span>
          <span class="discount-badge">-${product.discount}%</span>
        </div>
      </div>
    `;

    // Add click event to entire card to show product details
    productCard.addEventListener('click', (e) => {
      // Prevent default behavior
      e.preventDefault();


      showProductDetails(product);
    }, { passive: false });

    productsGrid.appendChild(productCard);
  });

  // Function to show product details
  function showProductDetails(product) {
    // Update product details content
    const mainProductImage = document.getElementById('main-product-image');
    mainProductImage.src = product.image;
    mainProductImage.alt = product.name;

    // Add product ID as data attribute for more reliable identification
    mainProductImage.dataset.productId = product.id;



    // Update thumbnails to show the selected product
    const thumbnails = document.querySelectorAll('.thumbnails.vertical .thumbnail');
    thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('active');
      if (thumbnail.src === product.image) {
        thumbnail.classList.add('active');
      }

      // Also add product ID to thumbnails for consistency
      thumbnail.dataset.productId = product.id;
    });

    // If no thumbnail matches the product image, set the first one as active
    const activeThumb = document.querySelector('.thumbnails.vertical .thumbnail.active');
    if (!activeThumb && thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }

    // Update product name
    const productNameElement = document.getElementById('product-name');
    if (productNameElement) {
      productNameElement.textContent = product.name;
    }

    // Update price information
    document.querySelector('.price-info .original-price').textContent = `₹${product.originalPrice}`;
    document.querySelector('.price-info .current-price').textContent = `₹${product.currentPrice}`;
    document.querySelector('.price-info .discount-badge').textContent = `-${product.discount}%`;

    // Update product description
    document.getElementById('product-description-text').textContent = product.description;

    // Update Add to Cart button with product ID
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.dataset.productId = product.id;
    }

    // Show the product details section with animation
    if (galleryPriceSection.style.display === 'none') {
      // First make it visible but with opacity 0
      galleryPriceSection.style.opacity = '0';
      galleryPriceSection.style.display = 'block';

      // Scroll to product details section
      galleryPriceSection.scrollIntoView({ behavior: 'smooth' });

      // Animate the product details section
      gsap.fromTo(galleryPriceSection,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    } else {
      // If already visible, just update with a subtle animation
      gsap.fromTo(galleryPriceSection,
        { opacity: 0.8 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Scroll to product details section
      galleryPriceSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Add click event to back button
  const backButton = document.querySelector('.back-to-collection-btn');
  if (backButton) {
    backButton.addEventListener('click', () => {
      // Hide product details section with animation
      gsap.to(galleryPriceSection, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          galleryPriceSection.style.display = 'none';

          // Scroll back to men's collection
          document.getElementById('mens-collection').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Men's Collection section animation
  gsap.from('#mens-collection .product-card', {
    y: 50,
    // opacity: 0,
    duration: 0.8,
    // stagger: 0.1,
    ease: 'power4.out'
  });

  // Check if we need to show a specific product from URL parameter
  if (productId) {
    const selectedProduct = findProductById(productId);
    if (selectedProduct) {
      // Show the product details after a short delay to allow animations to complete
      setTimeout(() => {
        showProductDetails(selectedProduct);
      }, 500);
    }
  }

  // Cart modal functionality is now handled by cart.js

  // Initialize cart
  initCart();



  // Note: User icon click event is now handled in auth-ui.js

  // Hero animations
  const heroTl = gsap.timeline();

  heroTl.from('.hero-text h1', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  // .from('.hero-text p', {
  //   y: 20,
  //   opacity: 0,
  //   duration: 0.6,
  //   ease: 'power3.out'
  // }, '-=0.5')
  .from('.hero-text .buy-now-btn', {
    y: -10,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-image img', {
    x: 100,
    duration: 1,
    ease: 'power2.out',
    rotation: 10
  }, '-=0.8');

  // Features section animation
  gsap.from('.feature', {
    y: 50,
    duration: .8,
    stagger: 0.01,
    scrub: 2,
    ease: 'power2.out'
  });

  // Gallery section animation
  gsap.from('.gallery-left', {
    // scrollTrigger: {
    //   trigger: '#gallery-price',
    //   start: 'top 70%',
    //   toggleActions: 'play none none none'
    // },
    x: -50,
    // opacity: 0,
    duration: 0.8,
    scrub: 3,
    ease: 'power2.out'
  });

  gsap.from('.price-container', {
    scrollTrigger: {
      trigger: '#gallery-price',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Reviews section animation
  gsap.from('.review-stats', {
    scrollTrigger: {
      trigger: '#reviews',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.review-carousel', {
    scrollTrigger: {
      trigger: '#reviews',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.2
  });
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Product Gallery Functionality
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnails.vertical .thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainImage.src = this.src;
      mainImage.alt = this.alt;

      // Preserve product ID when switching thumbnails
      if (this.dataset.productId) {
        mainImage.dataset.productId = this.dataset.productId;
      }

      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');

      // Add animation to main image
      gsap.fromTo(mainImage,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    });
  });

  // Size selector functionality
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', function() {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Setup review carousel
  setupReviewCarousel();

  // Price animation on hover
  const priceDisplay = document.querySelector('.price-display');
  if (priceDisplay) {
    priceDisplay.addEventListener('mouseenter', () => {
      priceDisplay.style.transform = 'scale(1.05)';
    });

    priceDisplay.addEventListener('mouseleave', () => {
      priceDisplay.style.transform = 'scale(1)';
    });
  }

  // Add to cart button functionality
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Find the currently displayed product
      const productImage = document.getElementById('main-product-image');

      // Try to get product ID from data attribute first (more reliable)
      const productId = productImage.dataset.productId;
      let product;

      if (productId) {
        // Use the helper function to find product by ID
        product = findProductById(productId);

      }

      // If no product found by ID, try by name
      if (!product) {
        const productName = productImage.alt;
        product = products.find(p => p.name === productName);

      }

      // If still no product found, try by image source
      if (!product) {
        const productImage = document.getElementById('main-product-image');
        const imageSrc = productImage.src;
        product = products.find(p => p.image === imageSrc);

      }

      if (product) {
        // Add product to cart
        addToCart(product, true); // true to open cart after adding

        // Update button text and style
        addToCartBtn.textContent = 'Added to Cart!';
        addToCartBtn.style.backgroundColor = 'var(--accent-color)';

        setTimeout(() => {
          addToCartBtn.textContent = 'Add to Cart';
          addToCartBtn.style.backgroundColor = 'var(--secondary-color)';
        }, 2000);
      } else {
        console.error('Could not find product to add to cart');
        // Show error toast
        showToast('Error adding product to cart', 'error');
      }
    });
  }

  // Buy now button functionality
  const buyNowBtn = document.querySelector('.buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      // Get the product ID from the hero image
      const heroProductId = document.querySelector('#hero .hero-image img').dataset.productId;

      // Find the product in our products array using the product ID
      let heroProduct;

      if (heroProductId) {
        // Use the helper function to find the product by ID
        heroProduct = findProductById(heroProductId);
      }

      // If no product ID or product not found, try to match by name or image
      if (!heroProduct) {
        const heroProductName = document.querySelector('#hero .hero-text h1').textContent;
        const heroProductImage = document.querySelector('#hero .hero-image img').getAttribute('src');

        heroProduct = products.find(product =>
          product.name === heroProductName ||
          product.image === heroProductImage
        );
      }

      // If found, show its details, otherwise fallback to the first product
      if (heroProduct) {
        showProductDetails(heroProduct);
      } else {
        showProductDetails(products[0]);
        console.warn('Hero product not found in products array, showing first product instead');
      }
    });
  }

  // Scroll animations for sections
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };

  // Apply initial styles for scroll animation
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (section.id !== 'hero') {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });

  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);

  // Trigger once on load
  animateOnScroll();

  // Add event delegation for product card clicks (backup method)
  document.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      e.preventDefault();
      const productId = productCard.dataset.productId;
      if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {

          showProductDetails(product);
        }
      }
    }
  });

  // Setup comment form
  setupCommentForm();
});

// Function to setup review carousel
function setupReviewCarousel() {
  const reviewSlides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!reviewSlides.length || !dots.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    reviewSlides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show the current slide and activate corresponding dot
    if (reviewSlides[index] && dots[index]) {
      reviewSlides[index].classList.add('active');
      dots[index].classList.add('active');
    }
  }

  // Remove existing event listeners to prevent duplicates
  const newPrevBtn = prevBtn.cloneNode(true);
  const newNextBtn = nextBtn.cloneNode(true);
  prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

  // Next button click
  newNextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % reviewSlides.length;
    showSlide(currentSlide);
  });

  // Previous button click
  newPrevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + reviewSlides.length) % reviewSlides.length;
    showSlide(currentSlide);
  });

  // Dot click functionality
  dots.forEach((dot, index) => {
    const newDot = dot.cloneNode(true);
    dot.parentNode.replaceChild(newDot, dot);
    newDot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Clear any existing intervals and set new one
  if (window.reviewCarouselInterval) {
    clearInterval(window.reviewCarouselInterval);
  }

  window.reviewCarouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % reviewSlides.length;
    showSlide(currentSlide);
  }, 5000);
}

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
    const customerName = formData.get('customerName');
    const rating = parseInt(formData.get('rating'));
    const comment = formData.get('comment');

    // Validate form
    if (!customerName || !rating || !comment) {
      showNotification('Please fill in all fields and select a rating.', 'error');
      return;
    }

    if (rating < 1 || rating > 5) {
      showNotification('Please select a valid rating.', 'error');
      return;
    }

    // Save comment to localStorage
    saveComment({ customerName, rating, comment });

    // Add comment to carousel
    addCommentToCarousel({ customerName, rating, comment });

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
  const comments = JSON.parse(localStorage.getItem('stepstyle-men-comments') || '[]');
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
  localStorage.setItem('stepstyle-men-comments', JSON.stringify(comments));

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
        <div class="reviewer-name">${commentData.customerName}</div>
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

  // Re-setup carousel functionality to include new slide
  setupReviewCarousel();

  // Show the new slide immediately
  const allSlides = document.querySelectorAll('.review-slide');
  const allDots = document.querySelectorAll('.dot');

  // Hide all slides and remove active from all dots
  allSlides.forEach(slide => slide.classList.remove('active'));
  allDots.forEach(dot => dot.classList.remove('active'));

  // Show the new slide
  newSlide.classList.add('active');
  newDot.classList.add('active');
}

// Function to update review stats
function updateReviewStats(comments) {
  const ratingNumber = document.querySelector('.rating-number');
  const totalReviews = document.querySelector('.total-reviews');

  if (!ratingNumber || !totalReviews || comments.length === 0) return;

  // Calculate average rating (including existing reviews)
  const existingRating = 4.8;
  const existingCount = 128;

  const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
  const newAverage = ((existingRating * existingCount) + totalRating) / (existingCount + comments.length);

  ratingNumber.textContent = newAverage.toFixed(1);
  totalReviews.textContent = `Based on ${existingCount + comments.length} reviews`;
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

// Function to load saved comments on page load
function loadSavedComments() {
  const comments = JSON.parse(localStorage.getItem('stepstyle-men-comments') || '[]');

  comments.forEach(comment => {
    addCommentToCarousel(comment);
  });

  if (comments.length > 0) {
    updateReviewStats(comments);
  }
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