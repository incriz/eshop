import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import { Card, CheckoutSummary } from "../../components";
import { useDispatch } from "react-redux";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";

const initialAddressState = {
  name: "",
  number: "",
  city: "",
  region: "",
  street: "",
  apartment: "",
  postal_code: "",
};

export const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = e => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              {/*Имя*/}
              <label>Имя получателя</label>
              <input
                type="text"
                placeholder="Введите имя"
                name="name"
                required
                value={shippingAddress.name}
                onChange={e => handleShipping(e)}
              />
              {/*Город*/}
              <label>Город</label>
              <input
                type="text"
                placeholder="Введите город"
                name="city"
                required
                value={shippingAddress.city}
                onChange={e => handleShipping(e)}
              />
              {/*Область*/}
              <label>Область</label>
              <input
                type="text"
                placeholder="Введите область"
                name="region"
                required
                value={shippingAddress.region}
                onChange={e => handleShipping(e)}
              />
              {/*Улица*/}
              <label>Улица</label>
              <input
                type="text"
                placeholder="Введите улицу"
                name="street"
                required
                value={shippingAddress.street}
                onChange={e => handleShipping(e)}
              />
              {/*Квартира*/}
              <label>Квартира</label>
              <input
                type="text"
                placeholder="Введите квартиру"
                name="apartment"
                required
                value={shippingAddress.apartment}
                onChange={e => handleShipping(e)}
              />
              {/*Почтовый индекс*/}
              <label>Почтовый индекс</label>
              <input
                type="text"
                placeholder="Введите почтовый индекс"
                name="postal_code"
                required
                value={shippingAddress.postal_code}
                onChange={e => handleShipping(e)}
              />
              {/*Номер телефона*/}
              <label>Номер телефона</label>
              <input
                type="text"
                placeholder="Введите номер"
                name="number"
                required
                value={shippingAddress.number}
                onChange={e => handleShipping(e)}
              />

              <button type="submit" className="--btn --btn-primary">
                Подтвердить заказ
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};
