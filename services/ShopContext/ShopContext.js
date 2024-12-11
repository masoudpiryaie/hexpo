// ShopListContext.js
import React, { createContext, useContext, useState } from "react";

const ShopListContext = createContext();

export const useShopListContext = () => useContext(ShopListContext);

export const ShopListProvider = ({ children }) => {
  const [shopList, setShopList] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);

  return (
    <ShopListContext.Provider
      value={{ shopList1, setShopList, selectedShopId, setSelectedShopId }}
    >
      {children}
    </ShopListContext.Provider>
  );
};
