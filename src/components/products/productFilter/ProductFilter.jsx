import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import styles from "./productFilter.module.scss";

export const ProductFilter = () => {
  const [category, setCategory] = useState("Все");
  const [price, setPrice] = useState(150000);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const allCategories = [
    "Все",
    ...new Set(products.map(product => product.category)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = cat => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  return (
    <div className={styles.filter}>
      <h4>Каталог</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              type="button"
              key={index}
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
