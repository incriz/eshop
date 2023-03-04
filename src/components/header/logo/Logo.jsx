import React from "react";
import styles from "../header.module.scss";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="./">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  );
};
