import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import Card from "../card";
import Loader from "../loader";
import { toast } from "react-toastify";
import CheckoutSummary from "../checkoutSummary";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { STORE_ORDERS } from "../../redux/slice/orderSlice";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: String(date),
      orderTime: String(time),
      orderAmount: Number(cartTotalAmount),
      orderStatus: "Оплачен",
      cartItems,
      shippingAddress,
      createdAT: String(Timestamp.now().toDate()),
    };

    try {
      await addDoc(collection(db, "orders"), orderConfig);
      toast.success("Заказ сохранен");
      dispatch(CLEAR_CART());
      dispatch(STORE_ORDERS(orderConfig));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then(result => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Платеж прошел!");
            saveOrder();
            navigate("/checkout-success");
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <PaymentElement
                id={styles["payment-element"]}
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? <Loader /> : "Pay now"}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};
