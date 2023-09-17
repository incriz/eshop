import React from "react";
import {Link} from "react-router-dom";
import styles from "./productItem.module.scss";
import Card from "../../card";
import {useDispatch, useSelector} from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_TO_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";

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

  const cart = cartItems.find(cart => cart.id === id);

  const isCartAdded = cartItems.findIndex(cart => {
    return cart.id === id;
  });

  const addCart = product => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = product => {
    dispatch(DECREASE_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const addToCart = product => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/eshop/product-details/${id}`}>
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
        {isCartAdded < 0 ? (
          <button
            className="--btn --btn-danger"
            onClick={() => addToCart(product)}
          >
            Добавить товар
          </button>
        ) : (
          <>
            <div className={styles.count}>
              <button
                style={{ width: "40px" }}
                className="--btn --btn-danger"
                onClick={() => decreaseCart(product)}
              >
                -
              </button>
              <p>
                <b>{cart.cartQuantity}</b>
              </p>
              <button
                style={{ width: "40px" }}
                className="--btn --btn-danger"
                onClick={() => addCart(product)}
              >
                +
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
