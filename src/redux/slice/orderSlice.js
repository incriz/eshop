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
      const tempOrder = { ...action.payload };
      state.orderHistory.push(tempOrder);
      localStorage.setItem("orderHistory", JSON.stringify(state.orderHistory));
    },
  },
});

export const { STORE_ORDERS } = orderSlice.actions;
export const selectOrderHistory = state => state.orders.orderHistory;

export default orderSlice.reducer;
