import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "../productFilter";
import ProductList from "../productList";
import { UseFetchCollection } from "../../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import { Loader } from "../../../components";
import { HiOutlineSortDescending } from "react-icons/hi";

export const Product = () => {
  const { data, isLoading } = UseFetchCollection("products");

  const [showFilter, setShowFiler] = useState(false);

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFiler(!showFilter);
  };

  const hideMenuFilter = () => {
    setShowFiler(false);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter hideMenuFilter={hideMenuFilter} />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Loader /> : <ProductList products={products} />}
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.icon} onClick={toggleFilter}>
              <HiOutlineSortDescending size={30} color="orangered" />
              <p>
                <b>{showFilter ? "Каталог" : "Каталог"}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
