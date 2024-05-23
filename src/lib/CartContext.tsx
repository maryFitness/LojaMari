'use client'

import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface CartContextProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItemsCount: number;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
}

interface CartItem {
  id: string;
  url: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const cartItemsCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItemsCount, isCartOpen, toggleCart, cartItems, setCartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
