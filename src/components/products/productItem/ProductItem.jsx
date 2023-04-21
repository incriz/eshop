import React from "react";
import { Link } from "react-router-dom";
import styles from "./productItem.module.scss";
import Card from "../../card";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  selectCartItems,
  selectCartTotalQuantity,
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

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectProducts);

  const productsID = products.map(item => item.id);

  const values = Object.values(cartItems);

  const currentID = values.map(item => productsID.includes(item.id));

  const filtered = values.filter(item => item.cartQuantity > 0);
  // //
  // // console.log(filtered);

  // const filtered = values.filter(
  //   item => item.cartQuantity > 0 && productsID.includes(item.id)
  // );

  const addToCart = product => {
    dispatch(ADD_TO_CART(product));
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
