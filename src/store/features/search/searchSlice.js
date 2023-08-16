import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  searchText : '',
  filter: {
    brandId: null,
    searchText: null,
  }
}
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    update: (state, action) => {
      state.searchText = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { update } = searchSlice.actions;

export default searchSlice.reducer;
