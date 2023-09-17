import React, {useEffect} from "react";
import styles from "../header.module.scss";
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity,} from "../../../redux/slice/cartSlice";

export const HeaderCart = () => {
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  return (
    <span className={styles.cart}>
      <Link to="/eshop/cart">
        Корзина
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );
};
