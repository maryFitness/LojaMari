'use client'

import React from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '@/lib/CartContext';

const Cart: React.FC = () => {
  const { toggleCart, cartItemsCount } = useCart();

  return (
    <button onClick={toggleCart} className="relative inline-flex items-center">
    <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
    {cartItemsCount > 0 && (
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {cartItemsCount}
      </span>
    )}
  </button>
  );
}

export default Cart;
