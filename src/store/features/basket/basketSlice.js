import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    add: (state, action) => {
      //eklenecek ürünün tamamı obje olarak gelecek
      let arr = state.list;
      arr.push({ ...action.payload, quantity: 1 });
      state.list = arr;
      localStorage.setItem("basket", JSON.stringify(arr));
    },
    remove: (state, action) => {
      //payload oalrak siliencek ürünün id si gönderilecek
      let arr = state.list.filter((x) => x.id !== action.payload);
      state.list = arr;
      localStorage.setItem("basket", JSON.stringify(arr));
    },
    quantityInc: (state, action) => {
      let itemIndex = state.list.findIndex((x) => x.id === action.payload);
      let arr = state.list;
      let item = arr[itemIndex];
      item.quantity += 1;
      arr[itemIndex] = item;
      state.list = arr;
      localStorage.setItem("basket", JSON.stringify(arr));
    },
    quantityDec: (state, action) => {
      let itemIndex = state.list.findIndex((x) => x.id === action.payload);
      let arr = state.list;
      let item = arr[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
        arr[itemIndex] = item;
        state.list = arr;
      } else {
        arr = arr.filter((x) => x.id !== action.payload);
        state.list = arr;
      }
      localStorage.setItem("basket", JSON.stringify(arr));
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, quantityInc, quantityDec } = basketSlice.actions;

export default basketSlice.reducer;
