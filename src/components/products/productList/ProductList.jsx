import React, { useState } from "react";
import styles from "./productList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { Search } from "../../../components";

export const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaRegListAlt
            size={24}
            color="#0066d4"
            onClick={() => setGrid(false)}
          />
          <p>10</p> Product found.
        </div>
        <div>
          <Search value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Сортировать:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
};
