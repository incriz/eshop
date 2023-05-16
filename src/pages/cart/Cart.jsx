import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_TO_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Card } from "../../components";

export const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIN = useSelector(selectIsLoggedIn);

  console.log(cartItems);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const increaseCart = cart => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = cart => {
    dispatch(DECREASE_TO_CART(cart));
  };

  const removeFromCart = cart => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIN) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Корзина товаров</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Вы ничего не добавили!</p>
            <br />
            <div>
              <button className="--btn --btn-primary">
                <Link to="/#products">&larr; Список товаров</Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Товар</th>
                  <th>Цена</th>
                  <th>Кол-во</th>
                  <th>Сумма</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price + "₽"}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn --btn-primary"
                            onClick={() => decreaseCart(cart)}
                          >
                            <BiMinus size={10} />
                          </button>
                          <p>
                            <b>{`${cartQuantity}`}</b>
                          </p>
                          <button
                            className="--btn --btn-primary"
                            onClick={() => increaseCart(cart)}
                          >
                            <BiPlus size={10} />
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2) + "₽"}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <div>
                <Link to="/#products">
                  <button className="--btn --btn-primary">&larr; Назад</button>
                </Link>
                <button className="--btn --btn-danger" onClick={clearCart}>
                  Очисть корзину
                </button>
              </div>
              <div>
                <Card cardClass={styles.card}>
                  <div className={styles.text}>
                    <h4>Общая стоимость: </h4>
                    <h3>{`${cartTotalAmount.toFixed(2)}₽`}</h3>
                  </div>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Оформить
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
