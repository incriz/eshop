import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      const tempShipping = { ...action.payload };
      state.shippingAddress.push(tempShipping);
    },
  },
});

export const { SAVE_SHIPPING_ADDRESS } = checkoutSlice.actions;

export const selectShippingAddress = state => state.checkout.shippingAddress;

export default checkoutSlice.reducer;
