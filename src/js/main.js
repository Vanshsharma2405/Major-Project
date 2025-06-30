import '../styles/style.css';
import Lenis from 'lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from 'swiper';
import 'swiper/css';
import { initCart } from './cart.js';

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline();

// Loader animation
// function loaderAnimation() {
//   // Disable scrolling by adding the no-scroll class
//   document.body.classList.add('no-scroll');

//   // Animate the text elements
//   tl.from('#loader h3', {
//     x: 30,
//     opacity: 0,
//     delay: .5,
//     duration: 1.2,
//     ease: "power2.out",
//     stagger: 0.1,
//   });

//   // After loading is complete
//   tl.to('#loader h3', {
//     opacity: 0,
//     duration: 2,
//     stagger: -0.1,
//     delay: 1,
//   });

//   // Hide the loading bar and text
//   tl.to('#loader', {
//     opacity: 0,
//     y: 700,
//     ease: "power2.inOut",
//     duration: .7,
//   }, );

//   // Finally hide the entire loader
//   tl.to('.loading', {
//     duration: 1,
//     ease: "power2.inOut",
//     opacity: 0,
//     onComplete: function() {
//       // Remove no-scroll class to enable scrolling
//       document.body.classList.remove('no-scroll');
//       // Hide loader completely
//       document.querySelector('.loading').style.display = 'none';
//     },
//   });
// }
// loaderAnimation();

// // Landing page animation
// function landingPageAnimation() {
//   tl.from("#page1-part1 h1 span", {
//     duration: .5,
//     opacity: 0,
//     y: 100,
//     ease: "back.out",
//     stagger: .1,
//   });
//   tl.from("#page1-part1 img", {
//     duration: 1,
//     opacity: 0,
//     scale: 1,
//     ease: "power2.out",
//     stagger: 0.1,
//   });
// }
// landingPageAnimation();
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto", // or use a number like 3 or 4
  spaceBetween: -50,
  freeMode: true, // Enable free scrolling
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let cursr = document.querySelector("#cursor");
let footer = document.querySelector('footer');
let page1 = document.querySelector("#page1");



// Navbar scroll feature
function navBarScrollAnimation() {
  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
      navbar.style.top = "-90px"; // Hide navbar
    } else {
      navbar.style.top = "0"; // Show navbar
    }
    lastScrollTop = currentScroll;
  });
}
navBarScrollAnimation();

page1.addEventListener("mousemove", function(dets) {
  gsap.to(cursr, {
    x: dets.x,
    y: dets.y,
    duration: .7,
    ease: "back.out",
  });
});

footer.addEventListener("mouseenter", () => {
  cursr.style.display = "none";
  cursr.style.scale = 0;
  cursr.style.opacity = 0;
});
footer.addEventListener("mouseleave", () => {
  cursr.style.display = "initial";
  cursr.style.scale = 1;
  cursr.style.opacity = 1;
});
page1.addEventListener("mouseenter", () => {
  cursr.style.display = "initial";
  cursr.style.scale = 1;
  cursr.style.opacity = 1;
});
page1.addEventListener("mouseleave", () => {
  cursr.style.display = "none";
  cursr.style.scale = 0;
  cursr.style.opacity = 0;
});

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// Handle URL hash navigation for smooth scrolling to sections
function handleHashNavigation() {
  // Check if there's a hash in the URL when page loads
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1); // Remove the # symbol
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Wait for page to fully load and animations to complete
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 2000); // Wait 2 seconds for loader animation to complete
    }
  }
}

// Initialize hash navigation
handleHashNavigation();

// Page2 video hover functionality
const promoSections = document.querySelectorAll('#page2 .promo');

// Add hover functionality to each promo section in page2
promoSections.forEach(promoSection => {
  // Get the main image (not the logo image)
  const images = promoSection.querySelectorAll('img');
  let mainImg = null;

  // Find the main image (not the logo)
  if (images.length > 0) {
    // If there's an AirMaxLogo, use the other image
    const airMaxLogo = promoSection.querySelector('#AirMaxLogo');
    if (airMaxLogo) {
      // Find the image that is not the logo
      for (let i = 0; i < images.length; i++) {
        if (images[i].id !== 'AirMaxLogo') {
          mainImg = images[i];
          break;
        }
      }
    } else {
      // Just use the first image if there's no logo
      mainImg = images[0];
    }
  }

  const mouseVideo = promoSection.querySelector('.mouse-video');
  const video = mouseVideo ? mouseVideo.querySelector('video') : null;

  if (mainImg && mouseVideo && video) {
    // Show video on hover
    mainImg.addEventListener('mouseenter', () => {
      // Make sure we're only affecting this specific promo section
      mouseVideo.classList.add('active');
      if (video.paused) {
        video.play();
      }
    });

    // Hide video when mouse leaves
    mainImg.addEventListener('mouseleave', () => {
      mouseVideo.classList.remove('active');
      video.pause();
    });
  }
});

// Get the image-a element for the original mouse follower functionality
let imageA = document.querySelector('.image-a img');
const follower = document.querySelector('.image-a .mouse-follower');

if (imageA) {
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let animationFrame;

  function animateFollower() {
    const speed = 0.1;
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;

    animationFrame = requestAnimationFrame(animateFollower);
  }

  function updateTargetPosition(e) {
    const rect = imageA.getBoundingClientRect();
    mouseX = e.clientX - rect.left - follower.offsetWidth / 2;
    mouseY = e.clientY - rect.top - follower.offsetHeight / 2;
  }

  imageA.addEventListener('mouseenter', (e) => {
    follower.classList.add('active');
    updateTargetPosition(e);
    cancelAnimationFrame(animationFrame);
    animateFollower();
  });

  imageA.addEventListener('mousemove', (e) => {
    updateTargetPosition(e);
  });

  imageA.addEventListener('mouseleave', () => {
    follower.classList.remove('active');
    cancelAnimationFrame(animationFrame);
  });
}

let twitterIcon = document.querySelector(".social-icons #twitter");
let facebookIcon = document.querySelector(".social-icons #facebook");
let instagramIcon = document.querySelector(".social-icons #instagram");
let youtubeIcon = document.querySelector(".social-icons #youtube");

twitterIcon.addEventListener('click', () => {
  location.href = "https://twitter.com/Nike";
});
facebookIcon.addEventListener('click', () => {
  location.href = "https://www.facebook.com/Nike/";
});
instagramIcon.addEventListener('click', () => {
  location.href = "https://www.instagram.com/nike/";
});
youtubeIcon.addEventListener('click', () => {
  location.href = "https://www.youtube.com/@nike";
});

let trendingBtn = document.querySelector("#page4 .page4-grid #image-a-content button");

// Add click event to the Shop button to navigate to men's collection section
trendingBtn.addEventListener('click', () => {
  // Navigate to men.html and scroll to the collection section
  window.location.href = './Pages/men.html#mens-collection';
});

// Check if we need to show a specific product from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

// Function to find a product by ID
function findProductById(id) {
  // This function should return the product object if found, or null if not
  // You can replace this with your actual product data source
  const products = [
    { id: 'p16', name: 'React Presto', image: './assets/images/nike shoe.png', price: 12995 },
    // Add more products as needed
  ];
  return products.find(product => product.id === id);
}

// Function to show product details
function showProductDetails(product) {
  // This function should display the product details in the UI
  // You can replace this with your actual implementation
  console.log('Showing product details:', product);
  // Add your code here to update the UI with the product details
}

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

// Initialize cart functionality immediately and also on DOMContentLoaded
// This ensures the cart is initialized even when navigating between pages
initCart();

// Also initialize on DOMContentLoaded for safety
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart functionality again to ensure it's properly set up
  initCart();

  // Check if user is authenticated
  checkAuth();

  // Note: User icon click event is now handled in auth-ui.js
});