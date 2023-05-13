import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import { CheckoutForm, Loader } from "../../components";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Инициализации оплаты");

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY);
    dispatch(CALCULATE_TOTAL_QUANTITY);
  }, [dispatch, cartItems]);

  const description = `Оплата: email: ${customerEmail}, Кол-во: ${totalAmount} `;

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        description,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(json => Promise.reject(json));
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      })
      .catch(error => {
        setMessage("Ошибка при инициализации оплаты!");
        toast.error("Что-то пошло не так...");
      });
  }, []);

  const appereance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appereance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <Loader />}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
