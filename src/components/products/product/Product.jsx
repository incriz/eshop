import React, { useEffect } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "../productFilter";
import ProductList from "../productList";
import { UseFetchCollection } from "../../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProduct,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";

export const Product = () => {
  const { data, isLoading } = UseFetchCollection("products");

  const products = useSelector(selectProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};
