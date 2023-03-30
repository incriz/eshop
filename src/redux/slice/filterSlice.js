import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter(
        product =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filterProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "all-products") {
        tempProducts = products;
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      state.filterProducts = tempProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "Все") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          product => product.category === category
        );
      }
      state.filterProducts = tempProducts;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter(product => product.price <= price);

      state.filterProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = state => state.filter.filterProducts;

export default filterSlice.reducer;
