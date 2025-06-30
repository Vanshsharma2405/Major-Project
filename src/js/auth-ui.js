/**
 * Authentication UI Management
 * Handles form switching, notifications, and UI interactions
 */

// Form switching functions
function switchToLogin() {
    hideAllForms();
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.classList.add('active');
        updateFormHeader('login');
    }
}

function switchToSignup() {
    hideAllForms();
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.classList.add('active');
        updateFormHeader('signup');
    }
}

function showForgotPassword() {
    hideAllForms();
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.classList.add('active');
        updateFormHeader('forgot');
    }
}

function hideAllForms() {
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.classList.remove('active');
    });
}

/**
 * Toggle password visibility
 */
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ph ph-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'ph ph-eye';
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info', title = null, duration = 5000) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Set icon based on type
    let iconClass = 'ph ph-info';
    switch (type) {
        case 'success':
            iconClass = 'ph ph-check-circle';
            break;
        case 'error':
            iconClass = 'ph ph-x-circle';
            break;
        case 'warning':
            iconClass = 'ph ph-warning';
            break;
        case 'info':
        default:
            iconClass = 'ph ph-info';
            break;
    }

    // Build notification HTML
    notification.innerHTML = `
        <i class="${iconClass} notification-icon"></i>
        <div class="notification-content">
            ${title ? `<div class="notification-title">${title}</div>` : ''}
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="ph ph-x"></i>
        </button>
        <div class="notification-progress"></div>
    `;

    // Add to container
    container.appendChild(notification);

    // Auto-remove after duration
    setTimeout(() => {
        removeNotification(notification);
    }, duration);

    // Add click to close
    notification.addEventListener('click', (e) => {
        if (e.target.closest('.notification-close')) {
            removeNotification(notification);
        }
    });
}

/**
 * Close notification
 */
function closeNotification(button) {
    const notification = button.closest('.notification');
    removeNotification(notification);
}

/**
 * Remove notification with animation
 */
function removeNotification(notification) {
    if (notification && notification.parentElement) {
        notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
    };
}

/**
 * Show password strength indicator
 */
function showPasswordStrength(password, targetElement) {
    const validation = validatePassword(password);
    const strength = calculatePasswordStrength(validation);
    
    if (!targetElement) return;

    targetElement.innerHTML = `
        <div class="password-strength">
            <div class="strength-bar">
                <div class="strength-fill ${strength.class}" style="width: ${strength.percentage}%"></div>
            </div>
            <div class="strength-text">${strength.text}</div>
            <div class="strength-requirements">
                <div class="${validation.minLength ? 'valid' : 'invalid'}">
                    <i class="ph ${validation.minLength ? 'ph-check' : 'ph-x'}"></i>
                    At least 8 characters
                </div>
                <div class="${validation.hasUpperCase ? 'valid' : 'invalid'}">
                    <i class="ph ${validation.hasUpperCase ? 'ph-check' : 'ph-x'}"></i>
                    Uppercase letter
                </div>
                <div class="${validation.hasLowerCase ? 'valid' : 'invalid'}">
                    <i class="ph ${validation.hasLowerCase ? 'ph-check' : 'ph-x'}"></i>
                    Lowercase letter
                </div>
                <div class="${validation.hasNumbers ? 'valid' : 'invalid'}">
                    <i class="ph ${validation.hasNumbers ? 'ph-check' : 'ph-x'}"></i>
                    Number
                </div>
            </div>
        </div>
    `;
}

/**
 * Calculate password strength
 */
function calculatePasswordStrength(validation) {
    let score = 0;
    if (validation.minLength) score += 25;
    if (validation.hasUpperCase) score += 25;
    if (validation.hasLowerCase) score += 25;
    if (validation.hasNumbers) score += 25;

    if (score < 50) {
        return { percentage: score, class: 'weak', text: 'Weak' };
    } else if (score < 75) {
        return { percentage: score, class: 'medium', text: 'Medium' };
    } else if (score < 100) {
        return { percentage: score, class: 'strong', text: 'Strong' };
    } else {
        return { percentage: score, class: 'very-strong', text: 'Very Strong' };
    }
}

/**
 * Add real-time form validation
 */
function addFormValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const isValid = validateEmail(this.value);
            this.classList.toggle('invalid', !isValid && this.value !== '');
            
            if (!isValid && this.value !== '') {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearFieldError(this);
            }
        });
    });

    // Password validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id === 'signupPassword') {
            input.addEventListener('input', function() {
                const strengthIndicator = document.getElementById('passwordStrength');
                if (strengthIndicator) {
                    showPasswordStrength(this.value, strengthIndicator);
                }
            });
        }

        // Confirm password validation
        if (input.id === 'confirmPassword') {
            input.addEventListener('blur', function() {
                const password = document.getElementById('signupPassword').value;
                const isMatch = this.value === password;
                this.classList.toggle('invalid', !isMatch && this.value !== '');
                
                if (!isMatch && this.value !== '') {
                    showFieldError(this, 'Passwords do not match');
                } else {
                    clearFieldError(this);
                }
            });
        }
    });
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentElement.appendChild(errorElement);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Initialize shoe animation
 */
function initShoeAnimation() {
    const shoe = document.getElementById('animatedShoe');
    if (shoe) {
        // The CSS animation handles the floating effect
        // Just add hover effects that work with the CSS animation
        shoe.addEventListener('mouseenter', () => {
            shoe.style.animationPlayState = 'paused';
            shoe.style.transform = 'rotate(-10deg) scale(1.05)';
        });

        shoe.addEventListener('mouseleave', () => {
            shoe.style.animationPlayState = 'running';
            shoe.style.transform = '';
        });
    }
}

/**
 * Update form header based on current form
 */
function updateFormHeader(formType) {
    const formHeader = document.querySelector('.form-header');
    if (formHeader) {
        const h2 = formHeader.querySelector('h2');
        const p = formHeader.querySelector('p');

        switch(formType) {
            case 'login':
                h2.textContent = 'Welcome Back';
                p.textContent = 'Sign in to continue your shopping experience';
                break;
            case 'signup':
                h2.textContent = 'Create Account';
                p.textContent = 'Join StepStyle and start your fashion journey';
                break;
            case 'forgot':
                h2.textContent = 'Reset Password';
                p.textContent = 'Enter your email to receive reset instructions';
                break;
        }
    }
}

/**
 * Initialize UI enhancements
 */
function initializeUI() {
    addFormValidation();
    initShoeAnimation();

    // Add smooth transitions
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.style.transition = 'all 0.3s ease-in-out';
    });

    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();

    // Check URL parameters for mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'signup') {
        switchToSignup();
    } else {
        switchToLogin();
    }
});

// Make functions globally available
window.switchToLogin = switchToLogin;
window.switchToSignup = switchToSignup;
window.showForgotPassword = showForgotPassword;
window.togglePassword = togglePassword;
window.showNotification = showNotification;
window.closeNotification = closeNotification;
