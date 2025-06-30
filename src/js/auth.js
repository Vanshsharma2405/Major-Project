/**
 * Authentication JavaScript
 * Handles login, signup, forgot password, and Google OAuth functionality
 */

// API Configuration
const API_BASE_URL = 'http://localhost:4000/api';

// Authentication state
let isAuthenticated = false;
let currentUser = null;

// DOM Elements
let loginForm, signupForm, forgotPasswordForm;
let loadingOverlay, notificationContainer;

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
    setupEventListeners();
    checkAuthStatus();

});

/**
 * Initialize authentication elements
 */
function initializeAuth() {
    // Get form elements
    loginForm = document.getElementById('loginForm');
    signupForm = document.getElementById('signupForm');
    forgotPasswordForm = document.getElementById('forgotPasswordForm');
    loadingOverlay = document.getElementById('loadingOverlay');
    notificationContainer = document.getElementById('notificationContainer');

    console.log('Authentication system initialized');
}

/**
 * Setup event listeners for forms
 */
function setupEventListeners() {
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Forgot password form
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }


}

/**
 * Check if user is already authenticated
 */
function checkAuthStatus() {
    const token = localStorage.getItem('stepstyle-token');
    const user = localStorage.getItem('stepstyle-user');

    if (token && user) {
        try {
            currentUser = JSON.parse(user);
            isAuthenticated = true;
            
            // Check if we should redirect to a specific page
            const redirectUrl = localStorage.getItem('stepstyle-redirect-url');
            if (redirectUrl) {
                localStorage.removeItem('stepstyle-redirect-url');
                window.location.href = redirectUrl;
            } else {
                // Redirect to home page
                window.location.href = '../index.html';
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            clearAuthData();
        }
    }
}

/**
 * Handle login form submission
 */
async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate form
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        showLoading(true);

        console.log('🧪 Attempting login with:', { email, password });
        console.log('🌐 API URL:', `${API_BASE_URL}/user/login`);

        // Try to connect to backend first
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('📡 Response status:', response.status);
            console.log('📡 Response ok:', response.ok);

            const data = await response.json();
            console.log('📝 Response data:', data);

            if (data.success) {
                // Store authentication data
                localStorage.setItem('stepstyle-token', data.token);
                localStorage.setItem('stepstyle-user', JSON.stringify(data.user));

                if (rememberMe) {
                    localStorage.setItem('stepstyle-remember', 'true');
                }

                showNotification('Login successful! Redirecting...', 'success');

                // Redirect after short delay
                setTimeout(() => {
                    const redirectUrl = localStorage.getItem('stepstyle-redirect-url');
                    if (redirectUrl) {
                        localStorage.removeItem('stepstyle-redirect-url');
                        window.location.href = redirectUrl;
                    } else {
                        window.location.href = '../index.html';
                    }
                }, 1500);

            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (networkError) {
            console.warn('Backend not available, using local authentication');

            // Simple local authentication with predefined users + registered users
            const predefinedUsers = [
                { email: 'admin@stepstyle.com', password: 'admin123', name: 'Admin User' },
                { email: 'user@stepstyle.com', password: 'user123', name: 'Demo User' },
                { email: 'test@gmail.com', password: 'test123', name: 'Test User' }
            ];

            // Get locally registered users
            const localUsers = JSON.parse(localStorage.getItem('stepstyle-local-users') || '[]');

            // Combine both lists
            const allValidUsers = [...predefinedUsers, ...localUsers];

            // Check if credentials match any valid user
            const validUser = allValidUsers.find(user =>
                user.email === email && user.password === password
            );

            if (validUser) {
                // Create user data
                const mockUser = {
                    id: 'local-user-' + Date.now(),
                    name: validUser.name,
                    email: validUser.email,
                    avatar: null
                };

                const mockToken = 'local-token-' + Date.now();

                // Store authentication data
                localStorage.setItem('stepstyle-token', mockToken);
                localStorage.setItem('stepstyle-user', JSON.stringify(mockUser));

                if (rememberMe) {
                    localStorage.setItem('stepstyle-remember', 'true');
                }

                showNotification('Login successful! (Local Mode) Redirecting...', 'success');

                // Redirect after short delay
                setTimeout(() => {
                    const redirectUrl = localStorage.getItem('stepstyle-redirect-url');
                    if (redirectUrl) {
                        localStorage.removeItem('stepstyle-redirect-url');
                        window.location.href = redirectUrl;
                    } else {
                        window.location.href = '../index.html';
                    }
                }, 1500);
            } else {
                showNotification('Invalid email or password. Try: admin@stepstyle.com / admin123', 'error');
            }
        }

    } catch (error) {
        console.error('Login error:', error);
        showNotification('An unexpected error occurred. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Handle signup form submission
 */
async function handleSignup(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }

    if (!agreeTerms) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        return;
    }

    try {
        showLoading(true);

        console.log('🧪 Attempting signup with:', { name, email, password });
        console.log('🌐 API URL:', `${API_BASE_URL}/user/register`);

        // Try to connect to backend first
        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            console.log('📡 Response status:', response.status);
            console.log('📡 Response ok:', response.ok);

            const data = await response.json();
            console.log('📝 Response data:', data);

            if (data.success) {
                // Store authentication data
                localStorage.setItem('stepstyle-token', data.token);
                localStorage.setItem('stepstyle-user', JSON.stringify(data.user));

                showNotification('Account created successfully! Redirecting...', 'success');

                // Redirect to home page after short delay
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);

            } else {
                showNotification(data.message || 'Registration failed', 'error');
            }
        } catch (networkError) {
            console.warn('Backend not available, using local registration');

            // Check if email already exists in localStorage
            const existingUsers = JSON.parse(localStorage.getItem('stepstyle-local-users') || '[]');
            const emailExists = existingUsers.some(user => user.email === email);

            if (emailExists) {
                showNotification('Email already exists. Please use a different email.', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: 'local-user-' + Date.now(),
                name: name,
                email: email,
                password: password, // In real app, this should be hashed
                avatar: null,
                createdAt: new Date().toISOString()
            };

            // Add to local users list
            existingUsers.push(newUser);
            localStorage.setItem('stepstyle-local-users', JSON.stringify(existingUsers));

            const mockToken = 'local-token-' + Date.now();

            // Store authentication data
            localStorage.setItem('stepstyle-token', mockToken);
            localStorage.setItem('stepstyle-user', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
            }));

            showNotification('Account created successfully! (Local Mode) Redirecting...', 'success');

            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }

    } catch (error) {
        console.error('Signup error:', error);
        showNotification('An unexpected error occurred. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Handle forgot password form submission
 */
async function handleForgotPassword(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');

    // Validate email
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    try {
        showLoading(true);

        // Try to connect to backend first
        try {
            const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                showNotification(data.message, 'success');
                // Switch back to login form
                setTimeout(() => {
                    switchToLogin();
                }, 2000);
            } else {
                showNotification(data.message || 'Failed to send reset email', 'error');
            }
        } catch (networkError) {
            console.warn('Backend not available, using mock response');

            // Mock response for demo purposes
            showNotification('Password reset email sent! (Demo Mode) Please check your inbox.', 'success');

            // Switch back to login form
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        }

    } catch (error) {
        console.error('Forgot password error:', error);
        showNotification('An unexpected error occurred. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}



/**
 * Clear authentication data
 */
function clearAuthData() {
    localStorage.removeItem('stepstyle-token');
    localStorage.removeItem('stepstyle-user');
    localStorage.removeItem('stepstyle-remember');
    isAuthenticated = false;
    currentUser = null;
}

/**
 * Show/hide loading overlay
 */
function showLoading(show) {
    if (loadingOverlay) {
        if (show) {
            loadingOverlay.classList.add('active');
        } else {
            loadingOverlay.classList.remove('active');
        }
    }
}

// showNotification function is defined in auth-ui.js

// Export functions for use in other files
window.authFunctions = {
    checkAuthStatus,
    clearAuthData,
    isAuthenticated: () => isAuthenticated,
    getCurrentUser: () => currentUser
};
