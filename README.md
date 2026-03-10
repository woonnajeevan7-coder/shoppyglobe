# ShoppyGlobe 🛍️

A fully-featured React e-commerce application built with **Vite**, **Redux Toolkit**, and **React Router v6**.

---

## ✨ Features

| Feature | Details |
|---|---|
| Product Listing | Fetches 30 products from `dummyjson.com/products` |
| Search | Live debounced search across products |
| Category Filter | Filter by category chips on the Home page |
| Product Detail | Full detail view with image gallery, rating, stock |
| Cart (Drawer) | Sliding cart drawer accessible from the header |
| Cart (Page) | Dedicated `/cart` route with order summary |
| Add / Remove / Qty | Full cart management with +/− quantity controls |
| LocalStorage | Cart persists across page refreshes |
| Checkout Form | Basic form: Name, Email, Address with validation |
| Order Confirmation | Success screen after placing order |
| Responsive | Mobile-friendly layouts |

---

## 🛠️ Tech Stack

- **React 18** (Vite)
- **React Router v6** — client-side routing
- **Redux Toolkit** — cart state management
- **react-redux** — React bindings
- **CSS Modules** — scoped component styles
- **DummyJSON API** — `https://dummyjson.com/products`

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_REPO_LINK_HERE>
cd shoppyglobe

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
shoppyglobe/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx               # Entry point
    ├── App.jsx                # Routes + layout
    ├── index.css              # Global styles & design tokens
    ├── store/
    │   ├── store.js           # Redux store
    │   └── cartSlice.js       # Cart reducer + selectors
    ├── hooks/
    │   └── useFetchProducts.js  # Custom fetch hook
    ├── components/
    │   ├── Header.jsx/.module.css
    │   ├── ProductList.jsx/.module.css
    │   ├── ProductItem.jsx/.module.css
    │   ├── Cart.jsx/.module.css      # Drawer
    │   └── CartItem.jsx/.module.css
    └── pages/
        ├── Home.jsx/.module.css
        ├── ProductDetail.jsx/.module.css
        ├── CartPage.jsx/.module.css
        └── CheckoutPage.jsx/.module.css
```

---

## 🔗 API

All product data is fetched from the free [DummyJSON](https://dummyjson.com/) API:

| Endpoint | Usage |
|---|---|
| `GET /products?limit=30` | Home page listing |
| `GET /products/search?q=<query>` | Search results |
| `GET /products/:id` | Product detail page |

---

## 📋 Assignment Checklist

- [x] React functional components throughout
- [x] React Router (Home, Product Detail, Cart, Checkout)
- [x] Redux Toolkit for global cart state
- [x] Custom hook (`useFetchProducts`) for API calls
- [x] Add to cart / remove / update quantity
- [x] Cart total calculation
- [x] LocalStorage persistence
- [x] Search functionality
- [x] Loading skeletons & error states
- [x] Form validation on checkout
- [x] Responsive design

---

> Replace `<YOUR_REPO_LINK_HERE>` with your GitHub repository URL before submission.
