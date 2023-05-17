import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import styles from "./OrderHistory.module.scss";
import { selectUserID } from "../../redux/slice/authSlice";

export const OrderHistory = () => {
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const filteredOrders = orders.filter(order => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>История заказов</h2>
        <>
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>Вы еще ничего не заказали!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                      cartItems,
                    } = order;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} в {orderTime}
                        </td>
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
