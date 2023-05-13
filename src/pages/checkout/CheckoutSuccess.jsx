import React from "react";
import { Link } from "react-router-dom";

export const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Платеж прошел!</h2>
        <p>Спасибо за покупку!</p>
        <br />
        <Link to="/order-history">
          <button className="--btn --btn-primary">
            Посмотреть статус заказа
          </button>
        </Link>
      </div>
    </section>
  );
};
