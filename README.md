# E-Commerce Application

A modern, responsive, and feature-rich front-end e-commerce application built with React and Vite. This project provides a seamless shopping experience with product listings, cart management, wishlist functionality, and a streamlined checkout process.

## 🛠️ Tech Stack

This project leverages modern web technologies to ensure a fast, robust, and maintainable user experience.

### Core
- **React (v19)**: Component-based UI library.
- **Vite (v8)**: Next-generation frontend tooling for ultra-fast development and optimized builds.

### Routing & State Management
- **React Router (v7)**: Declarative routing for single-page applications.

### Styling & UI
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid and responsive UI development.
- **Framer Motion**: Production-ready animation library for React to create smooth interactions.
- **React Icons**: Comprehensive icon library.
- **Swiper**: Modern slider/carousel component.
- **React Toastify**: Easy-to-use toast notifications for user feedback.

### Forms & Validation
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Yup**: JavaScript schema builder for value parsing and validation (used via `@hookform/resolvers`).

### Data Fetching
- **Axios**: Promise-based HTTP client for the browser and Node.js.

## ✨ Features

- **Home Page**: Featured products, promotional banners, and category navigation.
- **Products Listing**: View and filter available products.
- **Product Details**: Comprehensive view of individual products, including images, descriptions, and pricing.
- **Shopping Cart**: Add, remove, and update quantities of items.
- **Wishlist**: Save favorite items for later.
- **Checkout Process**: Form validation for shipping and payment using React Hook Form & Yup.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Navbar, ProductCard, CartItem, etc.)
├── pages/        # Page components (Home, Products, ProductDetails, Cart, Checkout, Wishlist)
├── hooks/        # Custom React hooks (e.g., useDebounce)
├── context/      # Global state management context (if applicable)
├── utils/        # Helper functions
├── App.jsx       # Root component and routing setup
└── main.jsx      # Entry point
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ecommerce-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

Create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist` folder. You can preview the production build using `npm run preview`.

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.
