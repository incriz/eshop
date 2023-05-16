import React from "react";
import { Link } from "react-router-dom";

export const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Платеж прошел!</h2>
        <p>Спасибо за покупку!</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history">Посмотреть статус заказа</Link>
        </button>
      </div>
    </section>
  );
};
