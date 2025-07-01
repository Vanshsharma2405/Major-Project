/**
 * Authentication Check for All Pages
 * Handles authentication state, user interface updates, and navigation protection
 */

// Authentication state
let isAuthenticated = false;
let currentUser = null;

// Initialize authentication check when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all elements are loaded
    setTimeout(() => {
        checkAuthenticationStatus();
        setupAuthEventListeners();
        setupNavigationProtection();
    }, 100);
});

// Test function to manually trigger login state (for debugging)
window.testLogin = function() {
    localStorage.setItem('stepstyle-token', 'test-token');
    localStorage.setItem('stepstyle-user', JSON.stringify({
        name: 'Test User',
        email: 'test@example.com'
    }));
    checkAuthenticationStatus();
};

// Test function to manually trigger logout state (for debugging)
window.testLogout = function() {
    localStorage.removeItem('stepstyle-token');
    localStorage.removeItem('stepstyle-user');
    checkAuthenticationStatus();
};

/**
 * Check if user is authenticated and update UI accordingly
 */
function checkAuthenticationStatus() {
    const token = localStorage.getItem('stepstyle-token');
    const user = localStorage.getItem('stepstyle-user');
    const navLast = document.getElementById('nav-last');

    // Set initial class based on auth state
    if (navLast) {
        navLast.classList.remove('user-logged-in', 'user-logged-out');
    }

    if (token && user) {
        try {
            currentUser = JSON.parse(user);
            isAuthenticated = true;
            updateUIForAuthenticatedUser();
        } catch (error) {
            console.error('Error parsing user data:', error);
            clearAuthenticationData();
            updateUIForUnauthenticatedUser();
        }
    } else {
        updateUIForUnauthenticatedUser();
    }
}

/**
 * Update UI for authenticated user
 */
function updateUIForAuthenticatedUser() {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const navLast = document.getElementById('nav-last');

    // Hide auth buttons
    if (authButtons) {
        authButtons.style.display = 'none';
        authButtons.style.visibility = 'hidden';
    }

    // Show user profile
    if (userProfile && currentUser) {
        userProfile.style.display = 'block';
        userProfile.style.visibility = 'visible';

        const userName = userProfile.querySelector('.user-name');
        const userEmail = userProfile.querySelector('.user-email');

        if (userName) userName.textContent = currentUser.name;
        if (userEmail) userEmail.textContent = currentUser.email;

        // Load profile picture if available
        if (window.profilePictureManager) {
            window.profilePictureManager.loadUserProfilePicture();
        }
    }

    // Update nav-last class for search bar width adjustment
    if (navLast) {
        navLast.classList.remove('user-logged-out');
        navLast.classList.add('user-logged-in');
    }
}

/**
 * Update UI for unauthenticated user
 */
function updateUIForUnauthenticatedUser() {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const navLast = document.getElementById('nav-last');

    // Show auth buttons
    if (authButtons) {
        authButtons.style.display = 'flex';
        authButtons.style.visibility = 'visible';
        authButtons.style.gap = '0.5rem';
        authButtons.style.alignItems = 'center';
        authButtons.style.marginLeft = '1rem';

        // Ensure buttons have proper width and styling
        const loginBtn = authButtons.querySelector('.login-btn');
        const signupBtn = authButtons.querySelector('.signup-btn');

        if (loginBtn) {
            loginBtn.style.padding = '8px 16px';
            loginBtn.style.borderRadius = '6px';
            loginBtn.style.fontSize = '0.9rem';
            loginBtn.style.fontWeight = '500';
            loginBtn.style.whiteSpace = 'nowrap';
            loginBtn.style.minWidth = 'auto';
            loginBtn.style.width = 'auto';
            loginBtn.style.flexShrink = '0';
        }

        if (signupBtn) {
            signupBtn.style.padding = '8px 16px';
            signupBtn.style.borderRadius = '6px';
            signupBtn.style.fontSize = '0.9rem';
            signupBtn.style.fontWeight = '500';
            signupBtn.style.whiteSpace = 'nowrap';
            signupBtn.style.minWidth = 'auto';
            signupBtn.style.width = 'auto';
            signupBtn.style.flexShrink = '0';
        }
    }

    // Hide user profile
    if (userProfile) {
        userProfile.style.display = 'none';
        userProfile.style.visibility = 'hidden';
    }

    // Update nav-last class for search bar width adjustment
    if (navLast) {
        navLast.classList.remove('user-logged-in');
        navLast.classList.add('user-logged-out');
    }
}

/**
 * Setup event listeners for authentication elements
 */
function setupAuthEventListeners() {
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // User avatar dropdown toggle
    const userAvatar = document.querySelector('.user-avatar');
    const userDropdown = document.querySelector('.user-dropdown');

    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
            console.log('🔄 User dropdown toggled:', userDropdown.classList.contains('active'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target) && !userAvatar.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Auth buttons - redirect to login with current page info
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToLogin();
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToLogin('signup');
        });
    }
}

/**
 * Setup navigation protection for authenticated pages
 */
function setupNavigationProtection() {
    // Get all navigation links that require authentication
    const protectedLinks = document.querySelectorAll('a[href*="/Pages/"]');
    
    protectedLinks.forEach(link => {
        // Skip if it's the login page or about page
        if (link.href.includes('login.html') || link.href.includes('about.html')) {
            return;
        }

        link.addEventListener('click', (e) => {
            if (!isAuthenticated) {
                e.preventDefault();
                
                // Store the intended destination
                localStorage.setItem('stepstyle-redirect-url', link.href);
                
                // Show notification and redirect to login
                showAuthNotification('Please sign in to access this page');
                setTimeout(() => {
                    redirectToLogin();
                }, 1500);
            }
        });
    });
}

/**
 * Handle user logout
 */
function handleLogout() {
    // Clear authentication data
    clearAuthenticationData();
    
    // Update UI
    updateUIForUnauthenticatedUser();
    
    // Show notification
    showAuthNotification('You have been logged out successfully', 'success');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = './index.html';
    }, 1500);
}

/**
 * Clear authentication data
 */
function clearAuthenticationData() {
    localStorage.removeItem('stepstyle-token');
    localStorage.removeItem('stepstyle-user');
    localStorage.removeItem('stepstyle-remember');
    isAuthenticated = false;
    currentUser = null;
}

/**
 * Redirect to login page
 */
function redirectToLogin(mode = 'login') {
    const currentPage = window.location.href;
    
    // Store current page for redirect after login (if not already on home page)
    if (!currentPage.includes('index.html') && !currentPage.endsWith('/')) {
        localStorage.setItem('stepstyle-redirect-url', currentPage);
    }
    
    // Redirect to login page
    const loginUrl = './Pages/login.html';
    if (mode === 'signup') {
        window.location.href = loginUrl + '?mode=signup';
    } else {
        window.location.href = loginUrl;
    }
}

/**
 * Show authentication notification
 */
function showAuthNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ph ${type === 'success' ? 'ph-check-circle' : 'ph-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Helvetica Now Display', sans-serif;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Check if user is authenticated (for external use)
 */
function checkAuth() {
    return isAuthenticated;
}

/**
 * Get current user (for external use)
 */
function getCurrentUser() {
    return currentUser;
}

// Make functions available globally
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.clearAuthenticationData = clearAuthenticationData;
window.showAuthNotification = showAuthNotification;
