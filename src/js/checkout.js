/**
 * Checkout functionality for StepStyle website
 * Handles order summary and checkout steps
 */

import { getCart, showToast } from './cart.js';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('Checkout.js loaded');

  // Initialize checkout page
  initCheckout();
});

/**
 * Initialize checkout page
 */
function initCheckout() {
  // Get cart items from localStorage directly to ensure we have the latest data
  let cart = [];
  try {
    const storedCart = localStorage.getItem('stepstyle-cart');
    console.log('Raw cart from localStorage:', storedCart);

    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    cart = [];
  }

  // Fallback to getCart() if cart is empty
  if (!cart || cart.length === 0) {
    cart = getCart();
  }

  // For testing scrollable items - uncomment this to test with multiple items
  /*
  if (cart.length > 0 && cart.length < 5) {
    const testItem = cart[0];
    // Clone the first item a few times to test scrolling
    for (let i = 0; i < 5; i++) {
      const clonedItem = {...testItem};
      clonedItem.name = `${testItem.name} (Copy ${i+1})`;
      cart.push(clonedItem);
    }
  }
  */

  console.log('Cart items for checkout:', cart);

  // Display order summary
  displayOrderSummary(cart);

  // Initialize checkout steps
  initCheckoutSteps();

  // Set up event listeners
  setupEventListeners();
}

/**
 * Initialize checkout steps
 */
function initCheckoutSteps() {
  // Make the first step active by default
  const firstStep = document.getElementById('contact-step');
  if (firstStep) {
    firstStep.classList.add('active');
  }

  // Initialize step headers to be clickable
  const stepHeaders = document.querySelectorAll('.step-header');
  stepHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const step = this.parentElement;
      toggleStep(step);
    });
  });

  // Initialize delivery options
  const deliveryOptions = document.querySelectorAll('.delivery-option');
  deliveryOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      deliveryOptions.forEach(opt => opt.classList.remove('selected'));
      // Add selected class to clicked option
      this.classList.add('selected');
      // Check the radio input
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;

        // Check if payment step should be enabled
        checkPaymentStepAvailability();
      }
    });
  });

  // Initialize payment options
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      paymentOptions.forEach(opt => opt.classList.remove('selected'));
      // Add selected class to clicked option
      this.classList.add('selected');
      // Check the radio input
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        // Show the appropriate payment form based on the selected payment method
        showPaymentForm(radio.value);
      }
    });
  });

  // Initialize payment forms
  showPaymentForm('mastercard'); // Show default payment form

  // Initialize UPI app selection
  const upiApps = document.querySelectorAll('.upi-app');
  upiApps.forEach(app => {
    app.addEventListener('click', function() {
      // Check the radio input
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });

  // Initialize country selection
  const countrySelect = document.getElementById('country');
  const citySelect = document.getElementById('city');

  if (countrySelect && citySelect) {
    countrySelect.addEventListener('change', function() {
      updateCities(this.value);
    });

    // Initialize cities based on default country
    updateCities(countrySelect.value);
  }

  // Initialize country code selection for phone
  const countryCodeSelect = document.getElementById('country-code-select');
  const selectedOption = document.querySelector('.selected-option');

  if (countryCodeSelect && selectedOption) {
    // Update the selected option text when the select changes
    countryCodeSelect.addEventListener('change', function() {
      // Get the selected option text
      const selectedText = this.options[this.selectedIndex].text;
      // Update the displayed text
      selectedOption.textContent = selectedText;
      // Validate phone number when country code changes
      validatePhoneNumber();
    });
  }

  // Initialize phone number input to only accept numbers
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    // Only allow numbers in the phone field
    phoneInput.addEventListener('input', function(e) {
      // Remove any non-digit characters
      this.value = this.value.replace(/\D/g, '');

      // Validate phone number
      validatePhoneNumber();
    });

    // Initial validation
    validatePhoneNumber();
  }

  // Initialize pin code input to only accept numbers and limit to 6 digits
  const zipCodeInput = document.getElementById('zipCode');
  if (zipCodeInput) {
    // Only allow numbers in the pin code field and limit to 6 digits
    zipCodeInput.addEventListener('input', function(e) {
      // Remove any non-digit characters
      this.value = this.value.replace(/\D/g, '');

      // Limit to 6 digits
      if (this.value.length > 6) {
        this.value = this.value.slice(0, 6);
      }

      // Validate pin code
      validatePinCode();
    });

    // Initial validation
    validatePinCode();
  }

  // Initialize form validation for all required fields
  const requiredInputs = document.querySelectorAll('input[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('input', function() {
      validateAllFields();
    });
  });

  // Initialize Razorpay
  initializeRazorpay();

  // Initialize UPI ID input
  const upiIdInput = document.getElementById('upiId');
  const upiIdConfirmation = document.getElementById('upiIdConfirmation');
  const displayUpiId = document.getElementById('displayUpiId');
  const upiPaymentAction = document.getElementById('upiPaymentAction');

  if (upiIdInput && upiIdConfirmation && displayUpiId) {
    upiIdInput.addEventListener('input', function() {
      const upiId = this.value.trim();

      if (upiId && upiId.includes('@')) {
        // Show confirmation message with the entered UPI ID
        displayUpiId.textContent = upiId;
        upiIdConfirmation.style.display = 'flex';

        // Show payment button when valid UPI ID is entered
        if (upiPaymentAction) {
          upiPaymentAction.style.display = 'block';
        }
      } else {
        // Hide confirmation message if UPI ID is invalid
        upiIdConfirmation.style.display = 'none';

        // Hide payment button when UPI ID is invalid
        if (upiPaymentAction) {
          upiPaymentAction.style.display = 'none';
        }
      }
    });
  }

  // Initialize UPI Pay button
  const upiPayButton = document.getElementById('upiPayButton');
  const upiPaymentStatus = document.getElementById('upiPaymentStatus');
  const upiAppName = document.getElementById('upiAppName');

  if (upiPayButton) {
    upiPayButton.addEventListener('click', function() {
      // Get selected UPI app
      const selectedUpiApp = document.querySelector('input[name="upiApp"]:checked');
      const upiId = upiIdInput ? upiIdInput.value.trim() : '';

      if (selectedUpiApp && upiId) {
        const appValue = selectedUpiApp.value;
        let appName = 'your UPI app';

        // Set app name based on selection
        switch (appValue) {
          case 'gpay':
            appName = 'Google Pay';
            break;
          case 'phonepe':
            appName = 'PhonePe';
            break;
          case 'paytm':
            appName = 'Paytm';
            break;
        }

        // Update app name in status message
        if (upiAppName) {
          upiAppName.textContent = appName;
        }

        // Show payment status
        if (upiPaymentStatus) {
          upiPaymentStatus.style.display = 'block';
        }

        // Generate order data for UPI payment
        const orderData = generateOrderData();

        // Launch UPI payment
        launchUpiPayment(appValue, upiId, orderData);
      }
    });
  }

  // Initial form validation
  validateAllFields();
}

/**
 * Update cities dropdown based on selected country
 * @param {string} country - Selected country
 */
function updateCities(country) {
  const citySelect = document.getElementById('city');
  if (!citySelect) return;

  // Clear current options
  citySelect.innerHTML = '';

  // Add new options based on country
  let cities = [];

  switch(country.toLowerCase()) {
    case 'india':
      cities = [
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'bangalore', label: 'Bangalore' },
        { value: 'hyderabad', label: 'Hyderabad' },
        { value: 'chennai', label: 'Chennai' },
        { value: 'kolkata', label: 'Kolkata' },
        { value: 'pune', label: 'Pune' },
        { value: 'ahmedabad', label: 'Ahmedabad' }
      ];
      break;
    case 'usa':
      cities = [
        { value: 'new-york', label: 'New York' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'phoenix', label: 'Phoenix' },
        { value: 'philadelphia', label: 'Philadelphia' }
      ];
      break;
    case 'uk':
      cities = [
        { value: 'london', label: 'London' },
        { value: 'manchester', label: 'Manchester' },
        { value: 'birmingham', label: 'Birmingham' },
        { value: 'glasgow', label: 'Glasgow' },
        { value: 'liverpool', label: 'Liverpool' }
      ];
      break;
    default:
      cities = [
        { value: 'city-1', label: 'City 1' },
        { value: 'city-2', label: 'City 2' },
        { value: 'city-3', label: 'City 3' }
      ];
  }

  // Add options to select
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.value;
    option.textContent = city.label;
    citySelect.appendChild(option);
  });
}

/**
 * Toggle a checkout step (expand/collapse)
 * @param {HTMLElement} step - The step element to toggle
 */
function toggleStep(step) {
  // If the step is disabled, do nothing
  if (step.classList.contains('disabled')) return;

  const isActive = step.classList.contains('active');

  // If the step is already active, do nothing
  if (isActive) return;

  // Remove active class from all steps
  const allSteps = document.querySelectorAll('.checkout-step');
  allSteps.forEach(s => s.classList.remove('active'));

  // Add active class to the clicked step
  step.classList.add('active');
}

/**
 * Display order summary
 * @param {Array} cart - Cart items
 */
function displayOrderSummary(cart) {
  const orderItems = document.querySelector('.order-items');
  const subtotalAmount = document.querySelector('.subtotal-amount');
  const totalAmount = document.querySelector('.total-amount');

  if (!orderItems || !subtotalAmount || !totalAmount) {
    console.error('Order summary elements not found');
    return;
  }

  // Clear order items
  orderItems.innerHTML = '';

  if (cart.length === 0) {
    // Show empty order message
    orderItems.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
      </div>
    `;

    // Update totals
    subtotalAmount.textContent = '₹0';
    totalAmount.textContent = '₹0';

    // Disable checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.cursor = 'not-allowed';
    }

    // Hide product details
    const orderDetails = document.querySelector('.order-details');
    const priceDetails = document.querySelector('.price-details');
    if (orderDetails) orderDetails.style.display = 'none';
    if (priceDetails) priceDetails.style.display = 'none';

    return;
  }

  // Show product details if they were hidden
  const orderDetails = document.querySelector('.order-details');
  const priceDetails = document.querySelector('.price-details');
  if (orderDetails) orderDetails.style.display = 'block';
  if (priceDetails) priceDetails.style.display = 'block';

  // Calculate total values
  let totalOriginalPrice = 0;
  let totalDiscountedPrice = 0;

  // Display all cart items
  cart.forEach((item, index) => {
    // Ensure item has all required properties
    if (!item.name || !item.currentPrice) {
      console.error('Invalid item in cart:', item);
      return; // Skip this item
    }

    // Ensure item has an image
    const itemImage = item.images ? item.images[0] : (item.image || '../assets/images/placeholder.jpg');

    // Calculate item prices
    const originalPrice = item.originalPrice || item.currentPrice * 2;
    const discountedPrice = item.currentPrice * (item.quantity || 1);

    // Add to totals
    totalOriginalPrice += originalPrice * (item.quantity || 1);
    totalDiscountedPrice += discountedPrice;

    // Create item element
    const itemElement = document.createElement('div');
    itemElement.className = 'order-item';

    // Add item content
    itemElement.innerHTML = `
      <img src="${itemImage}" alt="${item.name}">
      <div class="order-item-details">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-price">₹${item.currentPrice.toLocaleString('en-IN')}</div>
        <div class="order-item-quantity">Qty: ${item.quantity || 1}</div>
      </div>
    `;

    // Add to order items container
    orderItems.appendChild(itemElement);
  });

  // Ensure the order items section is scrollable if there are many items
  if (cart.length > 3) {
    // Add a class to indicate there are many items
    orderItems.classList.add('many-items');

    // Scroll to the top of the order items
    orderItems.scrollTop = 0;
  }

  // Calculate discount
  const discount = totalOriginalPrice - totalDiscountedPrice;

  // Format prices with Indian Rupee symbol and thousands separator
  const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  // Update price details
  const originalPriceElement = document.querySelector('.price-label');
  const discountPriceElement = document.querySelector('.discount-price');

  if (originalPriceElement) {
    originalPriceElement.textContent = formatPrice(totalOriginalPrice);
  }

  if (discountPriceElement) {
    discountPriceElement.textContent = formatPrice(totalDiscountedPrice);
  }

  // Update order total
  if (subtotalAmount) {
    subtotalAmount.textContent = formatPrice(totalOriginalPrice);
  }

  const discountAmount = document.querySelector('.discount-amount');
  if (discountAmount) {
    discountAmount.textContent = `-${formatPrice(discount)}`;
  }

  if (totalAmount) {
    totalAmount.textContent = formatPrice(totalDiscountedPrice);
  }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Back link
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Validate form
      if (validateForm()) {
        // Process order
        processOrder();
      }
    });
  }

  // Terms checkbox
  const termsCheckbox = document.getElementById('terms-checkbox');
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', function() {
      validateAllFields();
    });
  }
}

/**
 * Validate phone number
 * Shows success icon only when exactly 10 digits are entered
 */
function validatePhoneNumber() {
  const phoneInput = document.getElementById('phone');
  const successIcon = document.querySelector('.input-success');

  if (!phoneInput || !successIcon) return;

  const phoneValue = phoneInput.value.trim();

  // Check if phone number is exactly 10 digits
  if (phoneValue.length === 10 && /^\d{10}$/.test(phoneValue)) {
    // Show success icon
    successIcon.style.display = 'block';
    // Remove error styling if present
    phoneInput.classList.remove('error');
    const phoneGroup = document.querySelector('.phone-group');
    if (phoneGroup) {
      phoneGroup.classList.remove('error');
    }

    // Remove error message if it exists
    const errorMessage = document.querySelector('.phone-group .error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  } else {
    // Hide success icon
    successIcon.style.display = 'none';

    // Add error styling if value exists but is invalid
    if (phoneValue.length > 0) {
      phoneInput.classList.add('error');
      const phoneGroup = document.querySelector('.phone-group');
      if (phoneGroup) {
        phoneGroup.classList.add('error');
      }

      // Add error message if it doesn't exist
      let errorMessage = document.querySelector('.phone-group .error-message');
      if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a valid 10-digit phone number';
        // Add the error message after the phone-input-container
        const phoneInputContainer = document.querySelector('.phone-input-container');
        if (phoneInputContainer) {
          phoneInputContainer.insertAdjacentElement('afterend', errorMessage);
        } else {
          phoneInput.parentNode.appendChild(errorMessage);
        }
      }
    }
  }

  // Update checkout button state
  validateAllFields();
}

/**
 * Validate pin code
 * Shows success icon only when exactly 6 digits are entered
 * Does not show error message while user is typing
 */
function validatePinCode() {
  const zipCodeInput = document.getElementById('zipCode');
  const successIcon = document.querySelector('.pin-success');

  if (!zipCodeInput) return;

  const zipCodeValue = zipCodeInput.value.trim();

  // Check if pin code is exactly 6 digits
  if (zipCodeValue.length === 6 && /^\d{6}$/.test(zipCodeValue)) {
    // Remove error styling if present
    zipCodeInput.classList.remove('error');

    // Show success icon
    if (successIcon) {
      successIcon.style.display = 'block';
    }

    // Remove error message if it exists
    const errorMessage = zipCodeInput.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.remove();
    }
  } else {
    // Hide success icon
    if (successIcon) {
      successIcon.style.display = 'none';
    }

    // Don't show error while typing - only remove success styling
    // We're not adding error class or error message here
  }

  // Update checkout button state
  validateAllFields();
}

/**
 * Validate all required fields and enable/disable checkout button
 */
function validateAllFields() {
  const requiredInputs = document.querySelectorAll('input[required]');
  const checkoutBtn = document.getElementById('checkout-btn');
  const termsCheckbox = document.getElementById('terms-checkbox');

  if (!checkoutBtn) return;

  let allValid = true;

  // Check each required input
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      allValid = false;
    }

    // Special validation for phone
    if (input.id === 'phone' && input.value.trim().length !== 10) {
      allValid = false;
    }

    // Special validation for pin code
    if (input.id === 'zipCode' && input.value.trim().length !== 6) {
      allValid = false;
    }
  });

  // Check terms checkbox
  if (termsCheckbox && !termsCheckbox.checked) {
    allValid = false;
  }

  // Enable/disable checkout button
  if (allValid) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';
    checkoutBtn.style.cursor = 'pointer';
  } else {
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
    checkoutBtn.style.cursor = 'not-allowed';
  }

  // Check if contact and delivery steps are completed
  checkPaymentStepAvailability();
}

/**
 * Check if contact and delivery steps are completed and enable/disable payment step
 */
function checkPaymentStepAvailability() {
  const contactStep = document.getElementById('contact-step');
  const deliveryStep = document.getElementById('delivery-step');
  const paymentStep = document.getElementById('payment-step');

  if (!contactStep || !deliveryStep || !paymentStep) return;

  // Check if all required fields in contact step are filled
  const contactFields = contactStep.querySelectorAll('input[required]');
  let contactComplete = true;

  contactFields.forEach(field => {
    if (!field.value.trim()) {
      contactComplete = false;
    }

    // Special check for phone number
    if (field.id === 'phone' && field.value.trim().length !== 10) {
      contactComplete = false;
    }
  });

  // Check if delivery method is selected
  const deliveryMethodSelected = deliveryStep.querySelector('input[name="deliveryMethod"]:checked');
  const deliveryComplete = !!deliveryMethodSelected;

  // Check if delivery address fields are filled (if delivery is selected)
  if (deliveryMethodSelected && deliveryMethodSelected.value === 'delivery') {
    const addressFields = deliveryStep.querySelectorAll('.delivery-address input[required]');
    addressFields.forEach(field => {
      if (!field.value.trim()) {
        deliveryComplete = false;
      }

      // Special check for pin code
      if (field.id === 'zipCode' && field.value.trim().length !== 6) {
        deliveryComplete = false;
      }
    });
  }

  // Enable/disable payment step based on completion of previous steps
  if (contactComplete && deliveryComplete) {
    paymentStep.classList.remove('disabled');
    const paymentStepContent = paymentStep.querySelector('.step-content');
    if (paymentStepContent) {
      paymentStepContent.style.display = 'block';
    }
  } else {
    paymentStep.classList.add('disabled');
    const paymentStepContent = paymentStep.querySelector('.step-content');
    if (paymentStepContent) {
      paymentStepContent.style.display = 'none';
    }
  }
}

/**
 * Validate form
 * @returns {boolean} - Whether form is valid
 */
function validateForm() {
  // Get active step
  const activeStep = document.querySelector('.checkout-step.active');
  if (!activeStep) return false;

  // Get all required inputs in the active step
  const requiredInputs = activeStep.querySelectorAll('input[required]');
  let isValid = true;

  // Check each required input
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      // Mark as invalid
      input.classList.add('error');
      isValid = false;

      // Add error message if it doesn't exist
      let errorMessage = input.nextElementSibling;
      if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'This field is required';
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
      }
    } else {
      // Remove error styling
      input.classList.remove('error');

      // Remove error message if it exists
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
      }
    }
  });

  // Validate phone number
  const phoneInput = document.getElementById('phone');
  if (phoneInput && phoneInput.value.trim()) {
    // Must be exactly 10 digits
    if (phoneInput.value.trim().length !== 10 || !/^\d{10}$/.test(phoneInput.value.trim())) {
      isValid = false;
      phoneInput.classList.add('error');
      const phoneGroup = document.querySelector('.phone-group');
      if (phoneGroup) {
        phoneGroup.classList.add('error');
      }

      // Add error message if it doesn't exist
      let errorMessage = document.querySelector('.phone-group .error-message');
      if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a valid 10-digit phone number';
        // Add the error message after the phone-input-container
        const phoneInputContainer = document.querySelector('.phone-input-container');
        if (phoneInputContainer) {
          phoneInputContainer.insertAdjacentElement('afterend', errorMessage);
        } else {
          phoneInput.parentNode.appendChild(errorMessage);
        }
      }
    }
  }

  // Validate pin code
  const zipCodeInput = document.getElementById('zipCode');
  if (zipCodeInput && zipCodeInput.value.trim()) {
    // Must be exactly 6 digits
    if (zipCodeInput.value.trim().length !== 6 || !/^\d{6}$/.test(zipCodeInput.value.trim())) {
      isValid = false;
      zipCodeInput.classList.add('error');

      // Add error message if it doesn't exist
      let errorMessage = zipCodeInput.nextElementSibling;
      if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a valid 6-digit pin code';
        zipCodeInput.parentNode.insertBefore(errorMessage, zipCodeInput.nextSibling);
      }
    }
  }

  return isValid;
}

/**
 * Process order
 */
function processOrder() {
  // Get cart items
  const cart = getCart();

  // Get country code
  const countryCodeSelect = document.getElementById('country-code-select');
  const countryCode = countryCodeSelect ? countryCodeSelect.value : '+91';

  // Get phone number with country code
  const phoneInput = document.getElementById('phone');
  const phoneNumber = phoneInput ? `${countryCode} ${phoneInput.value}` : '';

  // Get payment method
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'mastercard';

  // Get payment details based on payment method
  let paymentDetails = {};

  switch (paymentMethod) {
    case 'mastercard':
    case 'visa':
      paymentDetails = {
        cardType: paymentMethod,
        cardNumber: document.getElementById('cardNumber')?.value || '',
        cardName: document.getElementById('cardName')?.value || '',
        expiryDate: document.getElementById('expiryDate')?.value || '',
        cvv: document.getElementById('cvv')?.value || ''
      };
      break;
    case 'upi':
      paymentDetails = {
        upiId: document.getElementById('upiId')?.value || '',
        upiApp: document.querySelector('input[name="upiApp"]:checked')?.value || 'gpay'
      };
      break;
    case 'cod':
      paymentDetails = {
        cashOnDelivery: true
      };
      break;
  }

  // Create order object
  const order = {
    items: cart,
    contactInfo: {
      firstName: document.getElementById('firstName')?.value || '',
      lastName: document.getElementById('lastName')?.value || '',
      phone: phoneNumber,
      email: document.getElementById('email')?.value || ''
    },
    deliveryMethod: document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'delivery',
    deliveryAddress: {
      country: document.getElementById('country')?.value || 'India',
      city: document.getElementById('city')?.value || '',
      address: document.getElementById('address')?.value || '',
      zipCode: document.getElementById('zipCode')?.value || ''
    },
    paymentMethod: paymentMethod,
    paymentDetails: paymentDetails,
    orderDate: new Date().toISOString(),
    orderTotal: cart.reduce((total, item) => total + (item.currentPrice * item.quantity), 0),
    orderStatus: 'Placed'
  };

  console.log('Order placed:', order);

  // Handle different payment methods
  if (paymentMethod === 'upi') {
    // For UPI, we'll handle the payment separately through the UPI payment button
    // Just show a notification to use the UPI payment button
    showNotification('Please use the UPI payment button to complete your payment.', 'info');

    // Scroll to the UPI payment section
    const upiPaymentAction = document.getElementById('upiPaymentAction');
    if (upiPaymentAction) {
      upiPaymentAction.scrollIntoView({ behavior: 'smooth' });
    }

    // Save order to localStorage for later processing
    localStorage.setItem('stepstyle-pending-order', JSON.stringify(order));

    return; // Don't proceed with order completion yet
  } else if (paymentMethod === 'mastercard' || paymentMethod === 'visa') {
    // For card payments, we'll handle the payment through Razorpay
    // The checkout button will trigger the Razorpay payment flow
    showNotification('Processing your payment...', 'info');

    // Save order to localStorage for later processing
    localStorage.setItem('stepstyle-pending-order', JSON.stringify(order));

    return; // Don't proceed with order completion yet
  }

  // Show success notification based on payment method
  let successMessage = 'Order placed successfully! Your items will be delivered soon.';

  if (paymentMethod === 'cod') {
    successMessage = 'Order placed successfully! Your items will be delivered soon with Cash on Delivery option.';
  } else {
    successMessage = 'Order placed successfully! Your payment has been processed and items will be delivered soon.';
  }

  showNotification(successMessage, 'success');

  // Clear cart
  localStorage.removeItem('stepstyle-cart');

  // Redirect to confirmation page (or home page for now)
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 2000);
}

/**
 * Show the appropriate payment form based on the selected payment method
 * @param {string} paymentMethod - The selected payment method
 */
function showPaymentForm(paymentMethod) {
  // Hide all payment forms
  const paymentForms = document.querySelectorAll('.payment-form');
  paymentForms.forEach(form => {
    form.style.display = 'none';
  });

  // Show the selected payment form
  switch (paymentMethod) {
    case 'mastercard':
    case 'visa':
      document.querySelector('.card-payment').style.display = 'block';
      break;
    case 'upi':
      document.querySelector('.upi-payment').style.display = 'block';
      break;
    case 'cod':
      document.querySelector('.cod-payment').style.display = 'block';
      break;
    default:
      document.querySelector('.card-payment').style.display = 'block';
  }
}

/**
 * Initialize Razorpay
 */
function initializeRazorpay() {
  // Get checkout button
  const checkoutButton = document.getElementById('checkout-btn');
  if (!checkoutButton) return;

  // Add event listener to checkout button
  checkoutButton.addEventListener('click', async function() {
    // Show processing notification
    showNotification('Processing your payment request...', 'info');

    // Disable button to prevent multiple submissions
    checkoutButton.disabled = true;
    checkoutButton.style.opacity = '0.5';
    checkoutButton.style.cursor = 'not-allowed';

    // Get cart items
    const cart = getCart();

    // Get customer information
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const customerName = `${firstName} ${lastName}`.trim();
    const customerEmail = document.getElementById('email')?.value || '';
    const customerPhone = document.getElementById('phone')?.value || '';

    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'card';

    try {
      // Create Razorpay order on the server
      const response = await fetch('http://localhost:4242/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerInfo: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
          }
        }),
      });

      const orderData = await response.json();

      if (!orderData.order_id) {
        throw new Error('Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.key_id, // Enter the Key ID generated from the Razorpay Dashboard
        amount: orderData.amount, // Amount is in currency subunits (paise)
        currency: orderData.currency,
        name: "StepStyle",
        description: orderData.description,
        image: "../assets/images/logo.png",
        order_id: orderData.order_id,
        handler: function (response) {
          // This function is called when payment is successful
          verifyPayment(response);
        },
        prefill: {
          name: orderData.prefill.name,
          email: orderData.prefill.email,
          contact: orderData.prefill.contact
        },
        notes: orderData.notes,
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            // Reset button when modal is closed
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = '1';
            checkoutButton.style.cursor = 'pointer';
            showNotification('Payment cancelled', 'info');
          }
        }
      };

      // Create Razorpay instance and open payment modal
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        showNotification(`Payment failed: ${response.error.description}`, 'error');

        // Reset button
        checkoutButton.disabled = false;
        checkoutButton.style.opacity = '1';
        checkoutButton.style.cursor = 'pointer';
      });

      // Open Razorpay payment modal
      razorpayInstance.open();

    } catch (error) {
      console.error('Error:', error);

      // Show error notification
      showNotification(`Error: ${error.message}. Please try again.`, 'error');

      // Reset button
      checkoutButton.disabled = false;
      checkoutButton.style.opacity = '1';
      checkoutButton.style.cursor = 'pointer';
    }
  });
}

/**
 * Verify Razorpay payment with the server
 * @param {Object} paymentResponse - The payment response from Razorpay
 */
async function verifyPayment(paymentResponse) {
  try {
    // Show processing notification
    showNotification('Verifying your payment...', 'info');

    // Verify payment with server
    const response = await fetch('http://localhost:4242/verify-razorpay-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentResponse),
    });

    const data = await response.json();

    if (data.success) {
      // Payment verified successfully
      showNotification('Payment successful! Your order has been placed.', 'success');

      // Clear cart
      localStorage.removeItem('stepstyle-cart');

      // Redirect to success page after a short delay
      setTimeout(() => {
        window.location.href = '/success.html?orderId=' + data.orderId;
      }, 2000);
    } else {
      // Payment verification failed
      showNotification('Payment verification failed. Please contact support.', 'error');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    showNotification('Error verifying payment. Please contact support.', 'error');
  }
}

// These functions have been replaced with server-side Stripe integration

/**
 * Generate order data for UPI payment
 * @returns {Object} - Order data for UPI payment
 */
function generateOrderData() {
  // Get cart items
  const cart = JSON.parse(localStorage.getItem('stepstyle-cart')) || [];

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + (item.currentPrice * (item.quantity || 1)), 0);

  // Generate a unique order ID
  const orderId = 'ORDER' + Date.now();

  // Get customer name
  const firstName = document.getElementById('firstName')?.value || '';
  const lastName = document.getElementById('lastName')?.value || '';
  const customerName = `${firstName} ${lastName}`.trim();

  // Get customer email and phone
  const customerEmail = document.getElementById('email')?.value || '';
  const customerPhone = document.getElementById('phone')?.value || '';

  return {
    orderId: orderId,
    amount: totalAmount,
    currency: 'INR',
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    description: `Payment for order ${orderId}`,
    timestamp: new Date().toISOString(),
    items: cart
  };
}

/**
 * Launch UPI payment using the selected app
 * @param {string} appName - The UPI app to use (gpay, phonepe, paytm)
 * @param {string} upiId - The UPI ID to send payment to
 * @param {Object} orderData - The order data for payment
 */
async function launchUpiPayment(appName, upiId, orderData) {
  try {
    // Show processing notification
    showNotification('Processing UPI payment request...', 'info');

    // Get customer information
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const customerName = `${firstName} ${lastName}`.trim();
    const customerEmail = document.getElementById('email')?.value || '';
    const customerPhone = document.getElementById('phone')?.value || '';

    // Create UPI payment on the server
    const response = await fetch('http://localhost:4242/create-upi-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: orderData.items || getCart(),
        upiId: upiId,
        upiApp: appName,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone
      }),
    });

    const paymentData = await response.json();

    if (!paymentData.success) {
      throw new Error(paymentData.error || 'Failed to create UPI payment');
    }

    console.log('UPI Payment created:', paymentData);

    // Save payment ID to localStorage for verification
    localStorage.setItem('stepstyle-upi-payment', JSON.stringify({
      paymentId: paymentData.paymentId,
      amount: paymentData.amount,
      timestamp: new Date().toISOString()
    }));

    // Open the UPI payment URL in a new window/tab
    window.open(paymentData.upiPaymentUrl, '_blank');

    // Show notification
    showNotification(`Payment request sent to ${appName}. Please complete the payment in the app.`, 'info');

    // After a short delay, redirect to the UPI status page
    setTimeout(() => {
      window.location.href = `/upi-status.html?paymentId=${paymentData.paymentId}`;
    }, 3000);
  } catch (error) {
    console.error('Error launching UPI payment:', error);
    showNotification(`Error: ${error.message}. Please try again.`, 'error');
  }
}

/**
 * Create UPI payment URL for the selected app (client-side fallback)
 * @param {string} appName - The UPI app to use (gpay, phonepe, paytm)
 * @param {string} upiId - The UPI ID to send payment to
 * @param {Object} orderData - The order data for payment
 * @returns {string} - The UPI payment URL
 */
function createUpiPaymentUrl(appName, upiId, orderData) {
  // Base UPI URL
  let baseUrl = '';

  // Create UPI URL based on app
  switch (appName) {
    case 'gpay':
      // Google Pay UPI URL
      baseUrl = 'upi://pay';
      break;
    case 'phonepe':
      // PhonePe UPI URL
      baseUrl = 'phonepe://pay';
      break;
    case 'paytm':
      // Paytm UPI URL
      baseUrl = 'paytmmp://pay';
      break;
    default:
      // Default UPI URL
      baseUrl = 'upi://pay';
  }

  // Create UPI parameters
  const params = new URLSearchParams({
    pa: upiId, // Payee address (UPI ID)
    pn: 'StepStyle', // Payee name
    mc: '5411', // Merchant category code for footwear
    tr: orderData.orderId, // Transaction reference ID
    am: orderData.amount, // Amount
    cu: orderData.currency, // Currency
    tn: `Payment for order ${orderData.orderId}` // Transaction note
  });

  // Return complete UPI URL
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error)
 */
function showNotification(message, type = 'success') {
  const notification = document.querySelector('.toast-notification');
  if (!notification) {
    showToast(message, type);
    return;
  }

  const messageElement = notification.querySelector('.toast-message');

  // Set message and type
  messageElement.textContent = message;
  notification.className = 'toast-notification ' + type;

  // Show notification
  notification.classList.add('show');

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
