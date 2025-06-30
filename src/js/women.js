import '../styles/women.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { sharedProducts } from './shared-products';
import { initCart, addToCart } from './cart';
import 'remixicon/fonts/remixicon.css';


const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Initialize cart immediately to ensure it works when navigating between pages
initCart();

// Define the hero product (StepStyle AirGlide Elite)
const heroProduct = {
  id: 'hero1',
  name: 'StepStyle AirGlide Elite',
  originalPrice: 15995,
  currentPrice: 12795,
  discount: 20,
  description: 'The StepStyle AirGlide Elite features revolutionary cushioning technology for maximum comfort. Perfect for both athletic performance and casual wear, these shoes are designed to keep you comfortable all day long with cloud-like cushioning that elevates your style.',
  images: [
    '../assets/images/girl-removebg.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
  ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {


  // Check for product ID in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  // Setup the women's collection
  setupWomensCollection();

  // Setup the product gallery
  setupProductGallery();

  // Setup the review carousel
  setupReviewCarousel();

  // Setup comment form
  setupCommentForm();

  // Setup the hero section "Buy Now" button
  setupHeroButton();

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

  // Initialize cart
  initCart();



  // Add event delegation for product card clicks (backup method)
  document.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      e.preventDefault();
      const productId = productCard.dataset.productId;
      if (productId) {
        const product = findProductById(productId);
        if (product) {

          showProductDetails(product);
        }
      }
    }
  });

  // Note: User icon click event is now handled in auth-ui.js
});

// Women's products data
const womensProducts = [
  {
    id: 'w1',
    name: 'Nike Cortez Women',
    originalPrice: 14088,
    currentPrice: 11895,
    discount: 16,
    description: 'The Nike Cortez Women features revolutionary cushioning technology for maximum comfort. Perfect for both athletic performance and casual wear, these shoes are designed to keep you comfortable all day long.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  {
    id: 'w2',
    name: 'Sabrina 2 EP',
    originalPrice: 11895,
    currentPrice: 9995,
    discount: 16,
    description: 'Experience cloud-like comfort with the Sabrina 2 EP. These lightweight running shoes feature responsive cushioning and breathable mesh upper, making them perfect for your daily runs or casual wear.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  },
  {
    id: 'w3',
    name: 'Sabrina 2 NRG EP',
    originalPrice: 18699,
    currentPrice: 15995,
    discount: 14,
    description: 'The Sabrina 2 NRG EP is designed for natural movement and flexibility. With a lightweight construction and flexible sole, these shoes adapt to your foot\'s natural motion, providing comfort and support for any activity.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  {
    id: 'w4',
    name: 'Nike Dunk Low',
    originalPrice: 10995,
    currentPrice: 8795,
    discount: 20,
    description: 'Elevate your street style with the Nike Dunk Low. These fashion-forward shoes combine trendy design with all-day comfort, making them the perfect addition to your casual wardrobe.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  },
  {
    id: 'w5',
    name: 'Air Max 90',
    originalPrice: 12995,
    currentPrice: 10395,
    discount: 20,
    description: 'Experience ultimate breathability with the Air Max 90. Featuring a lightweight mesh upper and cushioned sole, these shoes keep your feet cool and comfortable all day long.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fe30fc4-2645-4d1e-b3f0-e01dc744b4d5/air-max-90-shoes-N7Tbw0.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  },
  {
    id: 'w6',
    name: 'Nike Dunk Low Retro',
    originalPrice: 12995,
    currentPrice: 9995,
    discount: 23,
    description: 'The Nike Dunk Low Retro combines sophisticated style with athletic performance. These premium shoes feature luxurious materials and advanced cushioning technology for a truly elevated experience.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-shoes-t4Rq7P.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  }
];

// Function to find a product by ID
function findProductById(id) {
  // Check if it's the hero product
  if (id === 'hero1') return heroProduct;

  // First try to find in shared products
  const sharedProduct = sharedProducts.find(product => product.id === id);
  if (sharedProduct) return sharedProduct;

  // If not found in shared products, try women's products
  return womensProducts.find(product => product.id === id);
}

// Function to setup the hero section "Buy Now" button
function setupHeroButton() {
  const buyNowBtn = document.querySelector('.buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      // Show the hero product details
      showProductDetails(heroProduct);

      // Scroll to the product details section
      const galleryPriceSection = document.getElementById('gallery-price');
      galleryPriceSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Function to setup the women's collection
function setupWomensCollection() {
  const productsSection = document.getElementById('womens-collection');
  if (!productsSection) {
    console.error('Women\'s collection section not found in the DOM');
    return;
  }

  const productsGrid = productsSection.querySelector('.products-grid');
  if (!productsGrid) {
    console.error('Products grid not found in the women\'s collection section');
    return;
  }



  // Clear the grid
  productsGrid.innerHTML = '';

  // Update with new products from the image - with exact prices and discounts from the image
  const updatedProducts = [
    {
      id: 'w1',
      name: 'Nike Dunk Low Retro',
      originalPrice: 14088,
      currentPrice: 11270,
      discount: 20,
      description: 'The Nike Dunk Low Retro features revolutionary cushioning technology for maximum comfort. Perfect for both athletic performance and casual wear, these shoes are designed to keep you comfortable all day long.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png'
      ]
    },
    {
      id: 'w2',
      name: 'Sabrina 2 \'Stronger Than Gold\' EP',
      originalPrice: 18699,
      currentPrice: 14959,
      discount: 20,
      description: 'Experience cloud-like comfort with the Sabrina 2 \'Stronger Than Gold\' EP. These lightweight running shoes feature responsive cushioning and breathable mesh upper, making them perfect for your daily runs or casual wear.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
      ]
    },
    {
      id: 'w3',
      name: 'Sabrina 2 EP',
      originalPrice: 11895,
      currentPrice: 9516,
      discount: 20,
      description: 'The Sabrina 2 EP is designed for natural movement and flexibility. With a lightweight construction and flexible sole, these shoes adapt to your foot\'s natural motion, providing comfort and support for any activity.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
      ]
    },
    {
      id: 'w4',
      name: 'Air Max 270',
      originalPrice: 12995,
      currentPrice: 10396,
      discount: 20,
      description: 'Elevate your street style with the Air Max 270. These fashion-forward shoes combine trendy design with all-day comfort, making them the perfect addition to your casual wardrobe.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fe30fc4-2645-4d1e-b3f0-e01dc744b4d5/air-max-270-shoes-N7Tbw0.png'
      ]
    },
    {
      id: 'w5',
      name: 'Kyrie 9 Traction',
      originalPrice: 13995,
      currentPrice: 11196,
      discount: 20,
      description: 'Experience ultimate performance with the Kyrie 9 Traction. Featuring a lightweight mesh upper and cushioned sole, these shoes keep your feet cool and comfortable all day long.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/kyrie-9-basketball-shoes-8rTxTn.png'
      ]
    },
    {
      id: 'w6',
      name: 'Air Jordan 1 Mid',
      originalPrice: 12295,
      currentPrice: 9836,
      discount: 20,
      description: 'The Air Jordan 1 Mid combines sophisticated style with athletic performance. These premium shoes feature luxurious materials and advanced cushioning technology for a truly elevated experience.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e3d0d728-b94a-4048-9b94-0d2fa8f2c9a1/air-jordan-1-mid-shoes-SQf7DM.png'
      ]
    },
    {
      id: 'w7',
      name: 'Nike Air Force 1 \'07',
      originalPrice: 9695,
      currentPrice: 7756,
      discount: 20,
      description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-shoes-x9rjZV.png'
      ]
    },
    {
      id: 'w8',
      name: 'Nike Blazer Mid \'77',
      originalPrice: 8695,
      currentPrice: 6956,
      discount: 20,
      description: 'In the \'70s, Nike was the new shoe on the block. So new in fact, we were still working on our game. No matter the sport, the Nike Blazer Mid \'77 has transformed into a style icon with its classic simplicity and comfort.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-shoes-pKBLLS.png'
      ]
    },
    {
      id: 'w9',
      name: 'Nike Cortez',
      originalPrice: 8495,
      currentPrice: 6796,
      discount: 20,
      description: 'The Nike Cortez, Nike\'s first track shoe, was designed by co-founder Bill Bowerman and released in 1972. The iconic running shoe features a leather and synthetic leather construction for added durability.',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png'
      ]
    }
  ];

  // Generate product cards
  updatedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.id;

    // Format for the image - exactly matching the image with original price and discount badge
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}">
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
}



// Function to setup the product gallery
function setupProductGallery() {
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainImage.src = this.src;
      mainImage.alt = this.alt;

      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');

      // Add animation to main image
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.style.opacity = '1';
      }, 100);



      // Important: When a thumbnail is clicked, we need to find the corresponding product
      // and update the Add to Cart button's product ID
      const addToCartBtn = document.querySelector('#gallery-price .add-to-cart-btn');
      if (addToCartBtn) {
        // Get the product ID from the thumbnail itself
        // This is more reliable than getting it from the main image
        const productId = this.dataset.productId;

        if (productId) {
          // Keep the same product ID even when thumbnails are clicked
          // This ensures we're adding the correct product to cart
          addToCartBtn.dataset.productId = productId;
        } else {
          // Fallback to main image if thumbnail doesn't have product ID
          const currentProductId = mainImage.dataset.productId;
          addToCartBtn.dataset.productId = currentProductId;
        }
      }
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

  // Add to cart button functionality
  const addToCartBtn = document.querySelector('#gallery-price .add-to-cart-btn');
  if (addToCartBtn) {
    // Remove any existing event listeners to prevent duplicates
    const newAddToCartBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);

    newAddToCartBtn.addEventListener('click', () => {
      // Get product ID directly from the button
      let productId = newAddToCartBtn.dataset.productId;

      // Fallback to image dataset if button doesn't have product ID
      if (!productId) {
        const productImage = document.getElementById('main-product-image');
        productId = productImage.dataset.productId;
      }

      // Find the product
      const product = findProductById(productId);

      if (product) {
        // Add product to cart and open the cart modal (true parameter)
        addToCart(product, true);

        // Update button text and style
        newAddToCartBtn.textContent = 'Added to Cart!';
        newAddToCartBtn.style.backgroundColor = 'var(--accent-color)';

        setTimeout(() => {
          newAddToCartBtn.textContent = 'Add to Cart';
          newAddToCartBtn.style.backgroundColor = 'var(--secondary-color)';
        }, 2000);
      } else {
        console.error('Product not found with ID:', productId);

        // Fallback: Get the first product from womensProducts
        if (womensProducts.length > 0) {
          const fallbackProduct = womensProducts[0];
          // Add fallback product to cart and open the cart modal (true parameter)
          addToCart(fallbackProduct, true);

          // Update button text and style
          newAddToCartBtn.textContent = 'Added to Cart!';
          newAddToCartBtn.style.backgroundColor = 'var(--accent-color)';

          setTimeout(() => {
            newAddToCartBtn.textContent = 'Add to Cart';
            newAddToCartBtn.style.backgroundColor = 'var(--secondary-color)';
          }, 2000);
        }
      }
    });
  }
}

// Function to setup the review carousel
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

// Function to show product details
function showProductDetails(product) {
  // Update main image and thumbnails
  const mainImage = document.getElementById('main-product-image');
  mainImage.src = product.images[0];
  mainImage.alt = product.name;

  // Make sure to set the product ID in the dataset
  mainImage.dataset.productId = product.id;

  // Update thumbnails with different shoe images
  const thumbnails = document.querySelectorAll('.thumbnail');

  // Collection of different shoe images for thumbnails
  const shoeImages = [
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fe30fc4-2645-4d1e-b3f0-e01dc744b4d5/air-max-270-shoes-N7Tbw0.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/kyrie-9-basketball-shoes-8rTxTn.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e3d0d728-b94a-4048-9b94-0d2fa8f2c9a1/air-jordan-1-mid-shoes-SQf7DM.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-shoes-x9rjZV.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-shoes-pKBLLS.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png'
  ];

  // If this is the hero product, use its images for the first few thumbnails
  const isHeroProduct = product.id === 'hero1';

  thumbnails.forEach((thumbnail, index) => {
    // First thumbnail is always the main product image
    if (index === 0) {
      thumbnail.src = product.images[0];
      thumbnail.alt = `${product.name} - Main View`;
      thumbnail.dataset.productId = product.id;
    } else if (isHeroProduct && index < product.images.length) {
      // For hero product, use its additional images for the next thumbnails
      thumbnail.src = product.images[index];
      thumbnail.alt = `${product.name} - View ${index + 1}`;
      thumbnail.dataset.productId = product.id;
    } else {
      // Use different shoe images for other thumbnails
      const imageIndex = (index - 1) % shoeImages.length;
      thumbnail.src = shoeImages[imageIndex];
      thumbnail.alt = `Different Shoe Style ${index}`;

      // Important: All thumbnails should reference the same product ID
      // This ensures that clicking any thumbnail still adds the correct product to cart
      thumbnail.dataset.productId = product.id;
    }
    thumbnail.style.display = 'block';
  });

  // Set first thumbnail as active
  thumbnails.forEach(t => t.classList.remove('active'));
  thumbnails[0].classList.add('active');

  // Update product name
  const productNameElement = document.getElementById('product-name');
  if (productNameElement) {
    productNameElement.textContent = product.name;
  }

  // Update price information
  const originalPrice = document.querySelector('.price-display .original-price');
  const currentPrice = document.querySelector('.price-display .current-price');
  const discountBadge = document.querySelector('.price-display .discount-badge');

  // Always show original price and discount badge
  originalPrice.textContent = `₹${product.originalPrice.toLocaleString()}`;
  originalPrice.style.display = 'inline-block';

  // Use the discount from the product data
  discountBadge.textContent = `-${product.discount}%`;
  discountBadge.style.display = 'inline-block';

  currentPrice.textContent = `₹${product.currentPrice.toLocaleString()}`;

  // Update product description
  const productDescription = document.getElementById('product-description-text');
  productDescription.textContent = product.description;

  // Update the Add to Cart button with the product ID
  const addToCartBtn = document.querySelector('#gallery-price .add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.dataset.productId = product.id;

    // Store the current product object in a data attribute for easy access
    addToCartBtn.dataset.product = JSON.stringify({
      id: product.id,
      name: product.name,
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      discount: product.discount,
      image: product.images[0]  // Add image for cart display
    });



    // Remove any existing event listeners to prevent duplicates
    const newAddToCartBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);

    // Add event listener to the new button
    newAddToCartBtn.addEventListener('click', () => {
      // Add product to cart and open the cart modal
      addToCart(product, true);

      // Update button text and style
      newAddToCartBtn.textContent = 'Added to Cart!';
      newAddToCartBtn.style.backgroundColor = 'var(--accent-color)';

      setTimeout(() => {
        newAddToCartBtn.textContent = 'Add to Cart';
        newAddToCartBtn.style.backgroundColor = 'var(--secondary-color)';
      }, 2000);
    });
  }

  // Show the product details section with animation
  const galleryPriceSection = document.getElementById('gallery-price');
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

          // Scroll back to women's collection
          document.getElementById('womens-collection').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Function to handle navbar scroll animation
function navBarScrollAnimation() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.style.top = '-100px';
    } else {
      // Scrolling up
      navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
  });
}

// Initialize navbar scroll animation
navBarScrollAnimation();

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
          s.style.color = '#FFD700';
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
        s.style.color = '#FFD700';
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
  const comments = JSON.parse(localStorage.getItem('stepstyle-women-comments') || '[]');
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
  localStorage.setItem('stepstyle-women-comments', JSON.stringify(comments));

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
  const existingRating = 4.9;
  const existingCount = 156;

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
  const comments = JSON.parse(localStorage.getItem('stepstyle-women-comments') || '[]');

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
