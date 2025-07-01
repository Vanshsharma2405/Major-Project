# StepStyle - Modern E-commerce Shoe Store

StepStyle is a modern, responsive e-commerce website for shoes built with vanilla HTML, CSS (SCSS), and JavaScript. It features a clean, minimal design with advanced functionality for browsing and purchasing shoes for men, women, and kids.

## 🚀 Features

### 🏠 Home Page
- **Hero Section**: Eye-catching landing with animated elements and call-to-action
- **Top Picks**: Curated selection of featured products
- **Categories**: Quick navigation to Men's, Women's, and Kids' sections
- **Search Functionality**: Real-time search with product suggestions and images
- **Responsive Design**: Optimized for all device sizes

### 👤 User Authentication
- **Sign Up/Sign In**: Complete user registration and login system
- **MongoDB Integration**: Secure user data storage
- **Profile Management**: User profile with profile picture upload/removal functionality
- **Multi-User Support**: Individual profile pictures persist across different user sessions
- **Session Management**: Automatic login state persistence

### 🛍️ Product Pages
#### Men's Shoes (`men.html`)
- Product collection with filtering and sorting
- Individual product details with image gallery
- Add to cart functionality
- Product reviews and ratings system
- Animated product interactions

#### Women's Shoes (`women.html`)
- Similar functionality to men's page
- Gender-specific product catalog
- Responsive product grid layout

#### Kids' Shoes (`kids.html`)
- Child-friendly interface design
- Age-appropriate product categories
- Double-click product interaction for better UX

### 🛒 Shopping Cart
- **Persistent Cart**: Cart data saved in localStorage
- **Cart Modal**: Slide-out cart with product management
- **Quantity Controls**: Increase/decrease item quantities
- **Real-time Updates**: Live cart total and item count
- **Cross-page Consistency**: Cart works across all pages

### 💳 Checkout System
- **Multi-step Checkout**: Contact info, delivery address, payment method
- **Form Validation**: Real-time validation for all input fields
- **Payment Integration**: Razorpay payment gateway integration
- **Cash on Delivery**: Alternative payment option
- **Order Summary**: Complete order review before payment

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Touch-Friendly**: Optimized for touch interactions

### 🎨 UI/UX Features
- **Modern Design**: Clean, minimal interface with consistent branding
- **Smooth Animations**: GSAP-powered animations and transitions
- **Loading States**: Professional loading animations
- **Notifications**: Toast notifications for user feedback
- **Profile Pictures**: Circular user avatars with upload functionality

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **SCSS/CSS3**: Modern styling with variables and mixins
- **Vanilla JavaScript**: No framework dependencies
- **GSAP**: Advanced animations and transitions
- **Swiper.js**: Touch-enabled sliders and carousels

### Backend Integration
- **MongoDB**: User authentication and data storage
- **EmailJS**: Contact form email functionality

### Build Tools
- **Vite**: Modern build tool and development server
- **Sass**: CSS preprocessing
- **NPM**: Package management

## 📁 Project Structure

```
StepStyle/
├── Frontend/
│   ├── Pages/
│   │   ├── index.html          # Home page
│   │   ├── men.html            # Men's shoes
│   │   ├── women.html          # Women's shoes
│   │   ├── kids.html           # Kids' shoes
│   │   ├── about.html          # About page
│   │   ├── checkout.html       # Checkout process
│   │   └── terms-and-conditions.html
│   ├── src/
│   │   ├── js/                 # JavaScript modules
│   │   ├── styles/             # SCSS stylesheets
│   │   └── assets/             # Images and media
│   └── package.json
├── Backend/
│   ├── server.js               # Express server
│   ├── models/                 # MongoDB models
│   └── routes/                 # API routes
└── README.md
```

## 🎯 Key Functionalities

### Authentication System
- User registration with email verification
- Secure login with session management
- Profile picture upload and management
- Multi-user profile persistence
- Automatic logout handling

### Product Management
- Dynamic product loading
- Image galleries with zoom functionality
- Product filtering and sorting
- Real-time search with autocomplete
- Product reviews and ratings

### Shopping Experience
- Add to cart with size/color selection
- Cart persistence across sessions
- Quantity management
- Checkout with multiple payment options
- Order confirmation and tracking

### User Interface
- Responsive navigation with user dropdown
- Toast notifications for user feedback
- Loading states and animations
- Error handling and validation
- Accessibility features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Modern web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/stepstyle.git
cd stepstyle
```

2. Install frontend dependencies
```bash
cd Frontend
npm install
```

3. Install backend dependencies
```bash
cd ../Backend
npm install
```

4. Set up environment variables
```bash
# Create .env file in Backend directory
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

5. Start the development servers
```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

## 🎨 Design Features

### Typography
- **Helvetica Now Display**: Primary brand font
- **Helvetica**: Secondary font for UI elements
- **Gilroy**: Alternative font for specific sections

### Color Scheme
- **Primary**: #111 (Black)
- **Secondary**: #4361ee (Blue)
- **Accent**: #3a56d4 (Purple)
- **Success**: #4caf50 (Green)
- **Error**: #f44336 (Red)

### Animations
- Smooth page transitions
- Product hover effects
- Cart animations
- Loading sequences
- Notification slides

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

## 📞 Contact
- **Email**: stepstyle2052025@gmail.com
- **Phone**: +91 9654043422

---
Built with ❤️ by the StepStyle Team
