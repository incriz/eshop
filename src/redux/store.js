import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartSlice,
  checkout: checkoutSlice,
  orders: orderSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
