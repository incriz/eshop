import React from "react";
import styles from "./orders.module.scss";
import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../../redux/slice/orderSlice";

export const Orders = () => {
  const orders = useSelector(selectOrderHistory);

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
                    <th>Данные</th>
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
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} в {orderTime}
                        </td>
                        {/*<td>{userID}</td>*/}
                        <td>
                          {shippingAddress.map((item, i) => {
                            return (
                              <div key={i}>
                                <p>
                                  <b>Имя:</b> {``} {item.name}
                                </p>
                                <p>
                                  <b>Телефон:</b> {``}
                                  {item.number}
                                </p>
                                <p>
                                  <b>Aдрес:</b> {``}
                                  {item.region}, {``}
                                  г. {``} {item.city}, {``}
                                  ул.{``} {item.street}, {``}
                                  кв.{``} {item.apartment}
                                </p>
                                <p>
                                  <b>Почтовый индекс:</b> {``}
                                  {item.postal_code}
                                </p>
                              </div>
                            );
                          })}
                        </td>
                        <td>
                          {cartItems.map((item, i) => {
                            return <p key={i}>{item.name}</p>;
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
