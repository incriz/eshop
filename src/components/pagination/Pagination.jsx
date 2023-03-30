import React, { useState } from "react";
import styles from "./Pagination.module.scss";

export const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const [pageNumberLimit, setPageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={styles.pagination}>
      <li>prev</li>

      {}
      <li>prev</li>

      <li>next</li>
    </ul>
  );
};
