import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);
  if(existingCartItem) {
    return cartItems.map(item => {
      if(item.id === productToAdd.id) {
        item.quantity += 1;
      }
      return item;
    });
  }
  
  return [...cartItems, {...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map(item => {
    if(item.id === cartItemToRemove.id) {
      item.quantity -= 1;
    }
    return item;
  });
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => item.id !== cartItemToRemove.id);
}

// actual value to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  priceTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const newCnt = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newTotal = cartItems.reduce((total, cartItem) => {
      return total + (cartItem.quantity * cartItem.price);
    }, 0)
    setCartCount(newCnt);
    setPriceTotal(newTotal)
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };


  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, priceTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}