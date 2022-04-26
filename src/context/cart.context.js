import { createContext, useState, useEffect, useReducer } from 'react';

import {createAction } from '../utils/reducer/reducer.utils';

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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const cartReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: 
      return {
        ...state, 
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state, 
        isCartOpen: payload
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }

}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  priceTotal: 0
};

export const CartProvider = ({ children }) => {
  const [{isCartOpen, cartItems, cartCount, priceTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [priceTotal, setPriceTotal] = useState(0);

  console.log(cartItems);

  // useEffect(() => {
  //   const newCnt = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
  //   setCartCount(newCnt);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newTotal = cartItems.reduce((total, cartItem) => {
  //     return total + (cartItem.quantity * cartItem.price);
  //   }, 0)
  //   setPriceTotal(newTotal)
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    const newCnt = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newTotal = newCartItems.reduce((total, cartItem) => {
      return total + (cartItem.quantity * cartItem.price);
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCnt,
        priceTotal: newTotal
      })
    );
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
    // setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
    // setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };


  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
    // setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const setIsCartOpen = (status) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, status)
    );
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, priceTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}