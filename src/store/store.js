import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./features/basket/basketSlice";
import searchSlice from "./features/search/searchSlice";
import productSlice from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    search: searchSlice,
    product: productSlice,
  },
});
