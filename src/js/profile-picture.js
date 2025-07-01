/**
 * Profile Picture Management
 * Handles profile picture upload, display, and removal
 */

class ProfilePictureManager {
    constructor() {
        this.fileInput = document.getElementById('profile-picture-input');
        this.profilePictureBtn = null;
        this.removePictureBtn = null;
        this.userProfileImage = null;
        this.userProfileImageLarge = null;
        this.userIcon = null;
        this.userIconLarge = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Get elements
        this.profilePictureBtn = document.querySelector('.profile-picture-btn');
        this.removePictureBtn = document.querySelector('.remove-picture-btn');
        this.userProfileImage = document.querySelector('.user-profile-image');
        this.userProfileImageLarge = document.querySelector('.user-profile-image-large');
        this.userIcon = document.querySelector('.user-avatar .user-icon');
        this.userIconLarge = document.querySelector('.user-avatar-large i');

        // Add event listeners
        if (this.profilePictureBtn) {
            this.profilePictureBtn.addEventListener('click', () => this.openFileDialog());
        }

        if (this.removePictureBtn) {
            this.removePictureBtn.addEventListener('click', () => this.removeProfilePicture());
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }
    }

    openFileDialog() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    async handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('Image size should be less than 5MB', 'error');
            return;
        }

        try {
            // Convert file to base64
            const base64 = await this.fileToBase64(file);
            
            // Update profile picture
            await this.updateProfilePicture(base64);
            
        } catch (error) {
            this.showNotification('Failed to upload profile picture', 'error');
        }

        // Clear file input
        event.target.value = '';
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async updateProfilePicture(base64Image) {
        try {
            const token = localStorage.getItem('stepstyle-token');
            
            if (!token || token.startsWith('local-token-')) {
                // Handle local storage for offline mode
                this.updateLocalProfilePicture(base64Image);
                return;
            }

            const response = await fetch('http://localhost:4000/api/user/profile-picture', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    profilePicture: base64Image
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update local storage
                const user = JSON.parse(localStorage.getItem('stepstyle-user'));
                user.profilePicture = base64Image;
                localStorage.setItem('stepstyle-user', JSON.stringify(user));

                // Also save in user-specific storage for persistence across different logins
                this.saveUserSpecificProfilePicture(user.email, base64Image);

                // Update UI
                this.displayProfilePicture(base64Image);
                this.showNotification('Profile picture updated successfully!', 'success');
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            // Fallback to local storage
            this.updateLocalProfilePicture(base64Image);
        }
    }

    updateLocalProfilePicture(base64Image) {
        try {
            // Update local storage
            const user = JSON.parse(localStorage.getItem('stepstyle-user'));
            if (user) {
                user.profilePicture = base64Image;
                localStorage.setItem('stepstyle-user', JSON.stringify(user));

                // Also save in user-specific storage for persistence across different logins
                this.saveUserSpecificProfilePicture(user.email, base64Image);

                // Update UI
                this.displayProfilePicture(base64Image);
                this.showNotification('Profile picture updated successfully!', 'success');
            }
        } catch (error) {
            this.showNotification('Failed to update profile picture', 'error');
        }
    }

    async removeProfilePicture() {
        try {
            const token = localStorage.getItem('stepstyle-token');
            
            if (!token || token.startsWith('local-token-')) {
                // Handle local storage for offline mode
                this.removeLocalProfilePicture();
                return;
            }

            const response = await fetch('http://localhost:4000/api/user/profile-picture', {
                method: 'DELETE',
                headers: {
                    'token': token
                }
            });

            const data = await response.json();

            if (data.success) {
                // Update local storage
                const user = JSON.parse(localStorage.getItem('stepstyle-user'));
                user.profilePicture = '';
                localStorage.setItem('stepstyle-user', JSON.stringify(user));

                // Also remove from user-specific storage
                this.removeUserSpecificProfilePicture(user.email);

                // Update UI
                this.hideProfilePicture();
                this.showNotification('Profile picture removed successfully!', 'success');
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            // Fallback to local storage
            this.removeLocalProfilePicture();
        }
    }

    removeLocalProfilePicture() {
        try {
            // Update local storage
            const user = JSON.parse(localStorage.getItem('stepstyle-user'));
            if (user) {
                user.profilePicture = '';
                localStorage.setItem('stepstyle-user', JSON.stringify(user));

                // Also remove from user-specific storage
                this.removeUserSpecificProfilePicture(user.email);

                // Update UI
                this.hideProfilePicture();
                this.showNotification('Profile picture removed successfully!', 'success');
            }
        } catch (error) {
            this.showNotification('Failed to remove profile picture', 'error');
        }
    }

    displayProfilePicture(imageUrl) {
        if (this.userProfileImage && this.userProfileImageLarge) {
            // Show profile images
            this.userProfileImage.src = imageUrl;
            this.userProfileImage.style.display = 'block';
            this.userProfileImage.style.opacity = '1';
            this.userProfileImageLarge.src = imageUrl;
            this.userProfileImageLarge.style.display = 'block';
            this.userProfileImageLarge.style.opacity = '1';

            // Hide default icons by making them transparent
            if (this.userIcon) {
                this.userIcon.style.opacity = '0';
                this.userIcon.style.visibility = 'hidden';
            }
            if (this.userIconLarge) {
                this.userIconLarge.style.opacity = '0';
                this.userIconLarge.style.visibility = 'hidden';
            }

            // Show remove button
            if (this.removePictureBtn) {
                this.removePictureBtn.style.display = 'flex';
            }
        }
    }

    hideProfilePicture() {
        if (this.userProfileImage && this.userProfileImageLarge) {
            // Hide profile images
            this.userProfileImage.style.display = 'none';
            this.userProfileImage.style.opacity = '0';
            this.userProfileImageLarge.style.display = 'none';
            this.userProfileImageLarge.style.opacity = '0';

            // Show default icons
            if (this.userIcon) {
                this.userIcon.style.opacity = '1';
                this.userIcon.style.visibility = 'visible';
            }
            if (this.userIconLarge) {
                this.userIconLarge.style.opacity = '1';
                this.userIconLarge.style.visibility = 'visible';
            }

            // Hide remove button
            if (this.removePictureBtn) {
                this.removePictureBtn.style.display = 'none';
            }
        }
    }

    loadUserProfilePicture() {
        try {
            const user = JSON.parse(localStorage.getItem('stepstyle-user'));
            if (user) {
                // First try to load from user-specific storage
                const userSpecificPicture = this.getUserSpecificProfilePicture(user.email);

                if (userSpecificPicture) {
                    // Update current user data with the user-specific picture
                    user.profilePicture = userSpecificPicture;
                    localStorage.setItem('stepstyle-user', JSON.stringify(user));
                    this.displayProfilePicture(userSpecificPicture);
                } else if (user.profilePicture) {
                    // Fallback to current user data
                    this.displayProfilePicture(user.profilePicture);
                } else {
                    this.hideProfilePicture();
                }
            } else {
                this.hideProfilePicture();
            }
        } catch (error) {
            this.hideProfilePicture();
        }
    }

    /**
     * Save profile picture for specific user email
     */
    saveUserSpecificProfilePicture(email, base64Image) {
        try {
            const key = `stepstyle-profile-${email}`;
            localStorage.setItem(key, base64Image);
        } catch (error) {
            console.error('Failed to save user-specific profile picture:', error);
        }
    }

    /**
     * Get profile picture for specific user email
     */
    getUserSpecificProfilePicture(email) {
        try {
            const key = `stepstyle-profile-${email}`;
            return localStorage.getItem(key);
        } catch (error) {
            console.error('Failed to get user-specific profile picture:', error);
            return null;
        }
    }

    /**
     * Remove profile picture for specific user email
     */
    removeUserSpecificProfilePicture(email) {
        try {
            const key = `stepstyle-profile-${email}`;
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove user-specific profile picture:', error);
        }
    }

    showNotification(message, type = 'info') {
        // Use existing notification system if available
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // Fallback to alert
            alert(message);
        }
    }
}

// Initialize profile picture manager
const profilePictureManager = new ProfilePictureManager();

// Export for use in other files
window.profilePictureManager = profilePictureManager;
