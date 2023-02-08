import styles from "../header.module.scss";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";

export const HeaderCart = () => {
  return (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );
};
