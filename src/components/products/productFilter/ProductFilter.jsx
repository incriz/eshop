import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import styles from "./productFilter.module.scss";

export const ProductFilter = ({ toggleFilter }) => {
  const [category, setCategory] = useState("Все");
  const [price, setPrice] = useState(150000);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

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
    toggleFilter(false);
  };

  const clearFilters = () => {
    setCategory("Все");
    setPrice(maxPrice);
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
      {/*<div>*/}
      {/*  <h4>Цена</h4>*/}
      {/*  <p>{`${price}₽`}</p>*/}
      {/*  <div className={styles.price}>*/}
      {/*    <input*/}
      {/*      type="range"*/}
      {/*      value={price}*/}
      {/*      min={minPrice}*/}
      {/*      max={maxPrice}*/}
      {/*      onChange={e => setPrice(e.target.value)}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <button className="--btn --btn-danger" onClick={clearFilters}>*/}
      {/*    Очистить*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};
