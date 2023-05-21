import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import {
  AddProduct,
  Navbar,
  OrderDetails,
  Orders,
  ViewProducts,
} from "../../components/admin";

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};
