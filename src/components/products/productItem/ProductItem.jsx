import React from "react";
import { Link } from "react-router-dom";
import styles from "./productItem.module.scss";
import Card from "../../card";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import { selectProducts } from "../../../redux/slice/productSlice";

export const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  desc,
  imageURL,
}) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortedText = text.substring(0, n).concat("...");
      return shortedText;
    }
    return text;
  };

  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectProducts);

  const productsID = products.map(item => item.id);

  console.log(products);

  const addToCart = product => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`${price}₽`}</p>
          <h4>{!grid ? name : shortenText(name, 18)}</h4>
        </div>
        {!grid && <p>{shortenText(desc, 100)}</p>}
        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(product)}
        >
          Добавить товар
        </button>
      </div>
    </Card>
  );
};
