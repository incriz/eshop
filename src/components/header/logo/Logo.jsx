import React from "react";
import styles from "../header.module.scss";
import {Link} from "react-router-dom";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/eshop">
        <h2>
          <span>D</span>евайс
        </h2>
      </Link>
    </div>
  );
};
