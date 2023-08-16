import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "product/getProductsLoading",
  async (anyNameOrEven_, { reject }) => {
    const response = await axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((response) => response.data)
      .catch((error) => null);
    return response || reject();
  }
);

const initialState = {
  products: [],
  loading: "idle",
  success: false,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [getProducts.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    },
    [getProducts.pending]: (state, action) => {
      state.loading = "idle";
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = "failed";
    },
  },
});

// Action creators are generated for each case reducer function

export default productSlice.reducer;
