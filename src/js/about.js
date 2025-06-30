/**
 * About page JavaScript
 * Handles animations and interactions for the About page using GSAP
 */

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../styles/about.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Set up smooth scrolling with GSAP
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  emailjs.init("XPyoJ8UBgZ4vu3W7b");

  // Check if user is authenticated
  checkAuth();

  // Initialize animations
  initAnimations();

  // Show welcome toast
  showWelcomeToast();

  // Note: User icon click event is now handled in auth-ui.js
});

/**
 * Initialize all animations for the about page
 */
function initAnimations() {
  // Hero section animation
  animateHeroSection();

  // Story section animation
  animateStorySection();

  // Values animation
  animateValuesSection();

  // Founders section animation
  animateFoundersSection();

  // Team members animation
  animateTeamSection();
}

/**
 * Animate the hero section using GSAP
 */
function animateHeroSection() {
  // Create a timeline for hero section animations
  const heroTl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1
    }
  });

  // Animate hero title
  heroTl.from('.hero-content h1', {
    y: 50,
    opacity: 0
  });

  // Animate hero subtitle
  // heroTl.from('.hero-content p', {
  //   x: 30,
  //   opacity: 0,
  //   delay: 0.2
  // }, "-=0.5");
}

/**
 * Animate the story section using GSAP ScrollTrigger
 */
function animateStorySection() {
  // Check if the section exists
  const storySection = document.querySelector('.brand-story');
  if (!storySection) return;

  // Animate story content
  gsap.from('.story-content', {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.brand-story',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });

  // Animate story image
  gsap.from('.story-image', {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.brand-story',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });
}

/**
 * Animate the values section using GSAP ScrollTrigger
 */
function animateValuesSection() {
  // Check if the section exists
  const valuesSection = document.querySelector('.values-grid');
  if (!valuesSection) return;

  // Animate value items with stagger
  gsap.from('.value-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.values-grid',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });
}

/**
 * Animate the founders section using GSAP ScrollTrigger
 */
function animateFoundersSection() {
  // Check if the section exists
  const foundersSection = document.querySelector('.founders-section');
  if (!foundersSection) return;

  // Animate founders story section
  gsap.from('.founders-story .founders-image', {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.founders-story',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.founders-story .founders-content', {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.founders-story',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });

  // Animate founder cards with stagger
  gsap.from('.founder-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.founders-grid',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });

  // Animate founder quotes with a slight delay
  gsap.from('.founder-quote', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.2,
    delay: 0.5,
    scrollTrigger: {
      trigger: '.founders-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Animate founder social icons with stagger
  gsap.from('.founder-social a', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    delay: 0.8,
    scrollTrigger: {
      trigger: '.founders-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
}

/**
 * Animate the team section using GSAP ScrollTrigger
 */
function animateTeamSection() {
  // Check if the section exists
  const teamSection = document.querySelector('.team-grid');
  if (!teamSection) return;

  // Animate team members with stagger
  gsap.from('.team-member', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.team-grid',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    }
  });
}

/**
 * Show welcome toast notification using GSAP
 */
function showWelcomeToast() {
  const toast = document.querySelector('.toast-notification');

  if (toast) {
    // Create a timeline for toast animation
    const toastTl = gsap.timeline();

    // Show toast with animation
    toastTl.to(toast, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 1
    });

    // Hide toast after 3 seconds
    toastTl.to(toast, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      delay: 3
    });
  }
}

// Add event listeners for CTA buttons with GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cta-buttons .btn');

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Show different message based on which button was clicked
      const toast = document.querySelector('.toast-notification');
      const toastMessage = document.querySelector('.toast-message');

      if (e.target.classList.contains('primary-btn')) {
        toastMessage.textContent = 'Redirecting to Top Picks...';

        // Redirect to home page Top Picks section after animation
        setTimeout(() => {
          window.location.href = '../index.html#page3';
        }, 1500);
      } else {
        toastMessage.textContent = 'Follow us on social media!';
      }

      // Create a timeline for toast animation
      const toastTl = gsap.timeline();

      // Show toast with animation
      toastTl.to(toast, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      // Hide toast after 3 seconds
      toastTl.to(toast, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        delay: 3
      });

      // Add button animation
      gsap.to(e.target, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    });
  });

  // Initialize contact form
  initContactForm();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }
}

/**
 * Handle contact form submission
 */
function handleContactFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const contactData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  // Validate form data
  if (!validateContactForm(contactData)) {
    return;
  }

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Send email using EmailJS
  const templateParams = {
    from_name: contactData.name,
    from_email: contactData.email,
    subject: contactData.subject,
    message: contactData.message,
    to_email: 'stepstyle2052025@gmail.com'
  };

  emailjs.send('service_8gpdy3a', 'template_puwgwp7', templateParams)
    .then(function(response) {
      console.log('Email sent successfully!', response.status, response.text);

      // Reset form
      e.target.reset();

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Show success message
      showContactSuccessToast();

    }, function(error) {
      console.error('Failed to send email:', error);

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Show error message
      showContactErrorToast('Failed to send message. Please try again or contact us directly.');
    });
}

/**
 * Validate contact form data
 */
function validateContactForm(data) {
  const { name, email, subject, message } = data;

  if (!name.trim()) {
    showContactErrorToast('Please enter your name');
    return false;
  }

  if (!email.trim() || !isValidEmail(email)) {
    showContactErrorToast('Please enter a valid email address');
    return false;
  }

  if (!subject.trim()) {
    showContactErrorToast('Please enter a subject');
    return false;
  }

  if (!message.trim()) {
    showContactErrorToast('Please enter your message');
    return false;
  }

  return true;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show success toast for contact form
 */
function showContactSuccessToast() {
  showToast('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
}

/**
 * Show error toast for contact form
 */
function showContactErrorToast(message) {
  showToast(message, 'error');
}

/**
 * Generic toast notification function
 */
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.contact-toast');
  existingToasts.forEach(toast => toast.remove());

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `contact-toast contact-toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="ph ph-${type === 'success' ? 'check-circle' : 'warning-circle'}"></i>
    </div>
    <div class="toast-message">${message}</div>
  `;

  // Add toast styles
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#2ecc71' : '#e74c3c',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });

  // Add to page
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 5000);
}
