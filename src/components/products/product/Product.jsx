import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "../productFilter";
import ProductList from "../productList";
import { UseFetchCollection } from "../../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import { Loader } from "../../../components";
import { HiOutlineSortDescending } from "react-icons/hi";

export const Product = () => {
  const { data, isLoading } = UseFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);

  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : (
            <ProductFilter
              toggleFilter={toggleFilter}
              showFilter={showFilter}
            />
          )}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Loader /> : <ProductList products={products} />}
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.icon} onClick={toggleFilter}>
              <HiOutlineSortDescending size={30} color="orangered" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
