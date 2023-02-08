import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import { Home, Navbar } from "../../components/admin";

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};
