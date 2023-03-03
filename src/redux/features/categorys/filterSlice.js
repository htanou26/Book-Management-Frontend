import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCategorys: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_CATEGORYS(state, action) {
      const { categorys, search } = JSON.parse(action.payload);
      const tempCategorys = categorys.filter(
        (category) => 
          category.name.toLowerCase().includes(search.toLowerCase()) ||
          category.description.toLowerCase().includes(search.toLowerCase()) 
      );

      state.filteredCategorys = tempCategorys;
    },
  },
});

export const { FILTER_CATEGORYS } = filterSlice.actions;

export const selectFilteredCategory = (state) => state.filter.filteredCategorys;

export default filterSlice.reducer;
