import React, { useEffect, useState } from "react";
import styles from "./productList.module.scss";
import { Pagination, Search } from "../../../components";
import ProductItem from "../productItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import { BsFillGridFill } from "react-icons/bs";

export const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all-products");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          {/*  <FaRegListAlt*/}
          {/*    size={24}*/}
          {/*    color="#0066d4"*/}
          {/*    onClick={() => setGrid(false)}*/}
          {/*  />*/}
          <p>
            <b>{filteredProducts.length}</b>
          </p>
        </div>
        <div>
          <Search value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Сортировать:</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="all-products">Все товары</option>
            <option value="lowest-price">Цены: по убыванию</option>
            <option value="highest-price">Цены: по возрастанию</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts.length === 0 ? (
          <p>Товар не найден</p>
        ) : (
          <>
            {currentProducts.map(product => {
              return (
                <div key={product.id}>
                  <ProductItem
                    {...product}
                    id={product.id}
                    grid={grid}
                    product={product}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
      {filteredProducts.length === 0 ? null : (
        <Pagination
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalProducts={filteredProducts.length}
        />
      )}
    </div>
  );
};
