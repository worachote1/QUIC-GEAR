// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Product is already in the cart, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCart(updatedCart);
    } else {
      // Product is not in the cart, add it
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    // Remove the product from the cart logic here
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
