import React from "react";
import "./orders.module.scss";
import styles from "../../../pages/orderHistory/OrderHistory.module.scss";
import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../../redux/slice/orderSlice";
import { selectUserID } from "../../../redux/slice/authSlice";

export const Orders = () => {
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>История заказов</h2>
        <>
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>Список пуст!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Пользователь</th>
                    <th>Почта</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                      cartItems,
                      shippingAddress,
                      userID,
                      userEmail,
                    } = order;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} в {orderTime}
                        </td>
                        <td>{userID}</td>
                        <td>{userEmail}</td>
                        <td>
                          {cartItems.map(item => {
                            return <p>{item.name}</p>;
                          })}
                        </td>
                        <td>{`${orderAmount}₽`}</td>
                        <td>
                          <p className={styles.delivered}>{orderStatus}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};
