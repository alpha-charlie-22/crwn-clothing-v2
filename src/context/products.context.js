import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json';

// actual value to access
export const ProductsContexts = createContext({
  products: []
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };

  return <ProductsContexts.Provider value={value}>{children}</ProductsContexts.Provider>
}