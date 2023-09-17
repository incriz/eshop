import React from "react";
import styles from "./CheckoutSummary.module.scss";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotalAmount, selectCartTotalQuantity,} from "../../redux/slice/cartSlice";
import {Link} from "react-router-dom";
import Card from "../card";

export const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className={styles}>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>Нет товаров в корзине</p>
            <button className="--btn --btn-primary">
              <Link to="/eshop/#products">Список товаров</Link>
            </button>
          </>
        ) : (
          <>
            <p>{`Кол-во товаров: ${cartTotalQuantity}`}</p>
            <div className={styles.text}>
              <h4>Стоимость:</h4>
              <h3>{`${cartTotalAmount.toFixed(2)}₽`}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Товар: {name}</h4>
                  <p>Кол-во: {cartQuantity}</p>
                  <p>Цена: {price * cartQuantity}₽</p>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
