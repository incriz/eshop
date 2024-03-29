import React from "react";
import styles from "./search.module.scss";
import { BiSearch } from "react-icons/bi";

export const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Поиск товара"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
