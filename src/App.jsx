import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header searchValue={searchQuery} onSearchChange={setSearchQuery} />
      <Cart />
      <Routes>
        <Route path="/"            element={<Home searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart"        element={<CartPage />} />
        <Route path="/checkout"    element={<CheckoutPage />} />
        <Route path="*"            element={<Home searchQuery="" />} />
      </Routes>
    </>
  );
}
