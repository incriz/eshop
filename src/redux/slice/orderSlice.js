import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: localStorage.getItem("orderHistory")
    ? JSON.parse(localStorage.getItem("orderHistory"))
    : [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      console.log(action.payload);
      state.orderHistory = action.payload;
      localStorage.setItem("orderHistory", JSON.stringify(state.orderHistory));
      localStorage.clear();
    },
  },
});

export const { STORE_ORDERS } = orderSlice.actions;
export const selectOrderHistory = state => state.orders.orderHistory;

export default orderSlice.reducer;
